# Shared helpers for deploy/*.sh. Sourced, not run.
#
# The machine's default gcloud configuration points at a work account and project,
# so nothing here relies on it. Every gcloud call is pinned to $GCP_ACCOUNT / $GCP_PROJECT through
# environment variables, and every firebase call passes --account and --project explicitly.
# The global gcloud / firebase settings are never changed.

set -euo pipefail

DEPLOY_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_DIR="$(cd "$DEPLOY_DIR/.." && pwd)"
# shellcheck source=config.sh
source "$DEPLOY_DIR/config.sh"

export CLOUDSDK_CORE_ACCOUNT="$GCP_ACCOUNT"
export CLOUDSDK_CORE_PROJECT="$GCP_PROJECT"

die() { echo "✗ $*" >&2; exit 1; }
say() { echo "→ $*"; }

# Refuse to run against anything but the personal account and project.
guard() {
  [[ -n "${GCP_ACCOUNT:-}" ]] || die "GCP_ACCOUNT is not set in deploy/config.local.sh"
  [[ "$GCP_ACCOUNT" != *.iam.gserviceaccount.com ]] || die "GCP_ACCOUNT must be the personal account, not a service account" 
  [[ "$GCP_PROJECT" == "wp-habit" ]] || die "config.sh project must be wp-habit (got '$GCP_PROJECT')"

  command -v gcloud >/dev/null || die "gcloud is not installed"
  command -v firebase >/dev/null || die "firebase CLI is not installed (npm i -g firebase-tools)"

  gcloud auth list --format='value(account)' | grep -qx "$GCP_ACCOUNT" \
    || die "gcloud has no credentials for $GCP_ACCOUNT. Run: gcloud auth login $GCP_ACCOUNT"

  local active_account active_project
  active_account="$(gcloud config get-value account 2>/dev/null)"
  active_project="$(gcloud config get-value project 2>/dev/null)"
  [[ "$active_account" == "$GCP_ACCOUNT" ]] || die "pinned gcloud account resolved to '$active_account'"
  [[ "$active_project" == "$GCP_PROJECT" ]] || die "pinned gcloud project resolved to '$active_project'"

  gcloud projects describe "$GCP_PROJECT" --format='value(projectId)' >/dev/null 2>&1 \
    || die "$GCP_ACCOUNT cannot read project $GCP_PROJECT"

  say "Using $GCP_ACCOUNT on project $GCP_PROJECT, Hosting site $SITE_ID"
}

# The firebase CLI keeps its own logins; make sure the personal one is there.
guard_firebase() {
  firebase login:list 2>/dev/null | grep -q "$GCP_ACCOUNT" \
    || die "firebase CLI is not signed in as $GCP_ACCOUNT. Run: firebase login  (or firebase login:add if it already has another account)"
}

# firebase CLI, always pinned to the personal account and project, run from the site folder.
fb() { (cd "$SITE_DIR" && firebase --account "$GCP_ACCOUNT" --project "$GCP_PROJECT" "$@"); }

# Firebase Hosting REST API, authenticated as $GCP_ACCOUNT through gcloud.
# Path is relative to projects/$GCP_PROJECT (e.g. "/sites", "/sites/$SITE_ID/customDomains").
hosting_api() {
  local method="$1" path="$2" body="${3:-}"
  local token
  token="$(gcloud auth print-access-token)"
  curl -sS -X "$method" \
    -H "Authorization: Bearer $token" \
    -H "x-goog-user-project: $GCP_PROJECT" \
    -H "Content-Type: application/json" \
    ${body:+--data "$body"} \
    "https://firebasehosting.googleapis.com/v1beta1/projects/$GCP_PROJECT$path"
}

# .firebaserc maps the "site" target in firebase.json to $SITE_ID. Fail if it drifted from config.sh.
check_target() {
  grep -q "\"$SITE_ID\"" "$SITE_DIR/.firebaserc" 2>/dev/null \
    || die ".firebaserc does not map target 'site' to $SITE_ID (see deploy/README.md)"
}
