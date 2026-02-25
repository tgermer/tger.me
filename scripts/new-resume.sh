#!/usr/bin/env bash
#
# Creates a new resume with a frozen CV data snapshot.
#
# For each application, two files are created:
#   src/content/resume/<slug>.md   – Astro content entry (metadata)
#   src/data/cv_<slug>.ts          – Frozen snapshot of all CV + personal data
#
# Usage:
#   ./scripts/new-resume.sh "Stellenbezeichnung" "Firma GmbH" de
#   ./scripts/new-resume.sh "Project Manager" "Company Inc." en
#
# Arguments:
#   $1  Position title (required)
#   $2  Company name (required)
#   $3  Language: de or en (default: de)

set -euo pipefail

POSITION="${1:?Usage: $0 \"Position\" \"Company\" [de|en]}"
COMPANY="${2:?Usage: $0 \"Position\" \"Company\" [de|en]}"
LANG="${3:-de}"

# Generate random 6-char alphanumeric slug
SLUG=$(LC_ALL=C tr -dc 'a-z0-9' < /dev/urandom | head -c 6)
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
