#!/usr/bin/env bash
set -o errexit
set -o pipefail
set -o nounset


# --
# <VAR>

WORKING_DIR="$(pwd)"

# </VAR>
# --


# ---------------------------------------------
# CLEAN & COPY

clean_up() {
    echo ""
    echo "CLEAN UP ..."
        rm -rf node_modules
        rm -rf dist
    echo "... done"
    echo ""
}

clean_up

# ---------------------------------------------
# TEST

# ---------------------------------------------
# BUILD

execute_node_build() {
    yarn install
    yarn build
    yarn install --modules-folder ./dist/server/node_modules --production=true
}


execute_node_build
