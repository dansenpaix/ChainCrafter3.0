import React from 'react';
import { BookOpen, Layers, Shield, FileText, CheckCircle2, AlertTriangle, Cpu } from 'lucide-react';
import { CATEGORIES, RARITY_WEIGHTS, RARITY_COLORS } from '../data/traitData';

export default function TraitDocs() {
  return (
    <div className="space-y-6 font-mono text-zinc-300">
      {/* Header Banner */}
      <div className="bg-zinc-900 border border-zinc-800 p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-zinc-950 border border-cyan-500 text-cyan-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
              ChainCrafter — Trait Bible & Painter-Order Stack Reference (v0.9)
            </h2>
            <p className="text-xs text-zinc-400">
              Technical collection documentation, layer stacking rules, trait counts, and rarity specifications.
            </p>
          </div>
        </div>
      </div>

      {/* Painter Stack Order Matrix */}
      <div className="bg-zinc-900 border border-zinc-800 p-5 space-y-4">
        <h3 className="text-xs font-bold text-zinc-100 uppercase tracking-wider flex items-center space-x-2 border-b border-zinc-800 pb-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Recommended Painter Stack Order (Bottom → Top)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CATEGORIES.sort((a, b) => a.order - b.order).map((cat) => (
            <div key={cat.id} className="bg-zinc-950 border border-zinc-800 p-3 flex items-start space-x-3">
              <div className="w-7 h-7 bg-zinc-900 border border-cyan-500 text-cyan-400 font-bold text-xs flex items-center justify-center flex-shrink-0">
                #{cat.order}
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-100">{cat.label.split('. ')[1]}</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">{cat.description}</div>
                <div className="text-[10px] text-cyan-400 font-mono mt-1">Folder: /nft_pfp_pack/{cat.folder}/</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rarity & Trait Distribution Table */}
      <div className="bg-zinc-900 border border-zinc-800 p-5 space-y-4">
        <h3 className="text-xs font-bold text-zinc-100 uppercase tracking-wider flex items-center space-x-2 border-b border-zinc-800 pb-2">
          <Shield className="w-4 h-4 text-amber-400" />
          <span>Trait Rarity Matrix</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-zinc-800">
            <thead className="bg-zinc-950 text-cyan-400 uppercase border-b border-zinc-800">
              <tr>
                <th className="p-2.5">Trait Category</th>
                <th className="p-2.5">Common</th>
                <th className="p-2.5">Uncommon</th>
                <th className="p-2.5">Rare</th>
                <th className="p-2.5">Legendary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 bg-zinc-950">
              <tr>
                <td className="p-2.5 font-bold text-zinc-200">Skin Texture</td>
                <td className="p-2.5 text-zinc-400">Smooth Standard</td>
                <td className="p-2.5 text-cyan-400">Cyborg Seams</td>
                <td className="p-2.5 text-purple-400">Alien Glow Veins</td>
                <td className="p-2.5 text-amber-400 font-bold">Reptilian Scales</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-zinc-200">Hair Cut & Dye</td>
                <td className="p-2.5 text-zinc-400">Curtain / Bob</td>
                <td className="p-2.5 text-cyan-400">Undercut / Long</td>
                <td className="p-2.5 text-purple-400">Spiky Shonen</td>
                <td className="p-2.5 text-amber-400 font-bold">Neon Green + Spiky</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-zinc-200">Eye Optics</td>
                <td className="p-2.5 text-zinc-400">Golden Amber</td>
                <td className="p-2.5 text-cyan-400">Emerald / Violet</td>
                <td className="p-2.5 text-purple-400">Crimson Red</td>
                <td className="p-2.5 text-amber-400 font-bold">Heterochromia (Cyan/Pink)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-zinc-200">Outfit</td>
                <td className="p-2.5 text-zinc-400">Minimalist Tee / Kimono</td>
                <td className="p-2.5 text-cyan-400">Cyberpunk Hoodie</td>
                <td className="p-2.5 text-purple-400">Techwear Jacket</td>
                <td className="p-2.5 text-amber-400 font-bold">Mecha Collar</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-zinc-200">Accessories</td>
                <td className="p-2.5 text-zinc-400">None / Earrings</td>
                <td className="p-2.5 text-cyan-400">Glasses / Sunglasses</td>
                <td className="p-2.5 text-purple-400">Visor / Halo / Mask</td>
                <td className="p-2.5 text-amber-400 font-bold">Cybernetic Horns</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Production Notes & Specifications */}
      <div className="bg-zinc-900 border border-zinc-800 p-5 space-y-3">
        <h3 className="text-xs font-bold text-zinc-100 uppercase tracking-wider flex items-center space-x-2 border-b border-zinc-800 pb-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>Production Technical Specifications</span>
        </h3>

        <ul className="space-y-2 text-xs text-zinc-400">
          <li className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span><strong className="text-zinc-200">Canvas Dimensions:</strong> Native 1000 × 1000 px PNG with alpha transparency channel (opaque backgrounds).</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span><strong className="text-zinc-200">Pose Consistency:</strong> Locked head-and-shoulder anime bust template ensuring seamless alignment across all 70+ traits.</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span><strong className="text-zinc-200">ChainCrafter Smart Compositor:</strong> Intelligently extracts hair strands, skin textures, and eye optics so skin tones (Cyborg, Alien, Reptilian, Tan, Dark Brown, Warm Olive) render cleanly beneath hair cuts.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
