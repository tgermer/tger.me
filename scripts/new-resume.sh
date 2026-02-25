#!/usr/bin/env bash
#
# Creates a new resume with a frozen CV data snapshot.
#
# For each application, two files are created:
#   src/content/resume/<slug>.md   – Astro content entry (metadata)
#   src/data/cv_<slug>.ts          – Frozen snapshot of all CV + personal data
#
# Usage:
#   ./scripts/new-resume.sh
#
# The script prompts interactively for position, company, and language.

set -euo pipefail

read -rp "Position: " POSITION
if [ -z "${POSITION}" ]; then
    echo "Error: Position darf nicht leer sein." >&2
    exit 1
fi

read -rp "Firma: " COMPANY
if [ -z "${COMPANY}" ]; then
    echo "Error: Firma darf nicht leer sein." >&2
    exit 1
fi

read -rp "Sprache (de/en) [de]: " LANG
LANG="${LANG:-de}"

read -rp "Job-URL (optional): " JOB_URL
read -rp "Quelle/Kanal (optional, z.B. LinkedIn, Stepstone): " SOURCE
read -rp "Arbeitsort (optional, z.B. München, Remote): " LOCATION

# Generate random 6-char alphanumeric slug
# (disable pipefail temporarily – tr gets SIGPIPE when head closes the pipe)
set +o pipefail
SLUG=$(LC_ALL=C tr -dc 'a-z0-9' < /dev/urandom | head -c 6)
set -o pipefail
DATE=$(date +%Y-%m-%d)

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RESUME_DIR="${ROOT}/src/content/resume"
DATA_DIR="${ROOT}/src/data"

MD_FILE="${RESUME_DIR}/${SLUG}.md"
CV_SRC="${DATA_DIR}/cv_${LANG}.ts"
CV_DST="${DATA_DIR}/cv_${SLUG}.ts"

# Verify source CV data file exists
if [ ! -f "${CV_SRC}" ]; then
    echo "Error: Source CV data file not found: ${CV_SRC}" >&2
    exit 1
fi

# Create frozen CV data snapshot
cp "${CV_SRC}" "${CV_DST}"

# Build MD frontmatter (always references the snapshot)
{
    echo "---"
    echo "position: \"${POSITION}\""
    echo "company: \"${COMPANY}\""
    echo "lang: \"${LANG}\""
    echo "date: ${DATE}"
    echo "cvData: \"cv_${SLUG}\""
    echo "jobUrl: \"${JOB_URL}\""
    echo "contact: \"\""
    echo "salary: \"\""
    echo "source: \"${SOURCE}\""
    echo "location: \"${LOCATION}\""
    echo "notes: \"\""
    echo "# Status-Werte: beworben | eingangsbestätigung | vorstellungsgespräch | zweitgespräch | assessment | angebot | zusage | absage | zurückgezogen"
    echo "statusHistory:"
    echo "  - status: \"beworben\""
    echo "    date: ${DATE}"
    echo "---"
} > "${MD_FILE}"

echo ""
echo "  Resume created successfully!"
echo ""
echo "  Slug:     ${SLUG}"
echo "  Position: ${POSITION}"
echo "  Company:  ${COMPANY}"
echo "  Lang:     ${LANG}"
echo "  Date:     ${DATE}"
echo ""
echo "  Files:"
echo "    src/content/resume/${SLUG}.md     (metadata)"
echo "    src/data/cv_${SLUG}.ts            (frozen CV snapshot)"
echo ""
echo "  URL:      /resume/${SLUG}/"
echo ""
echo "  Next steps:"
echo "    1. Edit src/data/cv_${SLUG}.ts to customize for this application"
echo "    2. Preview with: npm run dev → /resume/${SLUG}/"
echo "    3. Generate PDF: npm run pdf ${SLUG}"
echo ""
