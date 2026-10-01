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

// Pale smooth template as baseline reference
const refPNG = readPNG(path.join(packDir, 'BASE_SKIN', 'pale_smooth.png'));
const W = refPNG.width;
const H = refPNG.height;

console.log('1. Copying BACKGROUNDS, BASE_SKIN, and ACCESSORIES directly...');
['BACKGROUNDS', 'BASE_SKIN', 'ACCESSORIES'].forEach(folder => {
  const srcFolder = path.join(packDir, folder);
  const files = fs.readdirSync(srcFolder).filter(f => f.endsWith('.png'));
  files.forEach(f => {
    fs.copyFileSync(path.join(srcFolder, f), path.join(cleanDir, folder, f));
  });
  console.log(`   Copied ${files.length} files from ${folder}`);
});

console.log('\n2. Processing FACIAL_EXPRESSIONS into isolated eye/mouth feature overlays...');
const exprFiles = fs.readdirSync(path.join(packDir, 'FACIAL_EXPRESSIONS')).filter(f => f.endsWith('.png'));
exprFiles.forEach(f => {
  const img = readPNG(path.join(packDir, 'FACIAL_EXPRESSIONS', f));
  const out = new PNG({ width: W, height: H });

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (W * y + x) << 2;
      const ea = img.data[idx + 3];

      if (ea > 50) {
        const er = img.data[idx];
        const eg = img.data[idx + 1];
        const eb = img.data[idx + 2];

        const rr = refPNG.data[idx];
        const rg = refPNG.data[idx + 1];
        const rb = refPNG.data[idx + 2];

        const diff = Math.abs(er - rr) + Math.abs(eg - rg) + Math.abs(eb - rb);

        // Check if pixel is eye, eyebrow, or mouth expression feature
        // Face region: x: 330-670, y: 380-640
        const inFaceRegion = (x >= 330 && x <= 670 && y >= 380 && y <= 640);
        const isSkin = (er > 185 && eg > 145 && eb > 125 && Math.abs(er - eg) < 65);

        if (inFaceRegion && diff > 18 && (!isSkin || y > 535 || diff > 45)) {
          out.data[idx] = er;
          out.data[idx + 1] = eg;
          out.data[idx + 2] = eb;
          out.data[idx + 3] = ea;
        }
      }
    }
  }

  savePNG(out, path.join(cleanDir, 'FACIAL_EXPRESSIONS', f));
  console.log(`   Processed FACIAL_EXPRESSIONS/${f}`);
});

console.log('\n3. Processing HAIR_STYLES into isolated hair cut & color overlays...');
const hairFiles = fs.readdirSync(path.join(packDir, 'HAIR_STYLES')).filter(f => f.endsWith('.png'));
hairFiles.forEach(f => {
  const img = readPNG(path.join(packDir, 'HAIR_STYLES', f));
  const out = new PNG({ width: W, height: H });

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (W * y + x) << 2;
      const ha = img.data[idx + 3];

      if (ha > 50) {
        const hr = img.data[idx];
        const hg = img.data[idx + 1];
        const hb = img.data[idx + 2];

        const rr = refPNG.data[idx];
        const rg = refPNG.data[idx + 1];
        const rb = refPNG.data[idx + 2];

        const isSkin = (hr > 190 && hg > 155 && hb > 135 && Math.abs(hr - hg) < 60);

        // Keep hair strands (top area y < 450, or non-skin hair pixels)
        if (!isSkin || y < 330) {
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

console.log('\n4. Processing OUTFITS into isolated clothing overlays...');
const outfitFiles = fs.readdirSync(path.join(packDir, 'OUTFITS')).filter(f => f.endsWith('.png'));
outfitFiles.forEach(f => {
  const img = readPNG(path.join(packDir, 'OUTFITS', f));
  const out = new PNG({ width: W, height: H });

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (W * y + x) << 2;
      const oa = img.data[idx + 3];

      if (oa > 50 && y > 530) {
        const or = img.data[idx];
        const og = img.data[idx + 1];
        const ob = img.data[idx + 2];

        const rr = refPNG.data[idx];
        const rg = refPNG.data[idx + 1];
        const rb = refPNG.data[idx + 2];

        const isSkin = (or > 185 && og > 145 && ob > 125 && Math.abs(or - og) < 65);

        if (!isSkin || y > 640) {
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

console.log('\n✅ ALL CLEAN LAYERS GENERATED SUCCESSFULLY IN public/clean_layers/!');
