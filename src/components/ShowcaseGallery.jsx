import React, { useState } from 'react';
import { Image, Eye, Sparkles, Tag, ArrowRight, X } from 'lucide-react';
import { PREVIEWS, PRESET_RECIPES } from '../data/traitData';

export default function ShowcaseGallery({ onSelectPreset, setActiveTab }) {
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [activeModalItem, setActiveModalItem] = useState(null);

  // Extract all unique tags from preview samples
  const allTags = ['ALL', ...new Set(PREVIEWS.flatMap(p => p.tags))];

  // Filter previews by selected tag
  const filteredPreviews = selectedTag === 'ALL'
    ? PREVIEWS
    : PREVIEWS.filter(p => p.tags.includes(selectedTag));

  const handleLoadRecipe = (index) => {
    // Map preview to one of our preset recipes
    const recipe = PRESET_RECIPES[index % PRESET_RECIPES.length];
    onSelectPreset(recipe);
    setActiveTab('generator');
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Top Banner */}
      <div className="bg-zinc-900 border border-zinc-800 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-zinc-950 border border-cyan-500 text-cyan-400">
              <Image className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
                Pre-Rendered Collection Showcase
              </h2>
              <p className="text-xs text-zinc-400">
                Inspiration gallery featuring 1000×1000 composite anime bust samples from the Neon Arc collection.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('generator')}
            className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold px-3 py-1.5 text-xs uppercase tracking-wider flex items-center space-x-1 border border-cyan-300 transition-all cursor-pointer self-start sm:self-center"
          >
            <span>Launch Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tag Filters */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-2">
        <Tag className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0 ml-1" />
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 text-xs border uppercase tracking-wider font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedTag === tag
                ? 'bg-cyan-950 text-cyan-400 border-cyan-500'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid of Preview Artworks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredPreviews.map((item, index) => (
          <div
            key={item.id}
            className="bg-zinc-900 border border-zinc-800 hover:border-cyan-500/80 p-3 transition-all group flex flex-col justify-between"
          >
            {/* Image Thumbnail */}
            <div
              className="relative aspect-square bg-canvas-transparent border border-zinc-800 mb-3 overflow-hidden cursor-pointer"
              onClick={() => setActiveModalItem(item)}
            >
              <img
                src={item.file}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-zinc-950 text-cyan-400 border border-cyan-500 px-3 py-1 text-xs font-bold flex items-center space-x-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Art</span>
                </div>
              </div>
            </div>

            {/* Title & Tags */}
            <div>
              <h3 className="text-xs font-bold text-zinc-100 truncate mb-1">{item.name}</h3>
              <div className="flex flex-wrap gap-1 mb-3">
                {item.tags.map(t => (
                  <span key={t} className="text-[9px] bg-zinc-950 text-cyan-400 border border-zinc-800 px-1.5 py-0.5">
                    #{t}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleLoadRecipe(index)}
                className="w-full bg-zinc-950 hover:bg-zinc-800 text-zinc-200 hover:text-cyan-400 border border-zinc-800 hover:border-zinc-600 py-1.5 px-2 text-[11px] font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Load Recipe in Studio</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Artwork Inspection Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border-2 border-cyan-500 max-w-lg w-full p-4 space-y-4 shadow-[8px_8px_0px_0px_#00f3ff]">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                1000×1000 Masterpiece Preview
              </span>
              <button
                onClick={() => setActiveModalItem(null)}
                className="p-1 text-zinc-400 hover:text-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-square bg-canvas-transparent border border-zinc-800 overflow-hidden">
              <img src={activeModalItem.file} alt={activeModalItem.name} className="w-full h-full object-contain" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-zinc-100">{activeModalItem.name}</h3>
                <div className="flex gap-1 mt-1">
                  {activeModalItem.tags.map(t => (
                    <span key={t} className="text-[10px] text-cyan-400 bg-zinc-950 border border-zinc-800 px-1.5 py-0.5">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  handleLoadRecipe(PREVIEWS.findIndex(p => p.id === activeModalItem.id));
                  setActiveModalItem(null);
                }}
                className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold px-4 py-2 text-xs uppercase tracking-wider border border-cyan-300 cursor-pointer"
              >
                Load Traits in Studio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
