#!/usr/bin/env bash
#
# Creates a new application with a frozen CV data snapshot.
#
# For each application, two files are created:
#   src/content/apply/<slug>.md   – Astro content entry (metadata)
#   src/data/cv_<slug>.ts         – Frozen snapshot of all CV + personal data
#
# Usage:
#   ./scripts/new-apply.sh
#
# The script prompts interactively for position, company, and language.

set -euo pipefail

read -rp "Firma: " COMPANY
if [ -z "${COMPANY}" ]; then
    echo "Error: Firma darf nicht leer sein." >&2
    exit 1
fi

# Initiativbewerbung: true = kein "Bewerbung als", zeigt "Initiativbewerbung" / "Speculative Application"
read -rp "Initiativbewerbung? (j/n) [n]: " INITIATIVE_INPUT
INITIATIVE="${INITIATIVE_INPUT:-n}"

if [ "${INITIATIVE}" = "j" ] || [ "${INITIATIVE}" = "y" ]; then
    IS_INITIATIVE=true
    # Position: optional bei Initiativbewerbung.
    # Leer → "Initiativbewerbung". Mit Wert → "Initiativbewerbung als {position}"
    read -rp "Position (optional bei Initiativbewerbung): " POSITION
else
    IS_INITIATIVE=false
    read -rp "Position: " POSITION
    if [ -z "${POSITION}" ]; then
        echo "Error: Position darf nicht leer sein (außer bei Initiativbewerbung)." >&2
        exit 1
    fi
fi

read -rp "Sprache (de/en) [de]: " LANG
LANG="${LANG:-de}"

read -rp "Job-URL (optional): " JOB_URL
read -rp "Kontakt-E-Mail (optional): " CONTACT_EMAIL
read -rp "Quelle/Kanal (optional, z.B. LinkedIn, Stepstone): " SOURCE
read -rp "Arbeitsort (optional, z.B. München, Remote): " LOCATION

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APPLY_DIR="${ROOT}/src/content/apply"
DATA_DIR="${ROOT}/src/data"

# Generate random 6-char alphanumeric slug, retry on collision
# (disable pipefail temporarily – tr gets SIGPIPE when head closes the pipe)
set +o pipefail
SLUG=$(LC_ALL=C tr -dc 'a-z0-9' < /dev/urandom | head -c 6)
while [ -f "${APPLY_DIR}/${SLUG}.md" ] || [ -f "${DATA_DIR}/cv_${SLUG}.ts" ]; do
    SLUG=$(LC_ALL=C tr -dc 'a-z0-9' < /dev/urandom | head -c 6)
done
set -o pipefail
DATE=$(date +%Y-%m-%d)

MD_FILE="${APPLY_DIR}/${SLUG}.md"
CV_SRC="${DATA_DIR}/cv_${LANG}.ts"
CV_DST="${DATA_DIR}/cv_${SLUG}.ts"

# Verify source CV data file exists
if [ ! -f "${CV_SRC}" ]; then
    echo "Error: Source CV data file not found: ${CV_SRC}" >&2
    exit 1
fi

# Create frozen CV data snapshot (remove type re-exports, only needed in base files)
cp "${CV_SRC}" "${CV_DST}"
sed -i '' '/^export type {.*} from/d' "${CV_DST}"

# Build MD frontmatter (always references the snapshot)
{
    echo "---"
    echo "# Initiativbewerbung: true = kein \"Bewerbung als\", zeigt \"Initiativbewerbung\" / \"Speculative Application\""
    echo "# true + position leer → \"Initiativbewerbung\". true + position gesetzt → \"Initiativbewerbung als {position}\""
    echo "initiative: ${IS_INITIATIVE}"
    echo "# Position: Pflichtfeld bei normaler Bewerbung, optional bei Initiativbewerbung (initiative: true)"
    echo "position: \"${POSITION}\""
    echo "company: \"${COMPANY}\""
    echo "lang: \"${LANG}\""
    echo "date: ${DATE}"
    echo "cvData: \"cv_${SLUG}\""
    echo "signature: false"
    echo "photo: true"
    echo "jobUrl: \"${JOB_URL}\""
    echo "contact: \"\""
    echo "salutation: \"\""
    echo "companyAddress: \"\""
    echo "contactEmail: \"${CONTACT_EMAIL}\""
    echo "salary: \"\""
    echo "source: \"${SOURCE}\""
    echo "location: \"${LOCATION}\""
    echo "notes: \"\""
    echo "# Status-Werte: beworben | eingangsbestätigung | vorstellungsgespräch | zweitgespräch | assessment | angebot | zusage | absage | zurückgezogen"
    echo "# Terminal-Status (zusage/absage/zurückgezogen): PDF-Generierung wird übersprungen (--force zum Überschreiben)"
    echo "statusHistory:"
    echo "  - status: \"beworben\""
    echo "    date: ${DATE}"
    echo "---"
} > "${MD_FILE}"

echo ""
echo "  Application created successfully!"
echo ""
echo "  Slug:        ${SLUG}"
echo "  Initiative:  ${IS_INITIATIVE}"
echo "  Position:    ${POSITION:-–}"
echo "  Company:     ${COMPANY}"
echo "  Lang:        ${LANG}"
echo "  Date:        ${DATE}"
echo ""
echo "  Files:"
echo "    src/content/apply/${SLUG}.md     (metadata)"
echo "    src/data/cv_${SLUG}.ts           (frozen CV snapshot)"
echo ""
echo "  URL:      /apply/${SLUG}/"
echo ""
echo "  Next steps:"
echo "    1. Edit src/data/cv_${SLUG}.ts to customize for this application"
echo "    2. Preview with: npm run dev → /apply/${SLUG}/"
echo "    3. Generate PDF: npm run pdf ${SLUG}"
echo ""
