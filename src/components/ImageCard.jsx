import React, { useState } from 'react';
import { Sparkles, Maximize2, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { Button } from './Button';

export const ImageCard = ({
  type,
  title,
  description,
  visual,
  onGenerate,
  isGenerating = false,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between transition-all hover:border-slate-300">
      <div>
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 block mb-0.5">
              {type.replace('-', ' ')}
            </span>
            <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
          </div>
          {visual?.imageUrl && (
            <button
              onClick={() => setModalOpen(true)}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
              title="Expand preview"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="relative aspect-square w-full bg-slate-100 overflow-hidden flex items-center justify-center">
          {visual?.imageUrl ? (
            <img
              src={visual.imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="text-center p-6 max-w-xs">
              <div className="w-12 h-12 rounded-xl bg-slate-200/80 text-slate-400 mx-auto flex items-center justify-center mb-3">
                <ImageIcon className="w-6 h-6" />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
            </div>
          )}
        </div>

        {visual?.prompt && (
          <div className="p-3 bg-slate-50/80 border-t border-slate-100 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
            <span className="font-semibold text-slate-700">Prompt: </span>
            {visual.prompt}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-100 bg-white">
        <Button
          variant={visual ? 'secondary' : 'primary'}
          size="sm"
          className="w-full"
          icon={Sparkles}
          onClick={onGenerate}
          isLoading={isGenerating}
        >
          {visual ? `Regenerate ${title}` : `Generate ${title}`}
        </Button>
      </div>

      {/* Full preview modal */}
      {modalOpen && visual?.imageUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">{title} — High Resolution</h3>
              <div className="flex items-center gap-2">
                <a
                  href={visual.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="p-2 bg-slate-950 flex items-center justify-center max-h-[75vh]">
              <img src={visual.imageUrl} alt={title} className="max-h-[70vh] object-contain rounded-lg" />
            </div>
            {visual.prompt && (
              <div className="p-4 bg-slate-50 text-xs text-slate-600 border-t border-slate-100">
                <p className="font-semibold text-slate-800 mb-1">Generated Visual Prompt:</p>
                <p className="leading-relaxed">{visual.prompt}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
