#!/usr/bin/env bash
#
# Creates a new resume content file with a random short slug.
#
# Usage:
#   ./scripts/new-resume.sh "Stellenbezeichnung" "Firma GmbH" de
#   ./scripts/new-resume.sh "Project Manager" "Company Inc." en
#   ./scripts/new-resume.sh "Referent" "Stadtwerke" de cv_stadtwerke_de
#
# Arguments:
#   $1  Position title (required)
#   $2  Company name (required)
#   $3  Language: de or en (default: de)
#   $4  Custom CV data file name without .ts (optional, e.g. cv_ey_de)

set -euo pipefail

POSITION="${1:?Usage: $0 \"Position\" \"Company\" [de|en] [cvData]}"
COMPANY="${2:?Usage: $0 \"Position\" \"Company\" [de|en] [cvData]}"
LANG="${3:-de}"
CV_DATA="${4:-}"

# Generate random 6-char alphanumeric slug
SLUG=$(LC_ALL=C tr -dc 'a-z0-9' < /dev/urandom | head -c 6)
DATE=$(date +%Y-%m-%d)

DIR="$(cd "$(dirname "$0")/.." && pwd)/src/content/resume"
FILE="${DIR}/${SLUG}.md"

# Build frontmatter
{
    echo "---"
    echo "position: \"${POSITION}\""
    echo "company: \"${COMPANY}\""
    echo "lang: \"${LANG}\""
    echo "date: ${DATE}"
    if [ -n "${CV_DATA}" ]; then
        echo "cvData: \"${CV_DATA}\""
    fi
    echo "---"
} > "${FILE}"

echo "Created: src/content/resume/${SLUG}.md"
echo "URL:     /resume/${SLUG}/"
echo ""
echo "Position: ${POSITION}"
echo "Company:  ${COMPANY}"
echo "Lang:     ${LANG}"
echo "Date:     ${DATE}"
if [ -n "${CV_DATA}" ]; then
    echo "CV Data:  src/data/${CV_DATA}.ts"
fi
