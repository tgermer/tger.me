#!/usr/bin/env node
/**
 * Export CV data as JSON Resume schema and copy to clipboard.
 *
 * Usage:
 *   node scripts/export-json-resume.mjs de        # General German CV
 *   node scripts/export-json-resume.mjs en        # General English CV
 *   node scripts/export-json-resume.mjs umjp31    # Application-specific CV
 *
 * The JSON output is copied to clipboard (macOS: pbcopy).
 * If clipboard is not available, JSON is printed to stdout.
 *
 * Validate at: https://jsonresume.org/projects
 */

import { build } from 'esbuild';
import { writeFileSync, unlinkSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { tmpdir } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const source = process.argv[2];

if (!source) {
    console.error('Usage: npm run json-resume <slug|de|en>\n');
    console.error('Examples:');
    console.error('  npm run json-resume de        General German CV');
    console.error('  npm run json-resume en        General English CV');
    console.error('  npm run json-resume umjp31    Application-specific CV');
    process.exit(1);
}

const dataPath = resolve(ROOT, `src/data/cv_${source}.ts`);
if (!existsSync(dataPath)) {
    console.error(`CV data file not found: src/data/cv_${source}.ts`);
    process.exit(1);
}

const converterPath = resolve(ROOT, 'src/data/json-resume.ts');
const tmpEntry = join(tmpdir(), `jr-entry-${Date.now()}.ts`);
const tmpOut = join(tmpdir(), `jr-out-${Date.now()}.mjs`);

// Create temporary entry point that imports CV data + converter
writeFileSync(
    tmpEntry,
    `import * as cv from "${dataPath}";\n` +
    `import { toJsonResume } from "${converterPath}";\n` +
    `process.stdout.write(JSON.stringify(toJsonResume(cv), null, 2));\n`,
);

try {
    // Bundle TypeScript → JavaScript using esbuild (available as Astro/Vite transitive dependency)
    await build({
        entryPoints: [tmpEntry],
        outfile: tmpOut,
        bundle: true,
        format: 'esm',
        platform: 'node',
        logLevel: 'error',
    });

    const json = execSync(`node "${tmpOut}"`, { encoding: 'utf8' });

    // Copy to clipboard (macOS)
    try {
        execSync('pbcopy', { input: json });
        console.error(`JSON Resume (${source}) copied to clipboard.`);
        console.error('Validate at: https://jsonresume.org/projects');
    } catch {
        // Clipboard not available — print to stdout
        process.stdout.write(json + '\n');
    }
} finally {
    try { unlinkSync(tmpEntry); } catch {}
    try { unlinkSync(tmpOut); } catch {}
}
