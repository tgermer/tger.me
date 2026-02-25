#!/usr/bin/env node
/**
 * Generate PDF files for resume pages using Playwright (headless Chromium).
 *
 * Usage:
 *   node scripts/generate-pdf.mjs              # all resumes
 *   node scripts/generate-pdf.mjs a1b2c3       # specific slug
 *   node scripts/generate-pdf.mjs --all        # all resumes + general resume-de/resume-en
 *
 * Prerequisites:
 *   npm install -D playwright
 *   npx playwright install chromium
 */

import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { readdir, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const RESUME_DIR = resolve(ROOT, 'src/content/resume');
const OUTPUT_DIR = resolve(ROOT, 'public/resume');
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

async function generatePdf(browser, slug, urlPath, outputPath) {
  const page = await browser.newPage();
  try {
    await page.goto(`${BASE_URL}${urlPath}`, { waitUntil: 'networkidle' });
    await page.pdf({
      path: outputPath,
      preferCSSPageSize: true,
      printBackground: true,
    });
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
          url: `/resume/${targetSlug}/`,
          output: resolve(OUTPUT_DIR, `${targetSlug}.pdf`),
        });
      } else {
        // All slug-based resumes
        const files = await readdir(RESUME_DIR);
        for (const file of files) {
          if (!file.endsWith('.md')) continue;
          const slug = file.replace('.md', '');
          targets.push({
            slug,
            url: `/resume/${slug}/`,
            output: resolve(OUTPUT_DIR, `${slug}.pdf`),
          });
        }
      }

      // Optionally include general resume pages
      if (includeGeneral) {
        targets.push(
          { slug: 'resume-de', url: '/resume-de/', output: resolve(OUTPUT_DIR, 'resume-de.pdf') },
          { slug: 'resume-en', url: '/resume-en/', output: resolve(OUTPUT_DIR, 'resume-en.pdf') },
        );
      }

      if (targets.length === 0) {
        console.log('No resume files found.');
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
