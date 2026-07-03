#!/usr/bin/env bash
# new-client.sh — scaffold a new client invitation repo from the template.
#
# Usage:  ./scripts/new-client.sh <client-slug> [template]
# Example: ./scripts/new-client.sh budi-sari heritage
#
# Requires: gh CLI logged in, git, wrangler installed globally or via npx.
# Assumes template repo: moneybonde-bit/undangan-template

set -euo pipefail

SLUG="${1:-}"
TEMPLATE="${2:-heritage}"  # informational only for now

if [[ -z "$SLUG" ]]; then
  echo "Usage: $0 <client-slug> [template]" >&2
  echo "  <client-slug>   lowercase kebab-case, e.g. 'budi-sari'" >&2
  exit 1
fi

if ! [[ "$SLUG" =~ ^[a-z0-9]([a-z0-9-]*[a-z0-9])?$ ]]; then
  echo "Error: slug must be lowercase, kebab-case (a-z, 0-9, -)" >&2
  exit 1
fi

ORG="moneybonde-bit"
TEMPLATE_REPO="${ORG}/undangan-template"
NEW_REPO="${ORG}/${SLUG}"
DOMAIN="${SLUG}.luxavian.it.com"

echo "==> Creating ${NEW_REPO} from ${TEMPLATE_REPO} (template: ${TEMPLATE})"
gh repo create "${NEW_REPO}" --template "${TEMPLATE_REPO}" --private --clone

cd "${SLUG}"

echo "==> Patching wrangler.jsonc"
# Replace placeholder subdomain with actual slug.
sed -i.bak \
  -e "s/{{CLIENT_SUBDOMAIN}}/${SLUG}/g" \
  -e "s/undangan-template/${SLUG}/g" \
  wrangler.jsonc
rm -f wrangler.jsonc.bak

git add wrangler.jsonc
git commit -m "chore: configure subdomain ${DOMAIN}"
git push

cat <<EOF

==> Done. Next steps (manual):
  1. Edit src/data.ts with client's content
  2. Edit index.html <title> and meta description
  3. Commit + push -> auto-deploy via GitHub Action
  4. Verify: curl -I https://${DOMAIN}

Repo:   https://github.com/${NEW_REPO}
Live:   https://${DOMAIN}
EOF
