import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PNG } from 'pngjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packDir = path.join(__dirname, 'nft_pfp_pack');
const cleanDir = path.join(__dirname, 'public', 'clean_layers');

// Create output directories
['BACKGROUNDS', 'BASE_SKIN', 'OUTFITS', 'FACIAL_EXPRESSIONS', 'HAIR_STYLES', 'ACCESSORIES'].forEach(dir => {
  fs.mkdirSync(path.join(cleanDir, dir), { recursive: true });
});

function readPNG(filePath) {
  const data = fs.readFileSync(filePath);
  return PNG.sync.read(data);
}

function savePNG(png, outPath) {
  const buffer = PNG.sync.write(png);
  fs.writeFileSync(outPath, buffer);
}

const refPNG = readPNG(path.join(packDir, 'BASE_SKIN', 'pale_smooth.png'));
const W = refPNG.width;
const H = refPNG.height;

// Accurate pale skin pixel detector for this locked anime template
function isPaleSkinPixel(r, g, b) {
  // Pale skin range in Neon Arc template:
  // Light pale skin: ~rgb(252, 244, 233), Shaded pale skin: ~rgb(210, 185, 165), Shadow skin: ~rgb(175, 145, 125)
  const isSkinHue = (r >= 150 && g >= 115 && b >= 95 && r >= g && g >= b);
  const diffRG = r - g;
  const diffGB = g - b;
  const diffRB = r - b;

  return isSkinHue && diffRG >= 5 && diffRG <= 65 && diffGB >= 2 && diffGB <= 55 && diffRB <= 100;
}

console.log('1. Copying BACKGROUNDS, BASE_SKIN, and ACCESSORIES directly...');
['BACKGROUNDS', 'BASE_SKIN', 'ACCESSORIES'].forEach(folder => {
  const srcFolder = path.join(packDir, folder);
  const files = fs.readdirSync(srcFolder).filter(f => f.endsWith('.png'));
  files.forEach(f => {
    fs.copyFileSync(path.join(srcFolder, f), path.join(cleanDir, folder, f));
  });
  console.log(`   Copied ${files.length} files from ${folder}`);
});

console.log('\n2. Filtering pale skin from OUTFITS...');
const outfitFiles = fs.readdirSync(path.join(packDir, 'OUTFITS')).filter(f => f.endsWith('.png'));
outfitFiles.forEach(f => {
  const img = readPNG(path.join(packDir, 'OUTFITS', f));
  const out = new PNG({ width: W, height: H });

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (W * y + x) << 2;
      const oa = img.data[idx + 3];

      if (oa > 30) {
        const or = img.data[idx];
        const og = img.data[idx + 1];
        const ob = img.data[idx + 2];

        // Keep clothing pixels, make pale skin transparent
        if (!isPaleSkinPixel(or, og, ob)) {
          out.data[idx] = or;
          out.data[idx + 1] = og;
          out.data[idx + 2] = ob;
          out.data[idx + 3] = oa;
        }
      }
    }
  }

  savePNG(out, path.join(cleanDir, 'OUTFITS', f));
  console.log(`   Processed OUTFITS/${f}`);
});

console.log('\n3. Filtering pale skin from FACIAL_EXPRESSIONS...');
const exprFiles = fs.readdirSync(path.join(packDir, 'FACIAL_EXPRESSIONS')).filter(f => f.endsWith('.png'));
exprFiles.forEach(f => {
  const img = readPNG(path.join(packDir, 'FACIAL_EXPRESSIONS', f));
  const out = new PNG({ width: W, height: H });

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (W * y + x) << 2;
      const ea = img.data[idx + 3];

      if (ea > 30) {
        const er = img.data[idx];
        const eg = img.data[idx + 1];
        const eb = img.data[idx + 2];

        // Keep eyes, eyebrows, mouth, make pale skin & hair in expression frame transparent
        // Face region: x: 320-680, y: 380-650
        const inFaceRegion = (x >= 320 && x <= 680 && y >= 380 && y <= 650);

        if (inFaceRegion && !isPaleSkinPixel(er, eg, eb)) {
          // Check it's not the black hair at the top of face (y < 430) unless it's eyebrows
          if (y >= 430 || (er > 40 || eg > 40 || eb > 40)) {
            out.data[idx] = er;
            out.data[idx + 1] = eg;
            out.data[idx + 2] = eb;
            out.data[idx + 3] = ea;
          }
        }
      }
    }
  }

  savePNG(out, path.join(cleanDir, 'FACIAL_EXPRESSIONS', f));
  console.log(`   Processed FACIAL_EXPRESSIONS/${f}`);
});

console.log('\n4. Filtering pale skin from HAIR_STYLES...');
const hairFiles = fs.readdirSync(path.join(packDir, 'HAIR_STYLES')).filter(f => f.endsWith('.png'));
hairFiles.forEach(f => {
  const img = readPNG(path.join(packDir, 'HAIR_STYLES', f));
  const out = new PNG({ width: W, height: H });

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (W * y + x) << 2;
      const ha = img.data[idx + 3];

      if (ha > 30) {
        const hr = img.data[idx];
        const hg = img.data[idx + 1];
        const hb = img.data[idx + 2];

        // Keep hair cut & color pixels, make pale skin transparent
        if (!isPaleSkinPixel(hr, hg, hb)) {
          out.data[idx] = hr;
          out.data[idx + 1] = hg;
          out.data[idx + 2] = hb;
          out.data[idx + 3] = ha;
        }
      }
    }
  }

  savePNG(out, path.join(cleanDir, 'HAIR_STYLES', f));
  console.log(`   Processed HAIR_STYLES/${f}`);
});

console.log('\n🎉 ALL CLEAN TRANSPARENT LAYERS GENERATED SUCCESSFULLY!');
