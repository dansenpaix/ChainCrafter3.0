import React, { useRef, useEffect, useState } from 'react';
import { Download, FileJson, Eye, EyeOff, ZoomIn, ZoomOut, Maximize2, Sparkles, Check, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CATEGORIES, BACKGROUNDS, BASE_SKINS, OUTFITS, MOUTHS, EYES, HAIR_STYLES, ACCESSORIES, RARITY_COLORS, LAYER_OFFSETS, getLayerOffset } from '../data/traitData';
import { getCachedImage, loadImagesBatch, preloadAllAssets } from '../utils/assetLoader';

export default function CanvasPreview({
  selectedTraits,
  layerVisibility,
  toggleLayerVisibility,
  onRandomize,
  overallRarity
}) {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [copiedMetadata, setCopiedMetadata] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Preload all trait assets into memory cache on mount
  useEffect(() => {
    preloadAllAssets();
  }, []);

  // Helper to map category to selected item object
  const getSelectedTraitObject = (categoryId) => {
    const selectedId = selectedTraits[categoryId];
    if (!selectedId || selectedId === 'none') return null;

    switch (categoryId) {
      case 'BACKGROUND': return BACKGROUNDS.find(item => item.id === selectedId);
      case 'BASE_SKIN': return BASE_SKINS.find(item => item.id === selectedId);
      case 'OUTFITS': return OUTFITS.find(item => item.id === selectedId);
      case 'MOUTH': return MOUTHS.find(item => item.id === selectedId);
      case 'EYES': return EYES.find(item => item.id === selectedId);
      case 'HAIR_STYLES': return HAIR_STYLES.find(item => item.id === selectedId);
      case 'ACCESSORIES': return ACCESSORIES.find(item => item.id === selectedId);
      default: return null;
    }
  };

  // Re-draw canvas whenever selected traits or visibility changes
  useEffect(() => {
    let isMounted = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Standard 1000x1000 high-res canvas size anchor
    canvas.width = 1000;
    canvas.height = 1000;

    // Mandatory bottom-to-top render stack sequence:
    // Index 0: BACKGROUND (Solid/Grid)
    // Index 1: BASE_SKIN (Head, neck, shoulders template)
    // Index 2: OUTFITS (Clothing collars/hoodies over the shoulders)
    // Index 3: MOUTH (Snapped to the lower face socket)
    // Index 4: EYES / EYE OPTICS (Snapped to the eye socket level)
    // Index 5: HAIR_STYLES & COLORS (Seated over forehead/top of head)
    // Index 6: ACCESSORIES (Visors, masks, glasses, horns sitting on top)
    const sortedCategories = [...CATEGORIES].sort((a, b) => a.order - b.order);

    // Build array of active layer objects
    const activeLayers = sortedCategories
      .map(cat => {
        const isVisible = layerVisibility[cat.id] !== false;
        const traitObj = getSelectedTraitObject(cat.id);
        return {
          categoryId: cat.id,
          categoryLabel: cat.label,
          order: cat.order,
          traitObj,
          isVisible,
          filePath: traitObj ? traitObj.file : null
        };
      })
      .filter(layer => layer.isVisible && layer.filePath);

    if (activeLayers.length === 0) {
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, 1000, 1000);
      setLoading(false);
      return;
    }

    // Check if all images are already cached & complete
    const cachedImages = activeLayers.map(l => getCachedImage(l.filePath));
    const allCached = cachedImages.every(img => img && img.complete && img.naturalWidth > 0);

    const drawLayers = (layersWithImages) => {
      ctx.clearRect(0, 0, 1000, 1000);
      const baseDim = 1000;

      layersWithImages.forEach(({ layer, img }) => {
        const isLoaded = img && img.complete && img.naturalWidth > 0;
        if (!isLoaded) return;

        // Fetch the calibrated offsets (supports category defaults + individual trait overrides)
        const offset = getLayerOffset(layer.categoryId, layer.traitObj);
        const scale = offset.scale || 1.0;

        const drawW = baseDim * scale;
        const drawH = baseDim * scale;

        const drawX = offset.x + ((baseDim - drawW) / 2);
        const drawY = offset.y + ((baseDim - drawH) / 2);

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      });
    };

    if (allCached) {
      // Immediate 0ms synchronous render
      const layersWithImages = activeLayers.map((layer, index) => ({
        layer,
        img: cachedImages[index]
      }));
      drawLayers(layersWithImages);
      setLoading(false);
    } else {
      // Show spinner only while first fetch completes
      setLoading(true);
      loadImagesBatch(activeLayers.map(l => l.filePath)).then(images => {
        if (!isMounted) return;
        const layersWithImages = activeLayers.map((layer, index) => ({
          layer,
          img: images[index]
        }));
        drawLayers(layersWithImages);
        setLoading(false);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [selectedTraits, layerVisibility]);

  // Download High-Res 1000x1000 PNG
  const handleDownloadPNG = () => {
    setDownloading(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00f3ff', '#ff007f', '#39ff14', '#ffb700']
      });
    } catch (e) {}

    setTimeout(() => {
      const imageURI = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `chaincrafter_pfp_${Date.now()}.png`;
      link.href = imageURI;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloading(false);
    }, 150);
  };

  // Generate ERC-721 Metadata JSON
  const generateMetadataJSON = () => {
    const attributes = CATEGORIES.map(cat => {
      const traitObj = getSelectedTraitObject(cat.id);
      return {
        trait_type: cat.id.replace('_', ' '),
        value: traitObj ? traitObj.name : 'None',
        rarity: traitObj ? traitObj.rarity : 'Common'
      };
    });

    return {
      name: `ChainCrafter #${Math.floor(1000 + Math.random() * 9000)}`,
      description: 'Generative anime PFP bust created with ChainCrafter Studio.',
      image: 'ipfs://',
      attributes,
      compiler: 'ChainCrafter Studio v2'
    };
  };

  // Download Metadata JSON File
  const handleDownloadJSON = () => {
    const metadata = generateMetadataJSON();
    const jsonStr = JSON.stringify(metadata, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chaincrafter_pfp_${Date.now()}_metadata.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy Metadata JSON to clipboard
  const handleCopyJSON = () => {
    const metadata = generateMetadataJSON();
    navigator.clipboard.writeText(JSON.stringify(metadata, null, 2));
    setCopiedMetadata(true);
    setTimeout(() => setCopiedMetadata(false), 2000);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-4 sm:p-5 flex flex-col items-center font-mono">
      {/* Top Action Bar */}
      <div className="w-full flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 bg-cyan-400 animate-pulse"></span>
          <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
            1000×1000 Live Canvas Engine (v2)
          </span>
          <span className="hidden sm:inline-flex items-center space-x-1 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.5">
            <Zap className="w-3 h-3 fill-emerald-400" />
            <span>Instant Preloaded</span>
          </span>
        </div>

        {/* Zoom & Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.1))}
            className="p-1 bg-zinc-950 text-zinc-400 hover:text-zinc-100 border border-zinc-800 hover:border-zinc-700 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] text-zinc-400 w-10 text-center">{Math.round(zoomLevel * 100)}%</span>
          <button
            onClick={() => setZoomLevel(prev => Math.min(1.4, prev + 0.1))}
            className="p-1 bg-zinc-950 text-zinc-400 hover:text-zinc-100 border border-zinc-800 hover:border-zinc-700 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1 bg-zinc-950 text-zinc-400 hover:text-zinc-100 border border-zinc-800 hover:border-zinc-700 cursor-pointer"
            title="Reset Scale"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Central Canvas Container */}
      <div className="relative w-full max-w-[520px] aspect-square bg-canvas-transparent border-2 border-zinc-700 shadow-[4px_4px_0px_0px_#18181b] overflow-hidden flex items-center justify-center">
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-zinc-950/60 z-20 flex flex-col items-center justify-center space-y-2 backdrop-blur-[2px]">
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent animate-spin"></div>
            <p className="text-xs text-cyan-400">Rendering v2 composite...</p>
          </div>
        )}

        {/* HTML5 Canvas Element */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain transition-transform duration-150"
          style={{ transform: `scale(${zoomLevel})` }}
        />

        {/* Canvas Corner Watermark */}
        <div className="absolute bottom-2 right-2 bg-zinc-950/90 border border-zinc-800 text-[10px] text-cyan-400 px-2 py-0.5 pointer-events-none">
          CHAINCRAFTER v2
        </div>
      </div>

      {/* Layer Stack Inspector */}
      <div className="w-full mt-4 pt-3 border-t border-zinc-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            Painter Stack Order (1 → 7)
          </span>
          <span className="text-[10px] text-zinc-400">Toggle layer visibility</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {CATEGORIES.sort((a, b) => a.order - b.order).map((cat) => {
            const traitObj = getSelectedTraitObject(cat.id);
            const isVisible = layerVisibility[cat.id] !== false;
            const rarityInfo = traitObj ? RARITY_COLORS[traitObj.rarity] : null;

            return (
              <div
                key={cat.id}
                className={`flex items-center justify-between px-2 py-1.5 text-xs border transition-all ${
                  isVisible
                    ? 'bg-zinc-950 border-zinc-800 text-zinc-200'
                    : 'bg-zinc-950/40 border-zinc-900 text-zinc-600'
                }`}
              >
                <div className="flex items-center space-x-1.5 truncate">
                  <span className="text-[10px] text-zinc-400">{cat.order}.</span>
                  <span className="truncate text-[11px] font-medium">
                    {traitObj ? traitObj.name.split('/')[0] : 'None'}
                  </span>
                </div>

                <div className="flex items-center space-x-1 ml-1 flex-shrink-0">
                  {traitObj && (
                    <span className={`text-[9px] px-1 font-bold ${rarityInfo?.text || 'text-zinc-400'}`}>
                      {traitObj.rarity[0]}
                    </span>
                  )}
                  <button
                    onClick={() => toggleLayerVisibility(cat.id)}
                    className="p-1 hover:text-cyan-400 text-zinc-400 cursor-pointer"
                    title={isVisible ? 'Hide Layer' : 'Show Layer'}
                  >
                    {isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3 text-zinc-600" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Download & Action Buttons */}
      <div className="w-full mt-4 pt-3 border-t border-zinc-800 flex flex-col sm:flex-row gap-2">
        <button
          onClick={handleDownloadPNG}
          disabled={loading || downloading}
          className="flex-1 bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 text-zinc-950 font-bold py-2.5 px-4 text-xs uppercase tracking-wider flex items-center justify-center space-x-2 border border-cyan-300 shadow-[3px_3px_0px_0px_#09090b] transition-all disabled:opacity-50 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{downloading ? 'Exporting PNG...' : 'Download NFT PFP (1000x1000)'}</span>
        </button>

        <button
          onClick={handleDownloadJSON}
          className="bg-zinc-950 hover:bg-zinc-800 text-cyan-400 border border-zinc-700 hover:border-cyan-500 py-2.5 px-3 text-xs uppercase font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
          title="Download ERC-721 Metadata JSON"
        >
          <FileJson className="w-4 h-4" />
          <span className="hidden sm:inline">JSON</span>
        </button>

        <button
          onClick={handleCopyJSON}
          className="bg-zinc-950 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-zinc-500 py-2.5 px-3 text-xs uppercase font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
          title="Copy Metadata to Clipboard"
        >
          {copiedMetadata ? <Check className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4 text-amber-400" />}
          <span className="hidden sm:inline">{copiedMetadata ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </div>
  );
}
