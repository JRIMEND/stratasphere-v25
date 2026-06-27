import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box, RotateCcw, ZoomIn, ZoomOut, Layers } from 'lucide-react';
import { properties } from '@/data/demoData';
import { propertyTypeColors } from '@/types';

// Canvas 2D faux-3D building renderer using ONLY safe APIs
function drawBuilding(ctx: CanvasRenderingContext2D, type: string, w: number, h: number, zoom: number) {
  const bw = Math.min(w * 0.4, 200) * zoom;
  const bh = Math.min(h * 0.6, 300) * zoom;
  const bx = (w - bw) / 2;
  const by = h - (h - bh) / 2 - 40;
  const d = bw * 0.3; // depth
  const color = propertyTypeColors[type as keyof typeof propertyTypeColors] || '#14B8A6';

  try {
    ctx.clearRect(0, 0, w, h);

    // Ground plane
    ctx.fillStyle = '#1A1A1A';
    ctx.beginPath();
    ctx.moveTo(0, h - 20);
    ctx.lineTo(w, h - 20);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // Grid lines on ground
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 40) {
      ctx.beginPath(); ctx.moveTo(i, h - 20); ctx.lineTo(i, h); ctx.stroke();
    }

    // Building color parsing
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    // Side face (darker)
    ctx.fillStyle = `rgb(${Math.round(r * 0.6)}, ${Math.round(g * 0.6)}, ${Math.round(b * 0.6)})`;
    ctx.beginPath();
    ctx.moveTo(bx + bw, by - bh);
    ctx.lineTo(bx + bw + d, by - bh - d * 0.5);
    ctx.lineTo(bx + bw + d, by - d * 0.5);
    ctx.lineTo(bx + bw, by);
    ctx.closePath();
    ctx.fill();

    // Front face
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.beginPath();
    ctx.moveTo(bx, by - bh);
    ctx.lineTo(bx + bw, by - bh);
    ctx.lineTo(bx + bw, by);
    ctx.lineTo(bx, by);
    ctx.closePath();
    ctx.fill();

    // Top face
    ctx.fillStyle = `rgb(${Math.round(r * 1.2)}, ${Math.round(g * 1.2)}, ${Math.round(b * 1.2)})`;
    ctx.beginPath();
    ctx.moveTo(bx, by - bh);
    ctx.lineTo(bx + bw, by - bh);
    ctx.lineTo(bx + bw + d, by - bh - d * 0.5);
    ctx.lineTo(bx + d, by - bh - d * 0.5);
    ctx.closePath();
    ctx.fill();

    // Floor lines (front)
    ctx.strokeStyle = `rgba(0,0,0,0.2)`;
    ctx.lineWidth = 0.5;
    const floors = type === 'apartment' ? 8 : type === 'balance' ? 6 : 3;
    for (let f = 1; f < floors; f++) {
      const fy = by - (bh / floors) * f;
      ctx.beginPath(); ctx.moveTo(bx, fy); ctx.lineTo(bx + bw, fy); ctx.stroke();
    }

    // Windows
    ctx.fillStyle = `rgba(255,255,255,0.15)`;
    const winW = bw * 0.08;
    const winH = bh / floors * 0.3;
    for (let f = 0; f < floors; f++) {
      for (let c = 0; c < 4; c++) {
        const wx = bx + (bw / 5) * (c + 1) - winW / 2;
        const wy = by - (bh / floors) * f - (bh / floors) * 0.6;
        ctx.fillRect(wx, wy, winW, winH);
      }
    }

    // Label
    ctx.fillStyle = '#EAEAEA';
    ctx.font = '14px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(type.charAt(0).toUpperCase() + type.slice(1), w / 2, by + 30);
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillStyle = '#52525B';
    ctx.fillText(`Scale: ${(zoom * 100).toFixed(0)}%`, w / 2, by + 50);

  } catch (e) {
    ctx.fillStyle = '#EF4444';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Error rendering building', w / 2, h / 2);
  }
}

export default function DigitalTwin() {
  const [selectedProp, setSelectedProp] = useState(properties[0]);
  const [zoom, setZoom] = useState(1);
  const [showLayers, setShowLayers] = useState({ building: true, parcels: false, airspace: false });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        drawBuilding(ctx, selectedProp.type, canvas.width, canvas.height, zoom);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [selectedProp, zoom]);

  return (
    <div className="space-y-4 h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-heading font-medium text-txt-primary">Digital Twin</h2>
          <p className="text-sm text-txt-secondary">Canvas 2D property visualization</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setZoom(z => Math.max(0.5, z - 0.25))}
            className="p-2 bg-bg-tertiary rounded-lg text-txt-secondary hover:text-txt-primary transition-colors">
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs text-txt-tertiary w-12 text-center">{(zoom * 100).toFixed(0)}%</span>
          <button onClick={() => setZoom(z => Math.min(3, z + 0.25))}
            className="p-2 bg-bg-tertiary rounded-lg text-txt-secondary hover:text-txt-primary transition-colors">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button onClick={() => setZoom(1)}
            className="p-2 bg-bg-tertiary rounded-lg text-txt-secondary hover:text-txt-primary transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-4 h-full">
        {/* Property selector */}
        <div className="w-60 shrink-0 space-y-2 overflow-y-auto">
          {properties.map(p => (
            <button key={p.id} onClick={() => setSelectedProp(p)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${selectedProp.id === p.id ? 'bg-accent/10 border border-accent/20' : 'bg-bg-tertiary/30 border border-transparent hover:bg-bg-tertiary/60'}`}>
              <div className="flex items-center gap-2">
                <Box className="w-3.5 h-3.5" style={{ color: propertyTypeColors[p.type] }} />
                <span className="text-xs text-txt-primary truncate">{p.address.split(',')[0]}</span>
              </div>
              <span className="text-[10px] text-txt-tertiary">{p.suburb}</span>
            </button>
          ))}

          {/* Layer toggles */}
          <div className="mt-4 pt-4 border-t border-white/[0.06]">
            <p className="text-xs text-txt-tertiary mb-2 flex items-center gap-1"><Layers className="w-3 h-3" /> Layers</p>
            {Object.entries(showLayers).map(([key, val]) => (
              <button key={key} onClick={() => setShowLayers(l => ({ ...l, [key]: !val }))}
                className="w-full flex items-center justify-between p-2 rounded hover:bg-bg-tertiary/30 transition-colors">
                <span className="text-xs text-txt-secondary capitalize">{key}</span>
                <div className={`w-8 h-4 rounded-full transition-colors ${val ? 'bg-accent' : 'bg-bg-quaternary'}`}>
                  <div className={`w-3 h-3 rounded-full bg-white mt-0.5 transition-all ${val ? 'ml-4.5' : 'ml-0.5'}`} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-bg-secondary border border-white/[0.06] rounded-card relative overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full" />
          {/* Airspace overlay indicator */}
          {showLayers.airspace && (
            <div className="absolute top-4 right-4 bg-volumetric/10 border border-volumetric/30 rounded-lg p-3">
              <p className="text-xs font-mono text-volumetric">D3 Airspace: 30-120m</p>
              <p className="text-[10px] text-volumetric/60 mt-0.5">Drone corridor active</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
