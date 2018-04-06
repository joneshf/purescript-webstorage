#!/usr/bin/env bash

set -euo pipefail
IFS=$'\n\t'

readonly THIS_SCRIPT="${0}"
readonly LOG_FILE="/tmp/$(basename "${THIS_SCRIPT}").log"

#/ Usage: travis_dirty_working_tree.sh [OPTION...]
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
    local exit_code="$?"

    exit "$exit_code"
}

trap cleanup EXIT

# End Boilerplate

if [[ -z "$(git diff-index --quiet HEAD --)" ]]; then
    echo 'working tree is dirty'
    git status --porcelain
    exit 1
fi
