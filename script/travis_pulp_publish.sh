#!/usr/bin/env bash

set -euo pipefail
IFS=$'\n\t'

readonly THIS_SCRIPT="${0}"
readonly LOG_FILE="/tmp/$(basename "${THIS_SCRIPT}").log"

GITHUB_TOKEN=''

#/ Usage: travis_publish.sh [OPTION...]
#/ Publish versions to Pursuit from Travis CI
#/
#/ Options:
#/       --help     display this help and exit
#/       --token TOKEN
#/                  GitHub personal access token
#/                    Does not require any scopes
usage() {
    grep '^#/' "${THIS_SCRIPT}" | cut --characters 4-
    exit 0
}

while [[ $# -gt 0 ]]; do
    option="${1}"
    case "${option}" in
        --help) usage;;
        --token)
            shift
            GITHUB_TOKEN="${1}";;
        *)
            echo "${THIS_SCRIPT}: unrecognized option '${option}'"
            echo "Try '${THIS_SCRIPT} --help' for more information"
            exit 2;;
    esac
    shift
done

info()    { echo "[INFO]    $*" | tee --append "${LOG_FILE}" >&2 ; }
warning() { echo "[WARNING] $*" | tee --append "${LOG_FILE}" >&2 ; }
error()   { echo "[ERROR]   $*" | tee --append "${LOG_FILE}" >&2 ; }
fatal()   { echo "[FATAL]   $*" | tee --append "${LOG_FILE}" >&2 ; exit 1 ; }

cleanup() {
    exit 0
}

trap cleanup EXIT

# End Boilerplate

if [ -z "${GITHUB_TOKEN}" ]; then
   echo 'Token must be given.'
   echo "Try '${THIS_SCRIPT} --help' for more information"
   exit 1
fi

echo "${GITHUB_TOKEN}" | npm run --silent pulp -- login
yes | npm run --silent pulp -- publish --no-push
