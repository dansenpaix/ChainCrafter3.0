import React, { useState } from 'react';
import CanvasPreview from './CanvasPreview';
import LayerControls from './LayerControls';
import { Sparkles, Dices, RotateCcw, Flame, ShieldAlert, Award, Zap } from 'lucide-react';
import {
  CATEGORIES,
  BACKGROUNDS,
  BASE_SKINS,
  OUTFITS,
  MOUTHS,
  EYES,
  HAIR_STYLES,
  ACCESSORIES,
  PRESET_RECIPES,
  RARITY_WEIGHTS,
  RARITY_COLORS
} from '../data/traitData';

export default function PfpStudio() {
  // Default trait selection for v2
  const [selectedTraits, setSelectedTraits] = useState({
    BACKGROUND: 'cyberpunk_grid',
    BASE_SKIN: 'pale_cyborg',
    OUTFITS: 'cyberpunk_hoodie',
    MOUTH: 'confident_smirk',
    EYES: 'confident_smirk_golden_amber',
    HAIR_STYLES: 'spiky_shonen_electric_blue',
    ACCESSORIES: 'cyber_visor'
  });

  // Individual layer visibility state (all visible by default)
  const [layerVisibility, setLayerVisibility] = useState({
    BACKGROUND: true,
    BASE_SKIN: true,
    OUTFITS: true,
    MOUTH: true,
    EYES: true,
    HAIR_STYLES: true,
    ACCESSORIES: true
  });

  // Active preset name if any matches
  const [activePreset, setActivePreset] = useState('Custom Build');

  // Handle trait selection
  const handleSelectTrait = (categoryId, traitId) => {
    setSelectedTraits(prev => ({
      ...prev,
      [categoryId]: traitId
    }));
    setActivePreset('Custom Build');
  };

  // Toggle individual layer visibility
  const toggleLayerVisibility = (categoryId) => {
    setLayerVisibility(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Randomize traits across all 7 categories
  const handleRandomize = () => {
    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)].id;

    const newTraits = {
      BACKGROUND: getRandomItem(BACKGROUNDS),
      BASE_SKIN: getRandomItem(BASE_SKINS),
      OUTFITS: getRandomItem(OUTFITS),
      MOUTH: getRandomItem(MOUTHS),
      EYES: getRandomItem(EYES),
      HAIR_STYLES: getRandomItem(HAIR_STYLES),
      ACCESSORIES: getRandomItem(ACCESSORIES)
    };

    setSelectedTraits(newTraits);
    setActivePreset('Random Roll 🎲');
  };

  // Reset to default traits
  const handleReset = () => {
    setSelectedTraits({
      BACKGROUND: 'solid_obsidian',
      BASE_SKIN: 'pale_smooth',
      OUTFITS: 'minimalist_tee',
      MOUTH: 'stoic_neutral',
      EYES: 'stoic_neutral_golden_amber',
      HAIR_STYLES: 'messy_curtain_obsidian_black',
      ACCESSORIES: 'none'
    });
    setActivePreset('Standard Starter');
  };

  // Apply a preset recipe
  const applyPreset = (recipe) => {
    setSelectedTraits(recipe.traits);
    setActivePreset(recipe.name);
  };

  // Calculate composite rarity score based on weights
  const calculateOverallRarity = () => {
    const getTraitRarity = (catId, traitId) => {
      let options = [];
      switch (catId) {
        case 'BACKGROUND': options = BACKGROUNDS; break;
        case 'BASE_SKIN': options = BASE_SKINS; break;
        case 'OUTFITS': options = OUTFITS; break;
        case 'MOUTH': options = MOUTHS; break;
        case 'EYES': options = EYES; break;
        case 'HAIR_STYLES': options = HAIR_STYLES; break;
        case 'ACCESSORIES': options = ACCESSORIES; break;
        default: options = [];
      }
      const item = options.find(i => i.id === traitId);
      return item ? item.rarity : 'Common';
    };

    let totalWeight = 0;
    const rarityCounts = { Common: 0, Uncommon: 0, Rare: 0, Legendary: 0 };

    CATEGORIES.forEach(cat => {
      const traitId = selectedTraits[cat.id];
      const rarity = getTraitRarity(cat.id, traitId);
      rarityCounts[rarity] += 1;
      totalWeight += RARITY_WEIGHTS[rarity] || 10;
    });

    // Score out of 700 max
    const rarityScore = Math.round((totalWeight / 700) * 100);

    let tier = 'Common';
    let tierColor = 'text-zinc-400';
    if (rarityScore >= 65) {
      tier = 'Legendary Sovereign';
      tierColor = 'text-amber-400';
    } else if (rarityScore >= 45) {
      tier = 'Rare Elite';
      tierColor = 'text-purple-400';
    } else if (rarityScore >= 25) {
      tier = 'Uncommon Runner';
      tierColor = 'text-cyan-400';
    }

    return { score: rarityScore, tier, tierColor, counts: rarityCounts };
  };

  const rarityStats = calculateOverallRarity();

  return (
    <div className="space-y-6 font-mono">
      {/* Preset Recipes & Top Bar */}
      <div className="bg-zinc-900 border border-zinc-800 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 pb-3 border-b border-zinc-800">
          <div>
            <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider flex items-center space-x-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Quick Preset Archetypes (v2 Engine)</span>
            </h2>
            <p className="text-[11px] text-zinc-400">One-click instant anime PFP trait combinations</p>
          </div>

          {/* Randomize & Reset Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRandomize}
              className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold px-3.5 py-2 text-xs uppercase tracking-wider flex items-center space-x-1.5 border border-cyan-300 shadow-[2px_2px_0px_0px_#09090b] transition-all cursor-pointer"
            >
              <Dices className="w-4 h-4 animate-bounce" />
              <span>Randomize Traits</span>
            </button>
            <button
              onClick={handleReset}
              className="bg-zinc-950 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 py-2 px-3 text-xs uppercase flex items-center space-x-1 transition-all cursor-pointer"
              title="Reset to Starter Traits"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Preset Recipe Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {PRESET_RECIPES.map((recipe) => {
            const isActive = activePreset === recipe.name;
            return (
              <button
                key={recipe.name}
                onClick={() => applyPreset(recipe)}
                className={`p-2 border text-left font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-950 border-cyan-400 text-cyan-400 shadow-[2px_2px_0px_0px_#00f3ff]'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-950'
                }`}
              >
                <div className="text-[11px] font-bold truncate">{recipe.name}</div>
                <div className="text-[9px] text-zinc-400 truncate mt-0.5">{recipe.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Grid: Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Canvas Preview (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <CanvasPreview
            selectedTraits={selectedTraits}
            layerVisibility={layerVisibility}
            toggleLayerVisibility={toggleLayerVisibility}
            onRandomize={handleRandomize}
            overallRarity={rarityStats}
          />

          {/* Rarity & Power Stats Meter */}
          <div className="bg-zinc-900 border border-zinc-800 p-4 font-mono">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Collection Rarity Score</span>
              </span>
              <span className={`text-xs font-bold ${rarityStats.tierColor}`}>
                {rarityStats.tier} ({rarityStats.score}/100)
              </span>
            </div>

            {/* Rarity Bar */}
            <div className="w-full bg-zinc-950 h-3 border border-zinc-800 overflow-hidden mb-3">
              <div
                className="h-full bg-cyan-400 transition-all duration-300"
                style={{ width: `${rarityStats.score}%` }}
              />
            </div>

            {/* Trait Rarity Breakdown Badges */}
            <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
              <div className="bg-zinc-950 p-1.5 border border-zinc-800">
                <div className="text-zinc-400">Common</div>
                <div className="font-bold text-zinc-300">{rarityStats.counts.Common}</div>
              </div>
              <div className="bg-zinc-950 p-1.5 border border-zinc-800">
                <div className="text-cyan-400">Uncommon</div>
                <div className="font-bold text-cyan-300">{rarityStats.counts.Uncommon}</div>
              </div>
              <div className="bg-zinc-950 p-1.5 border border-zinc-800">
                <div className="text-purple-400">Rare</div>
                <div className="font-bold text-purple-300">{rarityStats.counts.Rare}</div>
              </div>
              <div className="bg-zinc-950 p-1.5 border border-zinc-800">
                <div className="text-amber-400">Legendary</div>
                <div className="font-bold text-amber-300">{rarityStats.counts.Legendary}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Layer Customizer Controls (7 Cols) */}
        <div className="lg:col-span-7">
          <LayerControls
            selectedTraits={selectedTraits}
            onSelectTrait={handleSelectTrait}
          />
        </div>
      </div>
    </div>
  );
}
