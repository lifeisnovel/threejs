#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://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@github.com/lifeisnovel/threejs.git main:gh-pages

cd -
