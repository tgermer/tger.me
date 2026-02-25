#!/usr/bin/env node
/**
 * Generate PDF files for application pages using Playwright (headless Chromium).
 *
 * Usage:
 *   node scripts/generate-pdf.mjs              # all applications
 *   node scripts/generate-pdf.mjs a1b2c3       # specific slug
 *   node scripts/generate-pdf.mjs --all        # all applications + general resume-de/resume-en
 *
 * Prerequisites:
 *   npm install -D playwright
 *   npx playwright install chromium
 */

import { chromium } from 'playwright';
import { PDFDocument, StandardFonts, rgb, PDFName, PDFArray } from 'pdf-lib';
import { spawn } from 'node:child_process';
import { readdir, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const APPLY_DIR = resolve(ROOT, 'src/content/apply');
const OUTPUT_DIR = resolve(ROOT, 'public/apply');
const PORT = 4322;
const BASE_URL = `http://localhost:${PORT}`;

async function waitForServer(url, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // Server not ready yet
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Server did not start within ${maxAttempts}s`);
}

async function buildSite() {
  return new Promise((resolve, reject) => {
    console.log('Building site...');
    const proc = spawn('npx', ['astro', 'build'], { cwd: ROOT, stdio: 'inherit' });
    proc.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`Build failed with code ${code}`))));
  });
}

function startPreviewServer() {
  console.log(`Starting preview server on port ${PORT}...`);
  const proc = spawn('npx', ['astro', 'preview', '--port', String(PORT)], {
    cwd: ROOT,
    stdio: 'pipe',
  });
  proc.stderr?.on('data', (d) => {
    const msg = d.toString();
    if (!msg.includes('ExperimentalWarning')) process.stderr.write(msg);
  });
  return proc;
}

const MM = 2.8346; // 1mm in PDF points

async function addHeaderFooter(pdfDoc, headerTitle, lang, pdfUrl) {
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 7.5;
  const color = rgb(107 / 255, 114 / 255, 128 / 255); // #6b7280
  const linkColor = rgb(107 / 255, 114 / 255, 128 / 255); // same gray for subtle look

  const pages = pdfDoc.getPages();
  const totalPages = pages.length;

  const pageLabel = lang === 'de' ? 'Seite' : 'Page';
  const ofLabel = lang === 'de' ? 'von' : 'of';

  for (let i = 1; i < totalPages; i++) {
    const page = pages[i];
    const { width, height } = page.getSize();

    // Header: title at 12.5mm from top, 25mm from left
    if (headerTitle) {
      page.drawText(headerTitle, {
        x: 25 * MM,
        y: height - 12.5 * MM,
        size: fontSize,
        font,
        color,
      });
    }

    // Footer left: clickable PDF URL
    if (pdfUrl) {
      const urlText = pdfUrl.replace('https://', '');
      const urlX = 25 * MM;
      const urlY = 12.5 * MM;
      const urlWidth = font.widthOfTextAtSize(urlText, fontSize);
      const urlHeight = fontSize;

      page.drawText(urlText, {
        x: urlX,
        y: urlY,
        size: fontSize,
        font,
        color: linkColor,
      });

      // Add clickable link annotation
      const linkAnnotationRef = pdfDoc.context.register(
        pdfDoc.context.obj({
          Type: 'Annot',
          Subtype: 'Link',
          Rect: [urlX, urlY - 2, urlX + urlWidth, urlY + urlHeight],
          Border: [0, 0, 0],
          A: {
            Type: 'Action',
            S: 'URI',
            URI: pdfUrl,
          },
        }),
      );

      const existingAnnots = page.node.lookup(PDFName.of('Annots'));
      if (existingAnnots instanceof PDFArray) {
        existingAnnots.push(linkAnnotationRef);
      } else {
        page.node.set(
          PDFName.of('Annots'),
          pdfDoc.context.obj([linkAnnotationRef]),
        );
      }
    }

    // Footer right: "Seite X von Y" right-aligned, 12.5mm from bottom, 25mm from right
    const footerText = `${pageLabel} ${i + 1} ${ofLabel} ${totalPages}`;
    const footerWidth = font.widthOfTextAtSize(footerText, fontSize);
    page.drawText(footerText, {
      x: width - 25 * MM - footerWidth,
      y: 12.5 * MM,
      size: fontSize,
      font,
      color,
    });
  }
}

async function generatePdf(browser, slug, urlPath, outputPath) {
  const page = await browser.newPage();
  try {
    await page.goto(`${BASE_URL}${urlPath}`, { waitUntil: 'networkidle' });

    // Extract data from the rendered page
    const headerTitle = await page
      .$eval('.cv-page-header span', (el) => el.textContent?.trim() || '')
      .catch(() => '');
    const lang = await page.$eval('html', (el) => el.getAttribute('lang') || 'de');
    const position = await page
      .$eval('.cover-application-title', (el) => el.textContent?.trim() || '')
      .catch(() => '');
    const authorName = await page
      .$eval('.cover-name', (el) => el.textContent?.trim() || '')
      .catch(() => '');
    const company = await page
      .$eval('.cover-application-company', (el) => el.textContent?.trim() || '')
      .catch(() => '');

    // Generate PDF (margins controlled by CSS @page rules, header/footer added via pdf-lib)
    await page.pdf({
      path: outputPath,
      preferCSSPageSize: true,
      printBackground: true,
    });

    // Post-process: add header/footer (pages 2+) and set metadata
    const pdfBytes = await readFile(outputPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Construct the public resume URL (overview page, not direct PDF)
    const pdfUrl = slug.startsWith('resume-')
      ? `https://tger.me/${slug}`
      : `https://tger.me/apply/${slug}`;

    await addHeaderFooter(pdfDoc, headerTitle, lang, pdfUrl);

    pdfDoc.setTitle(position);
    pdfDoc.setAuthor(authorName);
    pdfDoc.setSubject(lang === 'de' ? 'Lebenslauf' : 'Resume');
    pdfDoc.setCreator('Astro + Playwright');
    if (company) {
      pdfDoc.setKeywords([position, company]);
    }
    const modifiedBytes = await pdfDoc.save();
    await writeFile(outputPath, modifiedBytes);

    console.log(`  OK: ${outputPath.replace(ROOT + '/', '')}`);
  } finally {
    await page.close();
  }
}

