#!/usr/bin/env node
/**
 * Generate PDF files for application pages using Playwright (headless Chromium).
 *
 * Usage:
 *   node scripts/generate-pdf.mjs              # all applications (skips finalized)
 *   node scripts/generate-pdf.mjs a1b2c3       # specific slug (skips if finalized)
 *   node scripts/generate-pdf.mjs a1b2c3 x4y5z # multiple slugs (skips if finalized)
 *   node scripts/generate-pdf.mjs --all        # all applications + general cv-de/cv-en
 *   node scripts/generate-pdf.mjs --force       # all applications (including finalized)
 *   node scripts/generate-pdf.mjs --force a1b2c3 # specific slug (even if finalized)
 *   node scripts/generate-pdf.mjs --attachments-only # only merge attachment PDFs (no browser)
 *
 * Finalized applications (last status: zusage/absage/zurückgezogen) are skipped
 * unless --force is specified.
 *
 * Prerequisites:
 *   npm install -D playwright
 *   npx playwright install chromium
 */

import { chromium } from 'playwright';
import { PDFDocument, rgb, PDFName, PDFArray, PDFString, PDFNull, PDFHexString } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { spawn } from 'node:child_process';
import { readdir, mkdir, readFile, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const APPLY_DIR = resolve(ROOT, 'src/content/apply');
const OUTPUT_DIR = resolve(ROOT, 'public/apply');
const PORT = 4322;
const BASE_URL = `http://localhost:${PORT}`;

const DOCS_DIR = resolve(ROOT, 'public/apply/docs');

const TERMINAL_STATUSES = ['zusage', 'absage', 'zurückgezogen'];

function parseFrontmatter(slug) {
  const mdPath = resolve(APPLY_DIR, `${slug}.md`);
  const content = readFileSync(mdPath, 'utf8');
  return content.split('---')[1] || '';
}

async function isFinalized(slug) {
  const frontmatter = parseFrontmatter(slug);
  const statusMatches = [...frontmatter.matchAll(/status:\s*"?([^"\n]+)"?/g)];
  if (statusMatches.length === 0) return false;
  const lastStatus = statusMatches[statusMatches.length - 1][1].trim();
  return TERMINAL_STATUSES.includes(lastStatus);
}

function getToken(slug) {
  const frontmatter = parseFrontmatter(slug);
  const m = frontmatter.match(/token:\s*"([^"]+)"/);
  return m ? m[1] : null;
}

function getDocumentIds(slug) {
  const frontmatter = parseFrontmatter(slug);
  const ids = [];
  const lines = frontmatter.split('\n');
  let inDocuments = false;
  for (const line of lines) {
    if (line.match(/^documents:/)) {
      // Check for empty array on same line: documents: []
      if (line.match(/\[\s*\]/)) return [];
      // Check for inline array: documents: ["id1", "id2", id3]
      const inlineMatch = line.match(/^documents:\s*\[([^\]]+)\]/);
      if (inlineMatch) {
        return inlineMatch[1]
          .split(',')
          .map((s) => s.trim().replace(/^["']|["']$/g, ''))
          .filter(Boolean);
      }
      inDocuments = true;
      continue;
    }
    if (inDocuments) {
      const m = line.match(/^\s+-\s+"?([^"\n]+)"?/);
      if (m) {
        ids.push(m[1].trim());
        continue;
      }
      if (!line.match(/^\s/) || line.match(/^\S/)) break;
    }
  }
  return ids;
}

/** Parse the documents registry from src/data/documents.ts (regex-based, no TS import needed) */
function parseDocumentsRegistry() {
  const registryPath = resolve(ROOT, 'src/data/documents.ts');
  let content;
  try {
    content = readFileSync(registryPath, 'utf8');
  } catch {
    return [];
  }
  const entries = [];
  // Match each object block in the documents array
  for (const match of content.matchAll(/\{([^}]+)\}/gs)) {
    const block = match[1];
    const strVal = (key) => {
      const m = block.match(new RegExp(`\\b${key}:\\s*(?:"([^"]*)"|'([^']*)')`));
      return m ? (m[1] ?? m[2]) : undefined;
    };
    const id = strVal('id');
    const filename = strVal('filename');
    const filenameEn = strVal('filenameEn');
    const category = strVal('category');
    const name = strVal('name');
    const nameEn = strVal('nameEn');
    const date = strVal('date');
    const issuer = strVal('issuer');
    const issuerEn = strVal('issuerEn');
    if (id && filename && category) {
      entries.push({ id, filename, filenameEn: filenameEn || '', category, date: date || '', name: name || '', nameEn: nameEn || '', issuer: issuer || '', issuerEn: issuerEn || '' });
    }
  }
  return entries;
}

