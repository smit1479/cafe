#!/bin/bash
# Convert all 120 frames from jpg to webp with high quality and lossless void matching
INPUT_DIR="./public/sequence"
OUTPUT_DIR="./public/sequence"

echo "Converting frames in $INPUT_DIR to WebP..."

if command -v cwebp &> /dev/null; then
  for i in {0..119}; do
    if [ -f "$INPUT_DIR/frame_${i}.jpg" ]; then
      cwebp -q 85 "$INPUT_DIR/frame_${i}.jpg" -o "$OUTPUT_DIR/frame_${i}.webp"
    fi
  done
  echo "cwebp conversion complete!"
elif command -v ffmpeg &> /dev/null; then
  for i in {0..119}; do
    if [ -f "$INPUT_DIR/frame_${i}.jpg" ]; then
      ffmpeg -y -i "$INPUT_DIR/frame_${i}.jpg" -vcodec libwebp -lossless 0 -q:v 85 "$OUTPUT_DIR/frame_${i}.webp"
    fi
  done
  echo "ffmpeg conversion complete!"
else
  echo "Neither cwebp nor ffmpeg was found."
  echo "You can install webp tools via: brew install webp ffmpeg"
  echo "The component automatically loads .jpg frames if .webp is not present!"
fi
