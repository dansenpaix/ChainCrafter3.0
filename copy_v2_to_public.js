import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'nft_pfp_pack_v2');
const dstDir = path.join(__dirname, 'public', 'nft_pfp_pack_v2');

function copyRecursive(src, dst) {
  if (fs.statSync(src).isDirectory()) {
    fs.mkdirSync(dst, { recursive: true });
    fs.readdirSync(src).forEach(child => {
      copyRecursive(path.join(src, child), path.join(dst, child));
    });
  } else {
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
  }
}

console.log('Copying nft_pfp_pack_v2 to public/nft_pfp_pack_v2...');
copyRecursive(srcDir, dstDir);
console.log('✅ Done copying nft_pfp_pack_v2!');
