import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PfpStudio from './components/PfpStudio';
import PixelatorStudio from './components/PixelatorStudio';
import ShowcaseGallery from './components/ShowcaseGallery';
import TraitDocs from './components/TraitDocs';
import { preloadAllAssets } from './utils/assetLoader';

export default function App() {
  const [activeTab, setActiveTab] = useState('generator');

  useEffect(() => {
    // Preload all 70+ layer PNG assets on app launch
    preloadAllAssets();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-mono selection:bg-cyan-500 selection:text-zinc-950">
      {/* Top Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'generator' && <PfpStudio />}
        {activeTab === 'pixelator' && <PixelatorStudio />}
        {activeTab === 'showcase' && (
          <ShowcaseGallery
            setActiveTab={setActiveTab}
            onSelectPreset={(recipe) => {
              // Preset selected from gallery
            }}
          />
        )}
        {activeTab === 'docs' && <TraitDocs />}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-4 text-xs font-mono text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-zinc-300 font-bold">CHAINCRAFTER // ANIME PFP STUDIO</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">Strict Flat Solid-Color Design System</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-zinc-400">
            <span>Stack Order: 1.BG → 2.Skin → 3.Outfit → 4.Mouth → 5.Eyes → 6.Hair → 7.Acc</span>
            <span className="text-cyan-400 border border-zinc-800 px-2 py-0.5 bg-zinc-900">1000×1000 PNG</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
