#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

export PATH="/Library/Developer/CommandLineTools/usr/bin:$PATH"

echo "Pushing Artisanal Iced Latte to https://github.com/smit1479/cafe..."
git push -u origin main
