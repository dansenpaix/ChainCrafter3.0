import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PNG } from 'pngjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packDir = path.join(__dirname, 'nft_pfp_pack');

function analyzeImage(relPath) {
  const fullPath = path.join(packDir, relPath);
  if (!fs.existsSync(fullPath)) return;
  const data = fs.readFileSync(fullPath);
  const png = PNG.sync.read(data);

  let opaque = 0;
  let topOpaque = 0;
  let midOpaque = 0;
  let botOpaque = 0;

  for (let y = 0; y < png.height; y++) {
    for (let x = 0; x < png.width; x++) {
      const idx = (png.width * y + x) << 2;
      const alpha = png.data[idx + 3];
      if (alpha > 200) {
        opaque++;
        if (y < 350) topOpaque++;
        else if (y < 650) midOpaque++;
        else botOpaque++;
      }
    }
  }

  console.log(`[${relPath}] Opaque: ${opaque} | Top: ${topOpaque} | Mid: ${midOpaque} | Bot: ${botOpaque}`);
}

console.log('=== BASE SKINS ===');
analyzeImage('BASE_SKIN/pale_smooth.png');
analyzeImage('BASE_SKIN/pale_cyborg.png');
analyzeImage('BASE_SKIN/darkbrown_reptilian.png');

console.log('\n=== HAIR STYLES ===');
analyzeImage('HAIR_STYLES/spiky_shonen_electric_blue.png');
analyzeImage('HAIR_STYLES/bob_cut_hot_pink.png');
analyzeImage('HAIR_STYLES/cyberpunk_undercut_neon_green.png');

console.log('\n=== OUTFITS ===');
analyzeImage('OUTFITS/cyberpunk_hoodie.png');
analyzeImage('OUTFITS/mecha_suit_collar.png');
