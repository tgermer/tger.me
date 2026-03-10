#!/usr/bin/env bash
#
# Archives the job URL of an existing application.
#
# Default: Wayback Machine (opens browser to trigger archiving)
# pdf:     Saves the job posting as a local PDF via Playwright
#
# Usage:
#   npm run archive <slug>          # Wayback Machine
#   npm run archive <slug> pdf      # Local PDF via Playwright

set -euo pipefail

# Parse arguments
USE_PDF=false
SLUG=""
for arg in "$@"; do
    case "$arg" in
        pdf) USE_PDF=true ;;
        *)   SLUG="$arg" ;;
    esac
done

if [ -z "${SLUG}" ]; then
    echo "Usage: $0 <slug> [pdf]" >&2
    echo "" >&2
    echo "  npm run archive jgooe5         Wayback Machine (Browser)" >&2
    echo "  npm run archive jgooe5 pdf     Lokales PDF (Playwright)" >&2
    exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MD_FILE="${ROOT}/src/content/apply/${SLUG}.md"

if [ ! -f "${MD_FILE}" ]; then
    echo "Error: Datei nicht gefunden: ${MD_FILE}" >&2
    exit 1
fi

# Extract jobUrl from frontmatter
JOB_URL=$(sed -n '/^---$/,/^---$/{ s/^jobUrl: *"\(.*\)"/\1/p; }' "${MD_FILE}")

if [ -z "${JOB_URL}" ]; then
    echo "Error: Keine jobUrl im Frontmatter von ${SLUG}.md gefunden." >&2
    exit 1
fi

echo "Job-URL: ${JOB_URL}"

if [ "${USE_PDF}" = true ]; then
    # --- PDF mode: save job posting as local PDF via Playwright ---
    PDF_PATH="${ROOT}/public/apply/${SLUG}-job.pdf"

    if [ -f "${PDF_PATH}" ]; then
        echo "PDF existiert bereits: public/apply/${SLUG}-job.pdf"
        read -rp "Überschreiben? (j/n) [n]: " REDO
        if [ "${REDO:-n}" != "j" ] && [ "${REDO:-n}" != "y" ]; then
            echo "Abgebrochen."
            exit 0
        fi
    fi

    echo "Speichere Stellenanzeige als PDF..."
    node "${ROOT}/scripts/archive-job-pdf.mjs" "${JOB_URL}" "${PDF_PATH}"
else
    # --- Wayback Machine mode: open browser to trigger archiving ---

    # Check if already archived
    EXISTING=$(sed -n '/^---$/,/^---$/{ s/^jobUrlArchived: *"\(.*\)"/\1/p; }' "${MD_FILE}")
    if [ -n "${EXISTING}" ]; then
        echo "Bereits archiviert: ${EXISTING}"
        read -rp "Erneut archivieren? (j/n) [n]: " REDO
        if [ "${REDO:-n}" != "j" ] && [ "${REDO:-n}" != "y" ]; then
            echo "Abgebrochen."
            exit 0
        fi
    fi

    echo "Archiviere via Wayback Machine..."

    # Open save URL in browser – this triggers the actual archiving (requires JS)
    open "https://web.archive.org/save/${JOB_URL}" 2>/dev/null || true

    # Store permalink that redirects to latest snapshot
    JOB_URL_ARCHIVED="https://web.archive.org/web/${JOB_URL}"
    echo "✓ Browser geöffnet – Seite wird archiviert"
    echo "  Archiv-URL: ${JOB_URL_ARCHIVED}"

    # Insert or update jobUrlArchived in frontmatter
    if grep -q '^jobUrlArchived:' "${MD_FILE}"; then
        sed -i '' "s|^jobUrlArchived: .*|jobUrlArchived: \"${JOB_URL_ARCHIVED}\"|" "${MD_FILE}"
    else
        sed -i '' "/^jobUrl: /a\\
jobUrlArchived: \"${JOB_URL_ARCHIVED}\"
" "${MD_FILE}"
    fi

    echo "✓ ${SLUG}.md aktualisiert"
fi
