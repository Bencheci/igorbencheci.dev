# Deploy settings for igorbencheci.dev. Sourced by the other deploy/*.sh scripts.
# Personal GCP only: the guard in lib.sh refuses any other account or project.

# GCP_ACCOUNT (the personal Google account) lives in the git-ignored config.local.sh.
source "$(dirname "${BASH_SOURCE[0]}")/config.local.sh" 2>/dev/null \
  || { echo "✗ missing deploy/config.local.sh (copy config.local.example.sh)" >&2; exit 1; }
GCP_PROJECT="wp-habit"                 # personal GCP / Firebase project
SITE_ID="igorbencheci-dev"             # Firebase Hosting site (served at https://$SITE_ID.web.app)
DOMAIN="www.igorbencheci.dev"          # the canonical address, served by Firebase Hosting
APEX_DOMAIN="igorbencheci.dev"         # bare domain: 301 to $DOMAIN by a Cloudflare redirect rule (DNS is on Cloudflare)