function getApplicantName(slug) {
  const frontmatter = parseFrontmatter(slug);
  const cvDataMatch = frontmatter.match(/cvData:\s*['"]([^'"]+)['"]/);
  const cvFile = cvDataMatch ? cvDataMatch[1] : `cv_${slug}`;
  const cvPath = resolve(ROOT, `src/data/${cvFile}.ts`);
  try {
    const content = readFileSync(cvPath, 'utf8');
    const m = content.match(/name:\s*['"]([^'"]+)['"]/);
    return m ? m[1] : '';
  } catch {
    return '';
  }
}

const CATEGORY_ORDER = { arbeitszeugnis: 1, hochschulausbildung: 2, zertifikat: 3, sonstiges: 4 };

const CATEGORY_LABELS_DE = {
  arbeitszeugnis: 'Arbeitszeugnisse',
  hochschulausbildung: 'Hochschulausbildung',
  zertifikat: 'Zertifikate',
  sonstiges: 'Sonstiges',
};
const CATEGORY_LABELS_EN = {
  arbeitszeugnis: 'Work References',
  hochschulausbildung: 'University Education',
  zertifikat: 'Certificates',
  sonstiges: 'Other',
};

async function generateAttachmentsPdf(slug) {
  const docIds = getDocumentIds(slug);
  if (docIds.length === 0) return false;

  const registry = parseDocumentsRegistry();
  const resolvedDocs = docIds
    .map((id) => registry.find((d) => d.id === id))
    .filter(Boolean);

  if (resolvedDocs.length === 0) {
    console.log(`  SKIP: ${slug}-attachments.pdf (no matching documents in registry)`);
    return false;
  }

  resolvedDocs.sort((a, b) => (CATEGORY_ORDER[a.category] || 99) - (CATEGORY_ORDER[b.category] || 99) || (b.date || '').localeCompare(a.date || ''));

  // Get metadata
  const frontmatter = parseFrontmatter(slug);
  const posMatch = frontmatter.match(/position:\s*"([^"]+)"/);
  const position = posMatch ? posMatch[1] : '';
  const compMatch = frontmatter.match(/company:\s*"([^"]+)"/);
  const company = compMatch ? compMatch[1] : '';
  const langMatch = frontmatter.match(/lang:\s*"([^"]+)"/);
  const lang = langMatch ? langMatch[1] : 'de';
  const isDE = lang !== 'en';
  const catLabels = isDE ? CATEGORY_LABELS_DE : CATEGORY_LABELS_EN;
  const applicantName = getApplicantName(slug);
  const isInitiative = /^initiative:\s*true\s*$/m.test(frontmatter);
  const initiativeLabel = isDE ? 'Initiativbewerbung' : 'Speculative Application';
  const displayPosition = isInitiative
    ? (position ? (isDE ? `${initiativeLabel} als ${position}` : `${initiativeLabel} for ${position}`) : initiativeLabel)
    : position;
  const token = getToken(slug);
  const pdfUrl = token ? `https://tger.me/apply/${slug}/?t=${token}` : `https://tger.me/apply/${slug}`;

  const A4_W = 210 * MM;
  const A4_H = 297 * MM;

  // --- Step 1: Embed all document pages (scale to max A4 width), track start positions ---
  const finalPdf = await PDFDocument.create();
  const docEntries = []; // { doc, startPageIdx, pageCount }

  for (const doc of resolvedDocs) {
    const effectiveFilename = (!isDE && doc.filenameEn) ? doc.filenameEn : doc.filename;
    const docPath = resolve(DOCS_DIR, effectiveFilename);
    try {
      const docBytes = await readFile(docPath);
      const srcDoc = await PDFDocument.load(docBytes);
      const allIndices = Array.from({ length: srcDoc.getPageCount() }, (_, i) => i);
      const embeddedPages = await finalPdf.embedPdf(docBytes, allIndices);
      const startPageIdx = finalPdf.getPageCount();
      for (const ep of embeddedPages) {
        const srcW = ep.width;
        const srcH = ep.height;
        const scale = srcW > A4_W ? A4_W / srcW : 1;
        const pageW = srcW * scale;
        const pageH = srcH * scale;
        const newPage = finalPdf.addPage([pageW, pageH]);
        newPage.drawPage(ep, { x: 0, y: 0, width: pageW, height: pageH });
      }
      docEntries.push({ doc, startPageIdx, pageCount: embeddedPages.length });
    } catch (err) {
      console.warn(`  WARN: Could not read ${effectiveFilename}: ${err.message}`);
    }
  }

  if (finalPdf.getPageCount() === 0) {
    console.log(`  SKIP: ${slug}-attachments.pdf (no pages merged)`);
    return false;
  }

  // --- Step 2: Insert cover/TOC page at position 0 ---
  // All document pages shift by +1 after insertPage(0)
  const PAGE_OFFSET = 1;
  const MARGIN = 25 * MM;

  const coverPage = finalPdf.insertPage(0, [A4_W, A4_H]);
  finalPdf.registerFontkit(fontkit);
  const fontPath = resolve(__dirname, 'fonts');
  const fontBytes = await readFile(resolve(fontPath, 'IBMPlexSans-Regular.ttf'));
  const boldFontBytes = await readFile(resolve(fontPath, 'IBMPlexSans-SemiBold.ttf'));
  const font = await finalPdf.embedFont(fontBytes);
  const boldFont = await finalPdf.embedFont(boldFontBytes);

  const blue = rgb(37 / 255, 99 / 255, 235 / 255); // #2563eb
  const grayDark = rgb(17 / 255, 24 / 255, 39 / 255); // #111827
  const grayMid = rgb(107 / 255, 114 / 255, 128 / 255); // #6b7280
  const grayLight = rgb(229 / 255, 231 / 255, 235 / 255); // #e5e7eb

  // Blue header bar (12mm — matches --din-header-bar-height in CSS)
  coverPage.drawRectangle({ x: 0, y: A4_H - 12 * MM, width: A4_W, height: 12 * MM, color: blue });

  // Title
  const titleText = isDE ? 'Anlagen' : 'Attachments';
  coverPage.drawText(titleText, {
    x: MARGIN,
    y: A4_H - 36 * MM,
    size: 26,
    font: boldFont,
    color: grayDark,
  });

  // Subtitle: same logic as cover page — "zur Bewerbung als {position} bei {company}"
  const applicationPhrase = isInitiative
    ? (isDE ? `zur ${displayPosition}` : `for ${displayPosition}`)
    : (displayPosition ? (isDE ? `zur Bewerbung als ${displayPosition}` : `for Application as ${displayPosition}`) : '');
  const subtitleText = [applicationPhrase, company ? (isDE ? `bei ${company}` : `at ${company}`) : '']
    .filter(Boolean)
    .join(' ');
  if (subtitleText) {
    coverPage.drawText(subtitleText, { x: MARGIN, y: A4_H - 47 * MM, size: 10, font, color: grayMid });
  }

  // Applicant name
  if (applicantName) {
    coverPage.drawText(applicantName, { x: MARGIN, y: A4_H - 58 * MM, size: 11, font: boldFont, color: grayDark });
  }

  // Separator line
  coverPage.drawLine({
    start: { x: MARGIN, y: A4_H - 67 * MM },
    end: { x: A4_W - MARGIN, y: A4_H - 67 * MM },
    thickness: 0.5,
    color: grayLight,
  });

  // Footer: URL with slug+token (same as CV/letter PDFs)
  const footerText = pdfUrl.replace('https://', '');
  const footerSize = 7.5;
  const footerW = font.widthOfTextAtSize(footerText, footerSize);
  coverPage.drawText(footerText, { x: MARGIN, y: 12.5 * MM, size: footerSize, font, color: grayMid });
  const footerLinkRef = finalPdf.context.register(
    finalPdf.context.obj({
      Type: PDFName.of('Annot'),
      Subtype: PDFName.of('Link'),
      Rect: finalPdf.context.obj([MARGIN, 12.5 * MM - 2, MARGIN + footerW, 12.5 * MM + footerSize]),
      Border: finalPdf.context.obj([0, 0, 0]),
      A: finalPdf.context.obj({ Type: PDFName.of('Action'), S: PDFName.of('URI'), URI: PDFString.of(pdfUrl) }),
    }),
  );

  // --- Step 3: Build grouped TOC entries ---
  // Group by category (preserve sort order)
  const seen = new Set();
  const groups = [];
  for (const entry of docEntries) {
    const cat = entry.doc.category;
    if (!seen.has(cat)) {
      seen.add(cat);
      groups.push({ cat, label: catLabels[cat] || cat, entries: [] });
    }
    groups[groups.length - 1].entries.push(entry);
  }

  // --- Step 4: Draw TOC rows with clickable GoTo links ---
  let yPos = A4_H - 77 * MM;
  const rowH = 9 * MM;
  const entrySize = 10;
  const contentW = A4_W - 2 * MARGIN;
  const annots = [];

  for (const group of groups) {
    // Category header
    coverPage.drawText(group.label, {
      x: MARGIN,
      y: yPos,
      size: entrySize,
      font: boldFont,
      color: grayMid,
    });
    yPos -= rowH * 0.9;

    for (const { doc, startPageIdx } of group.entries) {
      const targetPage = finalPdf.getPage(startPageIdx + PAGE_OFFSET);
      const displayPageNum = startPageIdx + PAGE_OFFSET + 1; // 1-based display

      // Label: for arbeitszeugnis use issuer only, otherwise name + issuer
      const docName = (isDE ? doc.name : (doc.nameEn || doc.name)) || doc.filename;
      const docIssuer = isDE ? doc.issuer : (doc.issuerEn || doc.issuer);
      const label =
        doc.category === 'arbeitszeugnis'
          ? (docIssuer || docName)
          : docIssuer
            ? `${docName} — ${docIssuer}`
            : docName;
      // Dotted leader line
      const pageNumStr = String(displayPageNum);
      const pageNumW = font.widthOfTextAtSize(pageNumStr, entrySize);
      const minLeader = 6 * MM;
      const maxLabelW = contentW - pageNumW - minLeader;
      let truncated = label;
      if (font.widthOfTextAtSize(label, entrySize) > maxLabelW) {
        const ellipsisW = font.widthOfTextAtSize('…', entrySize);
        while (truncated.length > 0 && font.widthOfTextAtSize(truncated, entrySize) > maxLabelW - ellipsisW) {
          truncated = truncated.slice(0, -1);
        }
        truncated += '…';
      }
      const labelW = font.widthOfTextAtSize(truncated, entrySize);
      const leaderStart = MARGIN + labelW + 2 * MM;
      const leaderEnd = A4_W - MARGIN - pageNumW - 2 * MM;
      if (leaderEnd > leaderStart) {
        const dotSpacing = 2.5 * MM;
        const numDots = Math.floor((leaderEnd - leaderStart) / dotSpacing);
        for (let d = 0; d < numDots; d++) {
          coverPage.drawText('.', {
            x: leaderStart + d * dotSpacing,
            y: yPos,
            size: entrySize,
            font,
            color: grayLight,
          });
        }
      }

      // Label text (blue, underline effect via link annotation)
      coverPage.drawText(truncated, { x: MARGIN, y: yPos, size: entrySize, font, color: blue });

      // Page number (right-aligned)
      coverPage.drawText(pageNumStr, {
        x: A4_W - MARGIN - pageNumW,
        y: yPos,
        size: entrySize,
        font,
        color: grayMid,
      });

      // GoTo link annotation spanning the full row
      const linkRef = finalPdf.context.register(
        finalPdf.context.obj({
          Type: PDFName.of('Annot'),
          Subtype: PDFName.of('Link'),
          Rect: finalPdf.context.obj([MARGIN, yPos - 2, MARGIN + contentW, yPos + entrySize]),
          Border: finalPdf.context.obj([0, 0, 0]),
          A: finalPdf.context.obj({
            Type: PDFName.of('Action'),
            S: PDFName.of('GoTo'),
            D: finalPdf.context.obj([targetPage.ref, PDFName.of('XYZ'), PDFNull, PDFNull, PDFNull]),
          }),
        }),
      );
      annots.push(linkRef);

      yPos -= rowH;
      if (yPos < MARGIN + 10 * MM) break; // safety: don't overflow page
    }

    yPos -= rowH * 0.5; // extra spacing between categories
  }

  // Attach all annotations (TOC GoTo links + footer URL) to cover page
  annots.push(footerLinkRef);
  coverPage.node.set(PDFName.of('Annots'), finalPdf.context.obj(annots));

  // --- Step 5: PDF outline (bookmarks panel) ---
  addPdfOutline(finalPdf, groups, PAGE_OFFSET, isDE);

  // --- Step 6: Metadata & save ---
  const titleSuffix = displayPosition || (isDE ? 'Initiativbewerbung' : 'Speculative Application');
  finalPdf.setTitle(isDE ? `Anlagen – ${titleSuffix}` : `Attachments – ${titleSuffix}`);
  finalPdf.setCreator('Astro + pdf-lib');

  const outputPath = resolve(OUTPUT_DIR, `${slug}-attachments.pdf`);
  const mergedBytes = await finalPdf.save();
  await writeFile(outputPath, mergedBytes);
  console.log(`  OK: ${outputPath.replace(ROOT + '/', '')}`);
  return true;
}

