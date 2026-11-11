#!/usr/bin/env bash
# One-time setup for igorbencheci.dev on Firebase Hosting (GCP project wp-habit).
#
#   deploy/setup.sh            show what would be created (nothing changes)
#   deploy/setup.sh --apply    create the Hosting site and attach the domains
#
# Creates:
#   - Firebase Hosting site $SITE_ID (separate from the project's default site, which is left alone)
#   - custom domain $DOMAIN (www). The bare $APEX_DOMAIN redirects to it at Cloudflare, not here.
# Then prints the DNS records to add at Porkbun. DNS is never changed from here.
# Hosting is on the free Spark quota for a site this size (10 GB storage, 360 MB/day transfer).

source "$(dirname "$0")/lib.sh"

APPLY=0
[[ "${1:-}" == "--apply" ]] && APPLY=1

guard
check_target
(( APPLY )) && guard_firebase

if hosting_api GET "/sites" | grep -q "\"projects/$GCP_PROJECT/sites/$SITE_ID\""; then
  say "Hosting site $SITE_ID already exists"
elif (( APPLY )); then
  say "Creating Hosting site $SITE_ID"
  fb hosting:sites:create "$SITE_ID"
else
  say "[dry run] would create Hosting site $SITE_ID (https://$SITE_ID.web.app)"
fi

add_domain() {
  local name="$1" body="$2"
  if (( ! APPLY )); then say "[dry run] would add custom domain $name"; return; fi
  if hosting_api GET "/sites/$SITE_ID/customDomains/$name" | grep -q "\"name\": *\"projects/"; then
    say "Custom domain $name already attached"
  else
    say "Attaching custom domain $name"
    hosting_api POST "/sites/$SITE_ID/customDomains?customDomainId=$name" "$body" | grep -E '"(error|message|name)"' || true
  fi
}

add_domain "$DOMAIN" '{}'

if (( APPLY )); then
  echo
  say "DNS records to add at Porkbun (also: deploy/dns.sh shows them again and the cert status):"
  "$DEPLOY_DIR/dns.sh"
else
  echo
  say "Nothing was changed. Run deploy/setup.sh --apply to create the resources above."
fi
