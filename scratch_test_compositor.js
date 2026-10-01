import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PNG } from 'pngjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packDir = path.join(__dirname, 'nft_pfp_pack');

function readPNG(relPath) {
  const full = path.join(packDir, relPath);
  const data = fs.readFileSync(full);
  return PNG.sync.read(data);
}

// Base reference image (pale smooth template)
const refImg = readPNG('BASE_SKIN/pale_smooth.png');
const bgImg = readPNG('BACKGROUNDS/solid_electric_blue.png');
const skinImg = readPNG('BASE_SKIN/tan_cyborg.png');
const outfitImg = readPNG('OUTFITS/cyberpunk_hoodie.png');
const exprImg = readPNG('FACIAL_EXPRESSIONS/stoic_crimson_red.png');
const hairImg = readPNG('HAIR_STYLES/spiky_shonen_electric_blue.png');
const accImg = readPNG('ACCESSORIES/cyber_visor.png');

const width = 1000;
const height = 1000;
const outPNG = new PNG({ width, height });

// Helper to get pixel at (x, y)
function getPixel(png, x, y) {
  const idx = (width * y + x) << 2;
  return [png.data[idx], png.data[idx + 1], png.data[idx + 2], png.data[idx + 3]];
}

// Helper to set pixel at (x, y)
function setPixel(png, x, y, r, g, b, a = 255) {
  const idx = (width * y + x) << 2;
  png.data[idx] = r;
  png.data[idx + 1] = g;
  png.data[idx + 2] = b;
  png.data[idx + 3] = a;
}

// Blend src onto dst with alpha
function blendPixel(png, x, y, sr, sg, sb, sa) {
  if (sa === 0) return;
  const idx = (width * y + x) << 2;
  if (sa === 255) {
    png.data[idx] = sr;
    png.data[idx + 1] = sg;
    png.data[idx + 2] = sb;
    png.data[idx + 3] = 255;
  } else {
    const alpha = sa / 255;
    const invAlpha = 1 - alpha;
    png.data[idx] = Math.round(sr * alpha + png.data[idx] * invAlpha);
    png.data[idx + 1] = Math.round(sg * alpha + png.data[idx + 1] * invAlpha);
    png.data[idx + 2] = Math.round(sb * alpha + png.data[idx + 2] * invAlpha);
    png.data[idx + 3] = 255;
  }
}

// 1. Fill Background
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const [r, g, b, a] = getPixel(bgImg, x, y);
    setPixel(outPNG, x, y, r, g, b, a);
  }
}

// 2. Draw BASE_SKIN (e.g. Tan Cyborg)
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const [r, g, b, a] = getPixel(skinImg, x, y);
    blendPixel(outPNG, x, y, r, g, b, a);
  }
}

// 3. Draw OUTFIT (clothing region y > 580)
for (let y = 550; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const [r, g, b, a] = getPixel(outfitImg, x, y);
    const [rr, rg, rb, ra] = getPixel(refImg, x, y);
    // Draw if outfit pixel is different from pale skin/background ref or if it's outfit clothing
    if (a > 50 && (r !== rr || g !== rg || b !== rb || y > 640)) {
      // Check if it's clothing (not skin)
      blendPixel(outPNG, x, y, r, g, b, a);
    }
  }
}

// 4. Draw FACIAL EXPRESSION / EYES (Eye and mouth feature differences around face x: 350-650, y: 400-650)
for (let y = 400; y < 650; y++) {
  for (let x = 320; x < 680; x++) {
    const [er, eg, eb, ea] = getPixel(exprImg, x, y);
    const [rr, rg, rb, ra] = getPixel(refImg, x, y);
    // Diff between expression frame and pale smooth reference
    const diff = Math.abs(er - rr) + Math.abs(eg - rg) + Math.abs(eb - rb);
    if (ea > 100 && diff > 25) {
      // It's an eye/mouth feature pixel!
      blendPixel(outPNG, x, y, er, eg, eb, ea);
    }
  }
}

// 5. Draw HAIR STYLE (Hair pixels from hairImg)
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const [hr, hg, hb, ha] = getPixel(hairImg, x, y);
    const [rr, rg, rb, ra] = getPixel(refImg, x, y);
    const diff = Math.abs(hr - rr) + Math.abs(hg - rg) + Math.abs(hb - rb);

    // Hair pixels: top region y < 450 where hair extends, or pixels different from pale face template
    if (ha > 100) {
      if (y < 420 || (y < 600 && diff > 30 && (hr < 40 && hg < 40 && hb < 40 || hr > 50 || hg > 50 || hb > 50))) {
        // If it's hair strand/fringe:
        // Check if it's hair vs skin: skin in refImg is around r: 240-255, g: 210-230, b: 190-210
        const isRefSkin = (rr > 200 && rg > 170 && rb > 150);
        const isHairSkin = (hr > 200 && hg > 170 && hb > 150);

        if (!isHairSkin || (y < 350 && !isHairSkin)) {
          blendPixel(outPNG, x, y, hr, hg, hb, ha);
        }
      }
    }
  }
}

// 6. Draw ACCESSORIES (e.g. Visor)
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const [ar, ag, ab, aa] = getPixel(accImg, x, y);
    blendPixel(outPNG, x, y, ar, ag, ab, aa);
  }
}

const buffer = PNG.sync.write(outPNG);
fs.writeFileSync(path.join(__dirname, 'test_composite.png'), buffer);
console.log('Saved test_composite.png successfully!');