/** Add a two-level PDF outline (bookmarks panel) to an Attachments PDF.
 *  groups: [{ label, entries: [{ doc, startPageIdx, pageCount }] }]
 *  PAGE_OFFSET: 1 (cover page is at index 0, documents start at index 1)
 */
function addPdfOutline(pdfDoc, groups, PAGE_OFFSET, isDE = true) {
  if (groups.length === 0) return;
  const context = pdfDoc.context;

  const docLabel = (doc) => {
    const name = (isDE ? doc.name : (doc.nameEn || doc.name)) || doc.filename;
    const issuer = isDE ? doc.issuer : (doc.issuerEn || doc.issuer);
    return doc.category === 'arbeitszeugnis'
      ? (issuer || name)
      : issuer
        ? `${name} \u2014 ${issuer}`
        : name;
  };

  const outlineRootRef = context.nextRef();

  // Pre-create refs for all items (needed for forward references)
  const topItems = groups.map((group) => ({
    ref: context.nextRef(),
    label: group.label,
    pageIndex: group.entries[0].startPageIdx + PAGE_OFFSET,
    children: group.entries.map((entry) => ({
      ref: context.nextRef(),
      label: docLabel(entry.doc),
      pageIndex: entry.startPageIdx + PAGE_OFFSET,
    })),
  }));

  // Register top-level items
  for (let i = 0; i < topItems.length; i++) {
    const item = topItems[i];
    const page = pdfDoc.getPage(item.pageIndex);
    const obj = {
      Title: PDFHexString.fromText(item.label),
      Parent: outlineRootRef,
      Dest: context.obj([page.ref, PDFName.of('XYZ'), PDFNull, PDFNull, PDFNull]),
      Count: item.children.length, // positive = expanded in viewer
      First: item.children[0].ref,
      Last: item.children[item.children.length - 1].ref,
    };
    if (i > 0) obj.Prev = topItems[i - 1].ref;
    if (i < topItems.length - 1) obj.Next = topItems[i + 1].ref;
    context.assign(item.ref, context.obj(obj));

    // Register children
    for (let j = 0; j < item.children.length; j++) {
      const child = item.children[j];
      const childPage = pdfDoc.getPage(child.pageIndex);
      const childObj = {
        Title: PDFHexString.fromText(child.label),
        Parent: item.ref,
        Dest: context.obj([childPage.ref, PDFName.of('XYZ'), PDFNull, PDFNull, PDFNull]),
      };
      if (j > 0) childObj.Prev = item.children[j - 1].ref;
      if (j < item.children.length - 1) childObj.Next = item.children[j + 1].ref;
      context.assign(child.ref, context.obj(childObj));
    }
  }

  // Root outline dict
  const totalCount = topItems.reduce((sum, item) => sum + 1 + item.children.length, 0);
  context.assign(
    outlineRootRef,
    context.obj({
      Type: PDFName.of('Outlines'),
      Count: totalCount,
      First: topItems[0].ref,
      Last: topItems[topItems.length - 1].ref,
    }),
  );

  pdfDoc.catalog.set(PDFName.of('Outlines'), outlineRootRef);
  pdfDoc.catalog.set(PDFName.of('PageMode'), PDFName.of('UseOutlines')); // open bookmarks panel by default
}

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
    detached: true,
  });
  proc.stderr?.on('data', (d) => {
    const msg = d.toString();
    if (!msg.includes('ExperimentalWarning')) process.stderr.write(msg);
  });
  return proc;
}

