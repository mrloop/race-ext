#!/bin/bash

for width in 16 48 128; do
  inkscape --without-gui --export-width=$width --export-png=extension-chrome/icon-$width.png extension/icon.svg 1>/dev/null
done

ember build -o extension-chrome/dist
web-ext build -s extension-chrome -a web-ext-artifacts-chrome --overwrite-dest
google-chrome --load-extension=$(pwd)/extension-chrome https://www.britishcycling.org.uk/events?search_type=upcoming 1>/dev/null
