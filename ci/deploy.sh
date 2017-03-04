#!/bin/bash
set -e

BRANCH=${TRAVIS_BRANCH:-$(git rev-parse --abbrev-ref HEAD)}

echo "Branch is ${BRANCH}";
echo "Pull request # ('false' if not): ${TRAVIS_PULL_REQUEST}";

if [[ ${BRANCH} != 'master' ]] || [[ ${TRAVIS_PULL_REQUEST} != 'false' ]]; then
  echo "Not deploying changes to ${BRANCH}";
  exit 0;
fi

echo "Deploying to production"
sls deploy --stage 'prod' --region $AWS_REGION