const MM = 2.8346; // 1mm in PDF points

async function addHeaderFooter(pdfDoc, headerTitle, lang, pdfUrl, startPage = 1) {
  pdfDoc.registerFontkit(fontkit);
  const fontPath = resolve(__dirname, 'fonts');
  const fontBytes = await readFile(resolve(fontPath, 'IBMPlexSans-Regular.ttf'));
  const font = await pdfDoc.embedFont(fontBytes);
  const fontSize = 7.5;
  const color = rgb(107 / 255, 114 / 255, 128 / 255); // #6b7280
  const linkColor = rgb(107 / 255, 114 / 255, 128 / 255); // same gray for subtle look

  const pages = pdfDoc.getPages();
  const totalPages = pages.length;

  const pageLabel = lang === 'de' ? 'Seite' : 'Page';
  const ofLabel = lang === 'de' ? 'von' : 'of';

  for (let i = startPage; i < totalPages; i++) {
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
            URI: PDFString.of(pdfUrl),
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
    await page.goto(`${BASE_URL}${urlPath}`, { waitUntil: 'networkidle', timeout: 30000 });

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

    // Hide cover letter section from CV PDF
    await page.addStyleTag({
      content: '.resume-letter { display: none !important; }',
    });

    // Generate PDF (margins controlled by CSS @page rules, header/footer added via pdf-lib)
    await page.pdf({
      path: outputPath,
      preferCSSPageSize: true,
      printBackground: true,
    });

    // Post-process: add header/footer (pages 2+) and set metadata
    const pdfBytes = await readFile(outputPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Construct the public URL (overview page, not direct PDF)
    const generalPdfUrls = {
      'cv-de-print': 'https://tger.me/de/cv-print',
      'cv-en-print': 'https://tger.me/en/cv-print',
    };
    let pdfUrl = generalPdfUrls[slug] || `https://tger.me/apply/${slug}`;
    if (!generalPdfUrls[slug]) {
      const token = getToken(slug);
      if (token) pdfUrl += `/?t=${token}`;
    }

    await addHeaderFooter(pdfDoc, headerTitle, lang, pdfUrl);

    pdfDoc.setTitle(position);
    pdfDoc.setAuthor(authorName);
    pdfDoc.setSubject(lang === 'de' ? 'Lebenslauf' : 'CV');
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

async function generateLetterPdf(browser, slug, urlPath, outputPath) {
  const page = await browser.newPage();
  try {
    await page.goto(`${BASE_URL}${urlPath}`, { waitUntil: 'networkidle', timeout: 30000 });

    // Check if the page has a cover letter section
    const hasLetter = await page.$('.resume-letter') !== null;
    if (!hasLetter) {
      return false;
    }

    // Extract data from the rendered page
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

    // Inject CSS to hide everything except the letter
    await page.addStyleTag({
      content: `
        .resume-toolbar { display: none !important; }
        .resume-cover { display: none !important; }
        .resume-cv-content { display: none !important; }
        .resume-letter {
          page-break-before: avoid !important;
          break-before: avoid !important;
          page-break-after: avoid !important;
          break-after: avoid !important;
        }
        .letter-signature { display: block !important; }
        .letter-signature svg { width: 200px; height: auto; fill: #1a3f8b; }
      `,
    });

    // Generate PDF
    await page.pdf({
      path: outputPath,
      preferCSSPageSize: true,
      printBackground: true,
    });

    // Post-process: add footer and set metadata
    const pdfBytes = await readFile(outputPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Footer with URL and page numbers on all pages (startPage: 0)
    const token = getToken(slug);
    const pdfUrl = token ? `https://tger.me/apply/${slug}/?t=${token}` : `https://tger.me/apply/${slug}`;
    await addHeaderFooter(pdfDoc, '', lang, pdfUrl, 0);

    const subject = lang === 'de' ? 'Bewerbung' : 'Cover Letter';
    pdfDoc.setTitle(`${subject} – ${position}`);
    pdfDoc.setAuthor(authorName);
    pdfDoc.setSubject(subject);
    pdfDoc.setCreator('Astro + Playwright');
    if (company) {
      pdfDoc.setKeywords([position, company]);
    }

    const modifiedBytes = await pdfDoc.save();
    await writeFile(outputPath, modifiedBytes);

    console.log(`  OK: ${outputPath.replace(ROOT + '/', '')}`);
    return true;
  } finally {
    await page.close();
  }
}

async function main() {
  const args = process.argv.slice(2);
  const attachmentsOnly = args.includes('--attachments-only');
  const includeGeneral = args.includes('--all');
  const force = args.includes('--force');
  const targetSlugs = args.filter((a) => !a.startsWith('--'));

  // --attachments-only: skip build/server/browser, just merge PDFs
  if (attachmentsOnly) {
    await mkdir(OUTPUT_DIR, { recursive: true });
    const slugs =
      targetSlugs.length > 0
        ? targetSlugs
        : (await readdir(APPLY_DIR)).filter((f) => f.endsWith('.md')).map((f) => f.replace('.md', ''));
    for (const slug of slugs) {
      if (!force && (await isFinalized(slug))) {
        console.log(`  SKIP: ${slug} (finalized)`);
        continue;
      }
      await generateAttachmentsPdf(slug);
    }
    console.log('\nDone!');
    return;
  }

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

      if (targetSlugs.length > 0) {
        // Specific slug(s)
        for (const slug of targetSlugs) {
          targets.push({
            slug,
            url: `/apply/${slug}/`,
            output: resolve(OUTPUT_DIR, `${slug}.pdf`),
          });
        }
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

      // Optionally include general resume pages
      if (includeGeneral) {
        targets.push(
          { slug: 'cv-de-print', url: '/de/cv-print/', output: resolve(OUTPUT_DIR, 'cv-de.pdf') },
          { slug: 'cv-en-print', url: '/en/cv-print/', output: resolve(OUTPUT_DIR, 'cv-en.pdf') },
        );
      }

      // Filter out finalized applications (unless --force)
      if (!force) {
        const filtered = [];
        for (const target of targets) {
          if (target.slug.startsWith('cv-') && target.slug.endsWith('-print')) {
            filtered.push(target);
            continue;
          }
          if (await isFinalized(target.slug)) {
            console.log(`  SKIP: ${target.slug} (finalized)`);
          } else {
            filtered.push(target);
          }
        }
        targets.splice(0, targets.length, ...filtered);
      }

      if (targets.length === 0) {
        console.log('No application files found (or all finalized).');
        return;
      }

      console.log(`Generating ${targets.length} PDF(s)...\n`);

      for (const target of targets) {
        await generatePdf(browser, target.slug, target.url, target.output);

        // Also generate cover letter PDF and attachments PDF if applicable
        if (!(target.slug.startsWith('cv-') && target.slug.endsWith('-print'))) {
          const letterOutput = resolve(OUTPUT_DIR, `${target.slug}-letter.pdf`);
          await generateLetterPdf(browser, target.slug, target.url, letterOutput);
          await generateAttachmentsPdf(target.slug);
        }
      }

      console.log('\nDone!');
    } finally {
      await browser.close();
    }
  } finally {
    // Kill the entire process group (npx + astro preview child process)
    try {
      process.kill(-server.pid, 'SIGTERM');
    } catch {
      server.kill();
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
