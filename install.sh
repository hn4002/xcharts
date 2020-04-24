#!/bin/bash
set -e  # exit on first error
set -x  # print commands being run in the stdout


# Build production files and put them in dist directory
npm run build

# The index.html has the wrong title. Fix it.
python3 scripts/fix_index_html.py dist/index.html

# Copy the files to the static directory of the webserver
cp -av dist/* ../streamer/mysite/web/static/xcharts


