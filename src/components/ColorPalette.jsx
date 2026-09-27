import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const ColorPalette = ({ colors, isEditing = false, onChange }) => {
  const [copiedKey, setCopiedKey] = useState(null);

  const paletteItems = [
    { key: 'primary', label: 'Primary Brand Tone', hex: colors?.primary || '#3B82F6' },
    { key: 'secondary', label: 'Secondary / Supporting', hex: colors?.secondary || '#10B981' },
    { key: 'accent', label: 'Dynamic Accent', hex: colors?.accent || '#F59E0B' },
    { key: 'background', label: 'Canvas Background', hex: colors?.background || '#F8FAFC' },
    { key: 'text', label: 'Primary Typography', hex: colors?.text || '#0F172A' },
  ];

  const handleCopy = (key, hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {paletteItems.map(({ key, label, hex }) => (
          <div
            key={key}
            className="group rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all hover:border-slate-300"
          >
            <div
              className="h-20 w-full rounded-lg shadow-inner mb-3 border border-black/5 relative flex items-end justify-end p-2 transition-transform group-hover:scale-[1.02]"
              style={{ backgroundColor: hex }}
            >
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => handleCopy(key, hex)}
                  className="bg-black/50 backdrop-blur-sm text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                  title="Copy hex code"
                >
                  {copiedKey === key ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
              {isEditing ? (
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="color"
                    value={hex}
                    onChange={(e) => onChange?.({ ...colors, [key]: e.target.value })}
                    className="w-7 h-7 rounded border border-slate-300 cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={hex}
                    onChange={(e) => onChange?.({ ...colors, [key]: e.target.value })}
                    className="w-20 text-xs font-mono font-bold uppercase rounded border border-slate-300 px-1.5 py-1 text-slate-800"
                  />
                </div>
              ) : (
                <p className="text-sm font-mono font-bold text-slate-900 mt-0.5 uppercase tracking-wide">
                  {hex}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {colors?.paletteRationale && (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
          <span className="font-semibold text-slate-900">Color Theory & Harmony Rationale: </span>
          {colors.paletteRationale}
        </div>
      )}
    </div>
  );
};

export default ColorPalette;
