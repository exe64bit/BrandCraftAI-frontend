import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

const stageMessages = {
  discovery: 'Conducting market discovery and analyzing core problem vectors...',
  positioning: 'Defining category positioning, value proposition, and competitive moat...',
  personality: 'Synthesizing archetypes and crafting justified brand personality traits...',
  naming: 'Generating distinctive, trademarkable brand names across linguistic territories...',
  critique: 'Stress-testing the brand deck and challenging weak assumptions...',
  visual: 'Formulating visual direction, harmonic color palette, and typography pairing...',
  images: 'Prompting Pollinations AI to generate high-resolution brand visuals...',
  consistency: 'Running AI brand governance audit to evaluate holistic coherence...',
  launch: 'Drafting high-conversion launch copy, headlines, and go-to-market kit...',
  default: 'Processing brand intelligence with Gemini AI...',
};

export const Loading = ({ stage = 'default', message, fullScreen = false }) => {
  const displayMessage = message || stageMessages[stage] || stageMessages.default;

  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
      <div className="relative mb-5">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center shadow-inner">
          <Sparkles className="w-8 h-8 text-brand-600 animate-pulse" />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow border border-slate-100">
          <Loader2 className="w-5 h-5 text-brand-500 animate-spin" />
        </div>
      </div>
      <h4 className="text-base font-semibold text-slate-800 mb-2">Architecting Brand Intelligence</h4>
      <p className="text-sm text-slate-600 leading-relaxed animate-pulse">{displayMessage}</p>
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-6">
        <div className="bg-brand-600 h-full rounded-full animate-indeterminate" />
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return <div className="py-12 bg-white rounded-xl border border-slate-200 shadow-sm my-6">{content}</div>;
};

export default Loading;
