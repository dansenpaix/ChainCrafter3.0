import React from 'react';
import { Sparkles, Image, Shield, Layers, Sliders, BookOpen } from 'lucide-react';
import logoSvg from '../assets/logo.svg';

export default function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'generator', label: 'PFP Studio', icon: Sparkles, badge: 'Canvas Engine' },
    { id: 'pixelator', label: 'Punk-Ify Pixelator', icon: Sliders, badge: '8-Bit FX' },
    { id: 'showcase', label: 'Inspiration Showcase', icon: Image, badge: '8 Samples' },
    { id: 'docs', label: 'Trait Bible & Stack', icon: BookOpen, badge: 'v0.9 Docs' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('generator')}>
            <div className="w-10 h-10 bg-zinc-950 border border-cyan-500 overflow-hidden flex items-center justify-center shadow-[2px_2px_0px_0px_#00f3ff]">
              <img src={logoSvg} alt="ChainCrafter Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold tracking-wider text-zinc-100 text-lg">CHAIN<span className="text-cyan-400">CRAFTER</span></span>
                <span className="bg-zinc-800 text-cyan-400 text-[10px] font-mono px-1.5 py-0.5 border border-zinc-700 uppercase tracking-widest">PFP STUDIO</span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono hidden sm:block">Anime Bust Compositor & 8-Bit Pixelator</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-1 sm:space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center space-x-2 px-3 py-2 text-xs font-mono font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 text-cyan-400 border border-cyan-500 shadow-[2px_2px_0px_0px_#00f3ff]'
                      : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-zinc-200 hover:bg-zinc-900 hover:border-zinc-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-zinc-400'}`} />
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.label.split(' ')[0]}</span>
                  {isActive && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 animate-ping" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Status Badge */}
          <div className="hidden lg:flex items-center space-x-3 text-xs text-zinc-400">
            <div className="flex items-center space-x-1.5 bg-zinc-900 border border-zinc-800 px-2.5 py-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono text-zinc-300">70+ Layer Assets</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
