import React, { useState } from 'react';
import { Search, Filter, Layers, User, Shirt, Smile, Eye, Scissors, Glasses, Check } from 'lucide-react';
import { CATEGORIES, BACKGROUNDS, BASE_SKINS, OUTFITS, MOUTHS, EYES, HAIR_STYLES, ACCESSORIES, RARITY_COLORS } from '../data/traitData';

export default function LayerControls({ selectedTraits, onSelectTrait }) {
  const [activeCategory, setActiveCategory] = useState('BACKGROUND');
  const [searchQuery, setSearchQuery] = useState('');
  const [rarityFilter, setRarityFilter] = useState('ALL');

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Layers': return Layers;
      case 'User': return User;
      case 'Shirt': return Shirt;
      case 'Smile': return Smile;
      case 'Eye': return Eye;
      case 'Scissors': return Scissors;
      case 'Glasses': return Glasses;
      default: return Layers;
    }
  };

  // Get list of options for a category
  const getCategoryOptions = (catId) => {
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

    // Apply Search Query Filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      options = options.filter(item => item.name.toLowerCase().includes(q) || (item.rarity && item.rarity.toLowerCase().includes(q)));
    }

    // Apply Rarity Filter
    if (rarityFilter !== 'ALL') {
      options = options.filter(item => item.rarity === rarityFilter);
    }

    return options;
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-4 flex flex-col h-full font-mono">
      {/* Category Tabs Header */}
      <div className="border-b border-zinc-800 pb-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center space-x-1.5">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Layer Customizer</span>
          </span>
          <span className="text-[10px] text-zinc-400">7 Trait Categories (v2 Pack)</span>
        </div>

        {/* Category Pill Buttons */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1">
          {CATEGORIES.map((cat) => {
            const Icon = getIcon(cat.icon);
            const isActive = activeCategory === cat.id;
            const hasSelected = selectedTraits[cat.id] && selectedTraits[cat.id] !== 'none';

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex flex-col items-center justify-center p-1.5 text-[10px] font-bold border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-950 text-cyan-400 border-cyan-500 shadow-[2px_2px_0px_0px_#00f3ff]'
                    : hasSelected
                    ? 'bg-zinc-900 text-zinc-200 border-zinc-700 hover:border-zinc-500'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 mb-1 ${isActive ? 'text-cyan-400' : 'text-zinc-400'}`} />
                <span className="truncate w-full text-center">{cat.label.split('. ')[1]}</span>
                {hasSelected && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search traits (e.g. Spiky, Visor, Pale, Heterochromia)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 text-zinc-100 placeholder-zinc-400 border border-zinc-800 text-xs font-mono pl-8 pr-3 py-1.5 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Rarity Filter Selector */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'Common', 'Uncommon', 'Rare', 'Legendary'].map((rarity) => (
            <button
              key={rarity}
              onClick={() => setRarityFilter(rarity)}
              className={`px-2 py-1 text-[10px] font-mono border uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                rarityFilter === rarity
                  ? 'bg-cyan-950 text-cyan-400 border-cyan-500 font-bold'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200'
              }`}
            >
              {rarity}
            </button>
          ))}
        </div>
      </div>

      {/* Active Category Description */}
      {(() => {
        const catObj = CATEGORIES.find(c => c.id === activeCategory);
        return catObj ? (
          <div className="mb-3 px-2 py-1.5 bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
            <span>{catObj.description}</span>
            <span className="text-cyan-400 font-bold">Stack #{catObj.order}</span>
          </div>
        ) : null;
      })()}

      {/* Trait Selection Grid */}
      <div className="flex-1 overflow-y-auto max-h-[400px] pr-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {getCategoryOptions(activeCategory).map((option) => {
            const isSelected = selectedTraits[activeCategory] === option.id;
            const rarityInfo = option.rarity ? RARITY_COLORS[option.rarity] : RARITY_COLORS.Common;

            return (
              <div
                key={option.id}
                onClick={() => onSelectTrait(activeCategory, option.id)}
                className={`relative group cursor-pointer p-2 border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-zinc-950 border-cyan-400 shadow-[3px_3px_0px_0px_#00f3ff]'
                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900'
                }`}
              >
                {/* Image Thumbnail / Color Swatch */}
                <div className="relative aspect-square bg-canvas-transparent border border-zinc-800 mb-1.5 flex items-center justify-center overflow-hidden">
                  {option.file ? (
                    <img
                      src={option.file}
                      alt={option.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                    />
                  ) : option.colorHex ? (
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: option.colorHex }}
                    />
                  ) : (
                    <span className="text-zinc-600 text-xs">None</span>
                  )}

                  {/* Active Indicator Checkmark */}
                  {isSelected && (
                    <div className="absolute top-1 right-1 bg-cyan-400 text-zinc-950 p-0.5 border border-zinc-950">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Trait Title & Rarity Badge */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-zinc-200 truncate w-full" title={option.name}>
                      {option.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[9px]">
                    <span className={`px-1.5 py-0.5 border font-bold ${rarityInfo.bg} ${rarityInfo.text} ${rarityInfo.border}`}>
                      {option.rarity || 'Common'}
                    </span>
                    {option.style && (
                      <span className="text-zinc-400 truncate max-w-[50px]">{option.style}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {getCategoryOptions(activeCategory).length === 0 && (
          <div className="p-8 text-center border border-dashed border-zinc-800 text-zinc-400 text-xs">
            No traits found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
}
