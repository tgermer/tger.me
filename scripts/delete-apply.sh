#!/usr/bin/env bash
#
# Deletes an application and all its associated files.
#
# Files removed:
#   src/content/apply/<slug>.md       – Astro content entry
#   src/data/cv_<slug>.ts             – Frozen CV snapshot
#   public/apply/<slug>.pdf           – CV PDF
#   public/apply/<slug>-letter.pdf    – Cover letter PDF (if exists)
#
# Usage:
#   ./scripts/delete-apply.sh          # Interactive selection
#   ./scripts/delete-apply.sh <slug>   # Delete specific application

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APPLY_DIR="${ROOT}/src/content/apply"
DATA_DIR="${ROOT}/src/data"
PDF_DIR="${ROOT}/public/apply"

# ─── Collect applications ────────────────────────────────────────────

entries=()
slugs=()

for md in "${APPLY_DIR}"/*.md; do
    [ -f "${md}" ] || continue
    slug=$(basename "${md}" .md)

    # Parse frontmatter fields
    position=$(sed -n 's/^position: *"\(.*\)"/\1/p' "${md}" | head -1)
    company=$(sed -n 's/^company: *"\(.*\)"/\1/p' "${md}" | head -1)
    date=$(sed -n 's/^date: *\(.*\)/\1/p' "${md}" | head -1)
    initiative=$(sed -n 's/^initiative: *\(.*\)/\1/p' "${md}" | head -1)

    # Build display label
    if [ "${initiative}" = "true" ] && [ -z "${position}" ]; then
        label="Initiativbewerbung"
    elif [ "${initiative}" = "true" ]; then
        label="Initiativbewerbung als ${position}"
    elif [ -n "${position}" ]; then
        label="${position}"
    else
        label="(keine Position)"
    fi

    slugs+=("${slug}")
    # Tab-separated for sorting: company \t date \t slug \t label
    entries+=("$(printf "%s\t%s\t%s\t%s" "${company}" "${date}" "${slug}" "${label}")")
done

if [ ${#slugs[@]} -eq 0 ]; then
    echo "Keine Bewerbungen gefunden." >&2
    exit 1
fi

# Sort by company (asc), then date (asc = oldest first)
sorted=$(printf "%s\n" "${entries[@]}" | sort -t$'\t' -k1,1f -k2,2)

# Rebuild sorted arrays
sorted_slugs=()
sorted_lines=()
while IFS=$'\t' read -r s_company s_date s_slug s_label; do
    sorted_slugs+=("${s_slug}")
    sorted_lines+=("$(printf "%-8s  %-12s  %-25s  %s" "${s_slug}" "${s_date}" "${s_company}" "${s_label}")")
done <<< "${sorted}"

# ─── Select application ─────────────────────────────────────────────

if [ $# -ge 1 ]; then
    # Slug passed as argument
    SLUG="$1"
    # Verify it exists
    found=false
    for s in "${slugs[@]}"; do
        if [ "${s}" = "${SLUG}" ]; then
            found=true
            break
        fi
    done
    if [ "${found}" = false ]; then
        echo "Error: Bewerbung '${SLUG}' nicht gefunden." >&2
        exit 1
    fi
else
    # Interactive selection
    echo ""
    echo "  Bewerbungen:"
    echo ""
    printf "  %-4s  %-8s  %-12s  %-25s  %s\n" "#" "Slug" "Datum" "Firma" "Position"
    printf "  %-4s  %-8s  %-12s  %-25s  %s\n" "---" "--------" "------------" "-------------------------" "------------------------------"
    for i in "${!sorted_lines[@]}"; do
        printf "  %-4s  %s\n" "$((i + 1))" "${sorted_lines[$i]}"
    done
    echo ""

    read -rp "  Nummer oder Slug eingeben (leer = Abbruch): " selection

    if [ -z "${selection}" ]; then
        echo "  Abgebrochen."
        exit 0
    fi

    # Check if input is a number
    if [[ "${selection}" =~ ^[0-9]+$ ]]; then
        idx=$((selection - 1))
        if [ "${idx}" -lt 0 ] || [ "${idx}" -ge ${#sorted_slugs[@]} ]; then
            echo "Error: Ungültige Nummer." >&2
            exit 1
        fi
        SLUG="${sorted_slugs[$idx]}"
    else
        # Treat as slug
        SLUG="${selection}"
        found=false
        for s in "${slugs[@]}"; do
            if [ "${s}" = "${SLUG}" ]; then
                found=true
                break
            fi
        done
        if [ "${found}" = false ]; then
            echo "Error: Bewerbung '${SLUG}' nicht gefunden." >&2
            exit 1
        fi
    fi
fi

# ─── Collect files to delete ────────────────────────────────────────

files=()
for f in \
    "${APPLY_DIR}/${SLUG}.md" \
    "${DATA_DIR}/cv_${SLUG}.ts" \
    "${PDF_DIR}/${SLUG}.pdf" \
    "${PDF_DIR}/${SLUG}-letter.pdf"; do
    if [ -f "${f}" ]; then
        files+=("${f}")
    fi
done

if [ ${#files[@]} -eq 0 ]; then
    echo "Keine Dateien für '${SLUG}' gefunden." >&2
    exit 1
fi

# ─── Confirm and delete ─────────────────────────────────────────────

echo ""
echo "  Folgende Dateien werden gelöscht:"
echo ""
for f in "${files[@]}"; do
    echo "    ${f#"${ROOT}"/}"
done
echo ""

read -rp "  Wirklich löschen? (j/n) [n]: " confirm
if [ "${confirm}" != "j" ] && [ "${confirm}" != "y" ]; then
    echo "  Abgebrochen."
    exit 0
fi

for f in "${files[@]}"; do
    rm "${f}"
done

echo ""
echo "  Bewerbung '${SLUG}' gelöscht."
echo ""
