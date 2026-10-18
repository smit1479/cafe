#!/bin/bash
# Convenient one-click launcher for the Iced Latte Experience
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

export PATH="$HOME/.local/node/bin:$PATH"

echo "Starting NOIR & CRÈME Artisanal Iced Latte Experience..."
open "http://localhost:3000"
npm start
