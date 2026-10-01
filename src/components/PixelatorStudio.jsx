import React, { useState, useRef, useEffect } from 'react';
import { Upload, Sliders, Image, Download, RefreshCw, Sparkles, Grid, Palette, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PREVIEWS } from '../data/traitData';

export default function PixelatorStudio() {
  const [selectedImage, setSelectedImage] = useState('/nft_pfp_pack/PREVIEWS/preview_spiky_blue.png');
  const [blockSize, setBlockSize] = useState(16); // 4px to 64px
  const [colorPalette, setColorPalette] = useState('ORIGINAL'); // ORIGINAL, DUOTONE, CRYPTOPUNK, MATRIX, GAMEBOY, NOIR
  const [showGridOverlay, setShowGridOverlay] = useState(true);
  const [contrastLevel, setContrastLevel] = useState(100); // 50% to 200%
  const [downloading, setDownloading] = useState(false);

  const sourceImageRef = useRef(null);
  const canvasRef = useRef(null);

  // Palettes definition
  const PALETTES = [
    { id: 'ORIGINAL', name: 'Original 8-Bit', description: 'Classic downsampled pixel colors', icon: '🎨' },
    { id: 'DUOTONE', name: 'Cyber Neon Duotone', description: 'High contrast Cyan & Hot Pink', icon: '⚡' },
    { id: 'CRYPTOPUNK', name: 'CryptoPunk Retro', description: 'Vintage 16-color arcade palette', icon: '👾' },
    { id: 'MATRIX', name: 'Matrix Terminal', description: 'Neon green phosphor monochrome', icon: '💻' },
    { id: 'GAMEBOY', name: 'Game Boy Classic', description: 'Monochrome 4-shade green', icon: '🕹️' },
    { id: 'NOIR', name: 'Noir High Contrast', description: 'Grayscale stark black & white', icon: '🎬' }
  ];

  // Handle user image upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Re-pixelate image whenever settings or image change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedImage) return;

    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // Standard output canvas 800x800
      canvas.width = 800;
      canvas.height = 800;

      // 1. Offscreen downsampling canvas
      const sampleWidth = Math.max(8, Math.floor(800 / blockSize));
      const sampleHeight = Math.max(8, Math.floor(800 / blockSize));

      const offCanvas = document.createElement('canvas');
      offCanvas.width = sampleWidth;
      offCanvas.height = sampleHeight;
      const offCtx = offCanvas.getContext('2d');

      // Draw image onto tiny offscreen canvas (downsampling)
      offCtx.drawImage(img, 0, 0, sampleWidth, sampleHeight);

      // Get pixel data
      const imgData = offCtx.getImageData(0, 0, sampleWidth, sampleHeight);
      const data = imgData.data;

      // Apply Palette & Contrast Transformations
      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        // Apply contrast factor
        if (contrastLevel !== 100) {
          const factor = (259 * (contrastLevel + 255)) / (255 * (259 - contrastLevel));
          r = Math.min(255, Math.max(0, factor * (r - 128) + 128));
          g = Math.min(255, Math.max(0, factor * (g - 128) + 128));
          b = Math.min(255, Math.max(0, factor * (b - 128) + 128));
        }

        const avg = (r + g + b) / 3;

        if (colorPalette === 'DUOTONE') {
          // Cyan (#00f3ff) & Magenta/Pink (#ff007f)
          if (avg > 128) {
            data[i] = 0;     // R
            data[i + 1] = 243; // G
            data[i + 2] = 255; // B
          } else {
            data[i] = 255;   // R
            data[i + 1] = 0;   // G
            data[i + 2] = 127; // B
          }
        } else if (colorPalette === 'MATRIX') {
          // Terminal Green (#00ff66)
          data[i] = 0;
          data[i + 1] = Math.min(255, avg * 1.2);
          data[i + 2] = 50;
        } else if (colorPalette === 'GAMEBOY') {
          // 4 shades of Game Boy Green
          if (avg > 192) { data[i] = 155; data[i + 1] = 188; data[i + 2] = 15; }
          else if (avg > 128) { data[i] = 139; data[i + 1] = 172; data[i + 2] = 15; }
          else if (avg > 64) { data[i] = 48; data[i + 1] = 98; data[i + 2] = 48; }
          else { data[i] = 15; data[i + 1] = 56; data[i + 2] = 15; }
        } else if (colorPalette === 'NOIR') {
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        } else if (colorPalette === 'CRYPTOPUNK') {
          // Quantize RGB into 4 levels per channel (64 color palette)
          data[i] = Math.round(r / 64) * 64;
          data[i + 1] = Math.round(g / 64) * 64;
          data[i + 2] = Math.round(b / 64) * 64;
        } else {
          data[i] = r;
          data[i + 1] = g;
          data[i + 2] = b;
        }
      }

      offCtx.putImageData(imgData, 0, 0);

      // Disable image smoothing for crisp pixel scaling!
      ctx.imageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.msImageSmoothingEnabled = false;

      // Draw upsampled pixelated image onto main canvas
      ctx.clearRect(0, 0, 800, 800);
      ctx.drawImage(offCanvas, 0, 0, sampleWidth, sampleHeight, 0, 0, 800, 800);

      // Draw Pixel Grid Overlay if enabled
      if (showGridOverlay) {
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.lineWidth = 1;
        const cellW = 800 / sampleWidth;
        const cellH = 800 / sampleHeight;

        ctx.beginPath();
        for (let x = 0; x <= 800; x += cellW) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, 800);
        }
        for (let y = 0; y <= 800; y += cellH) {
          ctx.moveTo(0, y);
          ctx.lineTo(800, y);
        }
        ctx.stroke();
      }
    };

    img.src = selectedImage;
  }, [selectedImage, blockSize, colorPalette, showGridOverlay, contrastLevel]);

  // Download Pixel PFP
  const handleDownload = () => {
    setDownloading(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      confetti({
        particleCount: 70,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#00f3ff', '#39ff14', '#ff007f']
      });
    } catch (e) {}

    setTimeout(() => {
      const link = document.createElement('a');
      link.download = `punk_ify_pixel_pfp_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloading(false);
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-zinc-900 border border-zinc-800 p-4 font-mono">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-zinc-950 border border-cyan-500 text-cyan-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
              "PUNK-IFY" PIXELATOR STUDIO
            </h2>
            <p className="text-xs text-zinc-400">
              Convert selfies or anime portraits into 8-bit CryptoPunk style pixel art directly in your browser.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Source & File Upload */}
        <div className="lg:col-span-5 space-y-4 font-mono">
          {/* File Upload Box */}
          <div className="bg-zinc-900 border border-zinc-800 p-4">
            <label className="block text-xs font-bold text-zinc-200 uppercase tracking-wider mb-2">
              1. Upload Your Photo or Select Sample
            </label>

            <label className="border-2 border-dashed border-zinc-700 hover:border-cyan-500 bg-zinc-950 p-6 flex flex-col items-center justify-center cursor-pointer transition-all">
              <Upload className="w-8 h-8 text-cyan-400 mb-2" />
              <span className="text-xs font-bold text-zinc-200">Click or Drag Image Here</span>
              <span className="text-[10px] text-zinc-400 mt-1">Supports PNG, JPG, WEBP</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Quick Sample Selector */}
            <div className="mt-4">
              <span className="text-[11px] text-zinc-400 block mb-2">Or test with preset anime samples:</span>
              <div className="grid grid-cols-4 gap-2">
                {PREVIEWS.slice(0, 4).map((preview) => (
                  <button
                    key={preview.id}
                    onClick={() => setSelectedImage(preview.file)}
                    className={`aspect-square border bg-zinc-950 overflow-hidden transition-all ${
                      selectedImage === preview.file ? 'border-cyan-400 shadow-[2px_2px_0px_0px_#00f3ff]' : 'border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    <img src={preview.file} alt={preview.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Controls & Pixelation Parameters */}
          <div className="bg-zinc-900 border border-zinc-800 p-4 space-y-4">
            <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider border-b border-zinc-800 pb-2 flex items-center space-x-1.5">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Pixel Engine Controls</span>
            </h3>

            {/* Pixel Block Density Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-300">Pixel Block Density</span>
                <span className="text-cyan-400 font-bold">{blockSize}px blocks</span>
              </div>
              <input
                type="range"
                min="4"
                max="48"
                step="2"
                value={blockSize}
                onChange={(e) => setBlockSize(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-zinc-950 h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                <span>Ultra-Detailed (4px)</span>
                <span>Chunky 8-Bit (48px)</span>
              </div>
            </div>

            {/* Contrast Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-300">Stark Contrast</span>
                <span className="text-cyan-400 font-bold">{contrastLevel}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="200"
                step="5"
                value={contrastLevel}
                onChange={(e) => setContrastLevel(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-zinc-950 h-2 cursor-pointer"
              />
            </div>

            {/* Grid Lines Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <span className="text-xs text-zinc-300 flex items-center space-x-1.5">
                <Grid className="w-4 h-4 text-cyan-400" />
                <span>Pixel Grid Overlay</span>
              </span>
              <button
                onClick={() => setShowGridOverlay(!showGridOverlay)}
                className={`px-3 py-1 text-xs border font-bold transition-all ${
                  showGridOverlay
                    ? 'bg-cyan-950 text-cyan-400 border-cyan-500'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                }`}
              >
                {showGridOverlay ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Pixelated Canvas Result & Palette Filter Selection */}
        <div className="lg:col-span-7 space-y-4 font-mono">
          {/* Main Pixel Preview Canvas */}
          <div className="bg-zinc-900 border border-zinc-800 p-4 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3 pb-2 border-b border-zinc-800">
              <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Converted Pixel Art Output</span>
              </span>
              <span className="text-[10px] text-zinc-400">800×800 Canvas</span>
            </div>

            <div className="relative w-full max-w-[420px] aspect-square bg-canvas-transparent border-2 border-zinc-700 shadow-[4px_4px_0px_0px_#18181b] overflow-hidden flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain image-rendering-pixelated"
              />
            </div>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full mt-4 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold py-2.5 px-4 text-xs font-mono uppercase tracking-wider flex items-center justify-center space-x-2 border border-cyan-300 shadow-[3px_3px_0px_0px_#09090b] transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Processing...' : 'Download Pixel PFP'}</span>
            </button>
          </div>

          {/* Color Mapping Palettes */}
          <div className="bg-zinc-900 border border-zinc-800 p-4">
            <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
              <Palette className="w-4 h-4 text-cyan-400" />
              <span>Select Retro Color Palette</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PALETTES.map((palette) => (
                <button
                  key={palette.id}
                  onClick={() => setColorPalette(palette.id)}
                  className={`p-2.5 border text-left transition-all cursor-pointer ${
                    colorPalette === palette.id
                      ? 'bg-zinc-950 border-cyan-400 text-cyan-400 shadow-[2px_2px_0px_0px_#00f3ff]'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-950'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 text-xs font-bold">
                    <span>{palette.icon}</span>
                    <span className="truncate">{palette.name}</span>
                  </div>
                  <div className="text-[10px] text-zinc-400 truncate mt-1">{palette.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
