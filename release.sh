#!/usr/bin/env bash

export METEOR_RELEASE=$1

# Check for the existence of the Meteor release to publish with
if [ -z "$METEOR_RELEASE" ]; then
  echo "Usage: ./release.sh <version>"
  exit 1
fi

cd packages/meteor-tsup || exit 1
meteor publish --release "$METEOR_RELEASE"
