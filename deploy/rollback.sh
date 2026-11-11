#!/usr/bin/env bash
# Roll the live site back to an earlier release (the firebase CLI has no rollback command,
# so this uses the Hosting REST API, the same thing the console's "Rollback" button does).
#
#   deploy/rollback.sh          list the last releases and roll back to the one before the current
#   deploy/rollback.sh VERSION  roll back to a specific version id from the list

source "$(dirname "$0")/lib.sh"
guard
command -v jq >/dev/null || die "jq is needed (brew install jq)"

releases="$(hosting_api GET "/sites/$SITE_ID/channels/live/releases?pageSize=10")"
echo "Recent live releases (newest first):"
jq -r '.releases[]? | "  \(.version.name | split("/") | last)  \(.releaseTime)  \(.type)  \(.message // "")"' <<<"$releases"

target="${1:-$(jq -r '[.releases[]? | select(.type == "DEPLOY")][1].version.name // empty | split("/") | last' <<<"$releases")}"
[[ -n "$target" ]] || die "no earlier release to roll back to"

read -r -p "Make version $target live on $SITE_ID? [y/N] " ok
[[ "$ok" == "y" || "$ok" == "Y" ]] || die "cancelled"
hosting_api POST "/sites/$SITE_ID/channels/live/releases?versionName=sites/$SITE_ID/versions/$target" \
  "{\"message\":\"rollback to $target\"}" | jq -r '"released \(.version.name // .error.message)"'
