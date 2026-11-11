#!/usr/bin/env bash
# Show the DNS records Firebase wants for the custom domains, and the domain / certificate status.
# Read only. Add the records by hand at Cloudflare (DNS only, grey cloud), then re-run until
# hostState is HOST_ACTIVE and certState is CERT_ACTIVE (usually minutes, up to 24 h).
#
#   deploy/dns.sh

source "$(dirname "$0")/lib.sh"
guard >/dev/null

command -v jq >/dev/null || die "jq is needed to read the API response (brew install jq)"

for name in "$DOMAIN"; do
  echo
  echo "== $name"
  resp="$(hosting_api GET "/sites/$SITE_ID/customDomains/$name")"
  if ! jq -e '.name? // empty' <<<"$resp" >/dev/null; then
    echo "  not attached yet (run deploy/setup.sh --apply)"
    continue
  fi
  jq -r '
    "  hostState: \(.hostState // "-")   ownershipState: \(.ownershipState // "-")   certState: \(.cert.state // "-")",
    "  records to have at Cloudflare (DNS only):",
    ( [ .requiredDnsUpdates.desired[]?.records[]? ]
      | if length == 0 then "    (none listed yet, try again in a minute)"
        else .[] | "    \(.type)\t\(.domainName)\t\(.rdata)" end ),
    ( [ .requiredDnsUpdates.discovered[]?.records[]? ]
      | if length == 0 then empty
        else "  currently found in DNS:", (.[] | "    \(.type)\t\(.domainName)\t\(.rdata)") end ),
    ( [ .cert.verification.dns.desired[]?.records[]? ]
      | if length == 0 then empty
        else "  certificate check records:", (.[] | "    \(.type)\t\(.domainName)\t\(.rdata)") end )
  ' <<<"$resp"
done
echo
echo "Keep the www record DNS only (grey cloud) so Firebase can renew its certificate."
echo "The bare $APEX_DOMAIN is a Cloudflare redirect rule to https://$DOMAIN (see deploy/README.md)."
