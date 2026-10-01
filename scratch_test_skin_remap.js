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

const W = 1000;
const H = 1000;

// Load images
const bgImg = readPNG('BACKGROUNDS/cyberpunk_grid.png');
const skinImg = readPNG('BASE_SKIN/darkbrown_reptilian.png');
const outfitImg = readPNG('OUTFITS/cyberpunk_hoodie.png');
const exprImg = readPNG('FACIAL_EXPRESSIONS/confident_smirk.png');
const hairImg = readPNG('HAIR_STYLES/spiky_shonen_electric_blue.png');
const accImg = readPNG('ACCESSORIES/cyber_visor.png');
const refPale = readPNG('BASE_SKIN/pale_smooth.png');

// Target composite canvas
const out = new PNG({ width: W, height: H });

// Helper to check if a pixel is pale skin tone
function isPaleSkinPixel(r, g, b) {
  // Pale skin in this pack: R: 200-255, G: 165-235, B: 145-215, R > G and G > B
  return (
    r >= 185 && r <= 255 &&
    g >= 150 && g <= 235 &&
    b >= 130 && b <= 215 &&
    (r - g) >= 10 && (g - b) >= 5 && (r - g) <= 55 &&
    Math.abs(r - g) + Math.abs(g - b) < 95
  );
}

// Extract average skin RGB from a skin image at sample face point (x: 500, y: 560)
function getSkinSampleColor(skinPNG) {
  const idx = (W * 560 + 500) << 2;
  return [skinPNG.data[idx], skinPNG.data[idx + 1], skinPNG.data[idx + 2]];
}

const [targetSkinR, targetSkinG, targetSkinB] = getSkinSampleColor(skinImg);
const [refSkinR, refSkinG, refSkinB] = getSkinSampleColor(refPale);

console.log(`Target Skin Color: rgb(${targetSkinR}, ${targetSkinG}, ${targetSkinB})`);
console.log(`Reference Pale Skin Color: rgb(${refSkinR}, ${refSkinG}, ${refSkinB})`);

// Compositing step:
// Start with Background
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const idx = (W * y + x) << 2;
    out.data[idx] = bgImg.data[idx];
    out.data[idx + 1] = bgImg.data[idx + 1];
    out.data[idx + 2] = bgImg.data[idx + 2];
    out.data[idx + 3] = 255;
  }
}

// Base Skin Layer (Dark Brown Reptilian)
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const idx = (W * y + x) << 2;
    const sa = skinImg.data[idx + 3];
    if (sa > 50) {
      out.data[idx] = skinImg.data[idx];
      out.data[idx + 1] = skinImg.data[idx + 1];
      out.data[idx + 2] = skinImg.data[idx + 2];
      out.data[idx + 3] = 255;
    }
  }
}

// Outfit Layer (Cyberpunk Hoodie)
for (let y = 500; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const idx = (W * y + x) << 2;
    const oa = outfitImg.data[idx + 3];
    if (oa > 50) {
      const or = outfitImg.data[idx];
      const og = outfitImg.data[idx + 1];
      const ob = outfitImg.data[idx + 2];

      if (!isPaleSkinPixel(or, og, ob)) {
        out.data[idx] = or;
        out.data[idx + 1] = og;
        out.data[idx + 2] = ob;
        out.data[idx + 3] = 255;
      }
    }
  }
}

// Facial Expression Layer (Confident Smirk eyes & mouth)
for (let y = 400; y < 640; y++) {
  for (let x = 320; x < 680; x++) {
    const idx = (W * y + x) << 2;
    const ea = exprImg.data[idx + 3];
    if (ea > 50) {
      const er = exprImg.data[idx];
      const eg = exprImg.data[idx + 1];
      const eb = exprImg.data[idx + 2];

      if (!isPaleSkinPixel(er, eg, eb)) {
        out.data[idx] = er;
        out.data[idx + 1] = eg;
        out.data[idx + 2] = eb;
        out.data[idx + 3] = 255;
      }
    }
  }
}

// Hair Style Layer (Spiky Shonen Electric Blue)
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const idx = (W * y + x) << 2;
    const ha = hairImg.data[idx + 3];
    if (ha > 50) {
      const hr = hairImg.data[idx];
      const hg = hairImg.data[idx + 1];
      const hb = hairImg.data[idx + 2];

      if (!isPaleSkinPixel(hr, hg, hb)) {
        out.data[idx] = hr;
        out.data[idx + 1] = hg;
        out.data[idx + 2] = hb;
        out.data[idx + 3] = 255;
      }
    }
  }
}

// Accessories Layer (Cyber Visor)
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const idx = (W * y + x) << 2;
    const aa = accImg.data[idx + 3];
    if (aa > 50) {
      out.data[idx] = accImg.data[idx];
      out.data[idx + 1] = accImg.data[idx + 1];
      out.data[idx + 2] = accImg.data[idx + 2];
      out.data[idx + 3] = 255;
    }
  }
}

const buffer = PNG.sync.write(out);
fs.writeFileSync(path.join(__dirname, 'test_skin_remap.png'), buffer);
console.log('Saved test_skin_remap.png successfully!');