async function main() {
  const args = process.argv.slice(2);
  const includeGeneral = args.includes('--all');
  const targetSlug = args.find((a) => !a.startsWith('--'));

  // Build site
  await buildSite();

  // Ensure output directory exists
  await mkdir(OUTPUT_DIR, { recursive: true });

  // Start preview server
  const server = startPreviewServer();

  try {
    await waitForServer(BASE_URL);
    console.log('Server ready.\n');

    const browser = await chromium.launch();

    try {
      // Collect targets
      const targets = [];

      if (targetSlug) {
        // Specific slug
        targets.push({
          slug: targetSlug,
          url: `/apply/${targetSlug}/`,
          output: resolve(OUTPUT_DIR, `${targetSlug}.pdf`),
        });
      } else {
        // All slug-based applications
        const files = await readdir(APPLY_DIR);
        for (const file of files) {
          if (!file.endsWith('.md')) continue;
          const slug = file.replace('.md', '');
          targets.push({
            slug,
            url: `/apply/${slug}/`,
            output: resolve(OUTPUT_DIR, `${slug}.pdf`),
          });
        }
      }

      // Optionally include general application pages
      if (includeGeneral) {
        targets.push(
          { slug: 'resume-de', url: '/resume-de/', output: resolve(OUTPUT_DIR, 'resume-de.pdf') },
          { slug: 'resume-en', url: '/resume-en/', output: resolve(OUTPUT_DIR, 'resume-en.pdf') },
        );
      }

      if (targets.length === 0) {
        console.log('No application files found.');
        return;
      }

      console.log(`Generating ${targets.length} PDF(s)...\n`);

      for (const target of targets) {
        await generatePdf(browser, target.slug, target.url, target.output);
      }

      console.log('\nDone!');
    } finally {
      await browser.close();
    }
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
