import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PNG } from 'pngjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cleanDir = path.join(__dirname, 'public', 'clean_layers');

function readPNG(relPath) {
  const full = path.join(cleanDir, relPath);
  const data = fs.readFileSync(full);
  return PNG.sync.read(data);
}

const W = 1000;
const H = 1000;

// Load clean transparent overlays
const bgImg = readPNG('BACKGROUNDS/cyberpunk_grid.png');
const skinImg = readPNG('BASE_SKIN/darkbrown_reptilian.png');
const outfitImg = readPNG('OUTFITS/cyberpunk_hoodie.png');
const exprImg = readPNG('FACIAL_EXPRESSIONS/confident_smirk.png');
const hairImg = readPNG('HAIR_STYLES/spiky_shonen_electric_blue.png');
const accImg = readPNG('ACCESSORIES/cyber_visor.png');

const out = new PNG({ width: W, height: H });

// Helper to blend pixel
function blendPixel(x, y, img) {
  const idx = (W * y + x) << 2;
  const sa = img.data[idx + 3];
  if (sa === 0) return;
  if (sa === 255) {
    out.data[idx] = img.data[idx];
    out.data[idx + 1] = img.data[idx + 1];
    out.data[idx + 2] = img.data[idx + 2];
    out.data[idx + 3] = 255;
  } else {
    const alpha = sa / 255;
    const invAlpha = 1 - alpha;
    out.data[idx] = Math.round(img.data[idx] * alpha + out.data[idx] * invAlpha);
    out.data[idx + 1] = Math.round(img.data[idx + 1] * alpha + out.data[idx + 1] * invAlpha);
    out.data[idx + 2] = Math.round(img.data[idx + 2] * alpha + out.data[idx + 2] * invAlpha);
    out.data[idx + 3] = 255;
  }
}

// Composite 1->6
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    blendPixel(x, y, bgImg);
    blendPixel(x, y, skinImg);
    blendPixel(x, y, outfitImg);
    blendPixel(x, y, exprImg);
    blendPixel(x, y, hairImg);
    blendPixel(x, y, accImg);
  }
}

const buffer = PNG.sync.write(out);
fs.writeFileSync(path.join(__dirname, 'test_final_clean.png'), buffer);
console.log('🎉 test_final_clean.png created successfully!');
