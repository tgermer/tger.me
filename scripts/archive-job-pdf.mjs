#!/usr/bin/env node
/**
 * Archives a job posting URL as a local PDF using Playwright.
 * Adds browser-style header (URL + date) and footer (page numbers).
 *
 * Usage:
 *   node scripts/archive-job-pdf.mjs <url> <output-path>
 *
 * Example:
 *   node scripts/archive-job-pdf.mjs "https://jobs.epo.org/job/..." "public/apply/jgooe5-job.pdf"
 */

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const [url, outputPath] = process.argv.slice(2);

if (!url || !outputPath) {
  console.error('Usage: node scripts/archive-job-pdf.mjs <url> <output-path>');
  process.exit(1);
}

const now = new Date();
const dateStr = now.toLocaleDateString('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});
const timeStr = now.toLocaleTimeString('de-DE', {
  hour: '2-digit',
  minute: '2-digit',
});

const headerFooterStyle = `
  <style>
    span {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 8px;
      color: #666;
    }
  </style>
`;

async function main() {
  await mkdir(dirname(outputPath), { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log(`  Lade Seite: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    // Get the page title for the header
    const pageTitle = await page.title();

    // Expand all collapsed sections (accordions, details, "show more" buttons)
    await page.evaluate(() => {
      // Open all <details> elements
      document.querySelectorAll('details').forEach((el) => el.setAttribute('open', ''));

      // Expand elements hidden by max-height, overflow, or collapsed classes
      document.querySelectorAll('[class*="collapse"], [class*="accordion"], [class*="expandable"], [class*="truncat"], [class*="hidden"], [aria-expanded="false"]').forEach((el) => {
        el.style.maxHeight = 'none';
        el.style.overflow = 'visible';
        el.style.height = 'auto';
        el.classList.remove('collapsed', 'collapse', 'truncated', 'hidden');
        el.setAttribute('aria-expanded', 'true');
      });

      // Click "show more" / "read more" / "mehr anzeigen" buttons
      const showMorePatterns = /show\s*more|read\s*more|see\s*more|mehr\s*(anzeigen|lesen)|expand|aufklappen|alle\s*anzeigen|view\s*all/i;
      document.querySelectorAll('button, a, [role="button"]').forEach((el) => {
        if (showMorePatterns.test(el.textContent || '') && el.offsetParent !== null) {
          el.click();
        }
      });
    });

    // Wait briefly for any expand animations to complete
    await new Promise((r) => setTimeout(r, 500));

    // Remove cookie banners and overlays that might cover content
    await page.evaluate(() => {
      const selectors = [
        '[class*="cookie"]', '[id*="cookie"]',
        '[class*="consent"]', '[id*="consent"]',
        '[class*="overlay"]', '[class*="modal"]',
        '[class*="banner"]',
      ];
      for (const sel of selectors) {
        document.querySelectorAll(sel).forEach((el) => {
          const style = window.getComputedStyle(el);
          if (style.position === 'fixed' || style.position === 'sticky') {
            el.remove();
          }
        });
      }
    });

    // Reduce image quality to shrink PDF size
    await page.evaluate(async () => {
      // Remove videos and iframes entirely
      document.querySelectorAll('video, iframe').forEach((el) => el.remove());

      // Compress images via canvas (low-quality JPEG)
      const images = document.querySelectorAll('img');
      for (const img of images) {
        try {
          if (!img.complete || !img.naturalWidth) continue;
          const canvas = document.createElement('canvas');
          // Scale down large images
          const maxDim = 600;
          let w = img.naturalWidth;
          let h = img.naturalHeight;
          if (w > maxDim || h > maxDim) {
            const scale = maxDim / Math.max(w, h);
            w = Math.round(w * scale);
            h = Math.round(h * scale);
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          img.src = canvas.toDataURL('image/jpeg', 0.3);
        } catch {
          // Cross-origin images can't be processed – leave as-is
        }
      }
    });

    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: false,
      displayHeaderFooter: true,
      headerTemplate: `
        ${headerFooterStyle}
        <div style="width: 100%; padding: 0 12mm; display: flex; justify-content: space-between;">
          <span>${url}</span>
          <span>${dateStr}, ${timeStr}</span>
        </div>
      `,
      footerTemplate: `
        ${headerFooterStyle}
        <div style="width: 100%; padding: 0 12mm; display: flex; justify-content: space-between;">
          <span>${pageTitle}</span>
          <span>Seite <span class="pageNumber"></span> von <span class="totalPages"></span></span>
        </div>
      `,
      margin: { top: '20mm', bottom: '18mm', left: '12mm', right: '12mm' },
    });

    console.log(`  ✓ PDF gespeichert: ${outputPath}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(`  ✗ Fehler: ${err.message}`);
  process.exit(1);
});
