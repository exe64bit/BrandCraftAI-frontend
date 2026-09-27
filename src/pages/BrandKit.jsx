import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Printer, Sparkles, CheckCircle2, BookmarkCheck, Palette, Layers, Rocket } from 'lucide-react';
import { Button } from '../components/Button';
import { ColorPalette } from '../components/ColorPalette';

export const BrandKit = () => {
  const { project } = useOutletContext();

  const brandName =
    project.naming?.selectedName ||
    (project.naming?.options?.find((o) => o.selected)?.name) ||
    project.projectName;

  const colors = project.visualDirection?.colors || {
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#F59E0B',
    background: '#F8FAFC',
    text: '#0F172A',
  };

  const visuals = project.generatedVisuals || [];
  const logoVisual = visuals.find((v) => v.type === 'logo');
  const moodboardVisual = visuals.find((v) => v.type === 'moodboard');
  const brandVisual = visuals.find((v) => v.type === 'brand-visual');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner Actions (Hidden in Print) */}
      <div className="no-print bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800">
              Completed Brand System
            </span>
            <span className="text-xs text-slate-500 font-medium">Stage 10 of 10</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Final Brand System Kit</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            The consolidated, production-ready brand manual ready for design handoff or PDF export.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Printer}
          onClick={handlePrint}
          className="shadow-sm"
        >
          Export / Print Brand Manual
        </Button>
      </div>

      {/* Brand Hero Cover Deck */}
      <div
        className="rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="max-w-2xl relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              Official Brand Identity Guide
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 font-display">
            {brandName}
          </h1>
          <p className="text-lg sm:text-xl font-medium text-white/90 leading-relaxed mb-6">
            {project.positioning?.category || 'Strategic Enterprise Platform'}
          </p>
          <div className="p-4 rounded-xl bg-black/20 backdrop-blur-md border border-white/10 text-xs sm:text-sm text-white/95 leading-relaxed italic">
            "{project.positioning?.positioningStatement || project.originalIdea}"
          </div>
        </div>

        {logoVisual && (
          <div className="hidden sm:block absolute right-12 bottom-12 w-32 h-32 rounded-2xl bg-white p-2 shadow-2xl overflow-hidden border border-white/20">
            <img src={logoVisual.imageUrl} alt="Brand Logo" className="w-full h-full object-cover rounded-xl" />
          </div>
        )}
      </div>

      {/* 1. Executive Strategy Summary */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
          <BookmarkCheck className="w-5 h-5 text-brand-600" />
          <span>1. Strategic Foundation &amp; Problem Space</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-4">
            <div>
              <span className="font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Acute Problem Statement
              </span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {project.discovery?.problem || 'N/A'}
              </p>
            </div>

            <div>
              <span className="font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Target Audience Archetype
              </span>
              <p className="text-slate-700 leading-relaxed">
                {project.discovery?.targetAudience || 'N/A'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Core Value Proposition
              </span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {project.positioning?.valueProposition || 'N/A'}
              </p>
            </div>

            <div>
              <span className="font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Unfair Competitive Differentiator
              </span>
              <p className="text-slate-700 leading-relaxed">
                {project.positioning?.differentiator || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Personality & Behavioral Principles */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>2. Personality &amp; Behavioral Principles</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {(project.personality?.traits || []).map((t, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider block mb-1">
                Trait {idx + 1}
              </span>
              <h4 className="font-bold text-slate-900 text-sm mb-1">{t.trait}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">{t.reason}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs pt-4 border-t border-slate-100">
          <div>
            <span className="font-bold text-slate-800 block mb-2">Anti-Traits (What We Avoid):</span>
            <div className="flex flex-wrap gap-2">
              {(project.personality?.avoidTraits || []).map((avoid, i) => (
                <span key={i} className="px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-md font-medium">
                  ✕ {avoid}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="font-bold text-slate-800 block mb-2">Operational Principles:</span>
            <ul className="space-y-1.5 text-slate-600">
              {(project.personality?.principles || []).map((p, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Visual Identity & Color System */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
          <Palette className="w-5 h-5 text-indigo-500" />
          <span>3. Visual System &amp; Design Tokens</span>
        </h2>

        <div className="mb-6">
          <ColorPalette colors={colors} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs pt-4 border-t border-slate-100">
          <div>
            <span className="font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Typography Hierarchy
            </span>
            <p className="font-bold text-slate-900 text-sm">
              {project.visualDirection?.typography?.headingFont || 'Space Grotesk'} / {project.visualDirection?.typography?.bodyFont || 'Inter'}
            </p>
            <p className="text-slate-500 mt-1">{project.visualDirection?.typography?.styleGuide}</p>
          </div>

          <div>
            <span className="font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Shapes &amp; Geometry
            </span>
            <p className="text-slate-700 leading-relaxed">
              {(project.visualDirection?.shapes || []).join(', ') || 'Interlocking curves and clean grid nodes'}
            </p>
          </div>

          <div>
            <span className="font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Atmosphere &amp; Mood
            </span>
            <p className="text-slate-700 leading-relaxed italic">
              "{project.visualDirection?.mood || 'Modern, clean, focused'}"
            </p>
          </div>
        </div>
      </section>

      {/* 4. Generated Brand Visuals Gallery */}
      {visuals.length > 0 && (
        <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Layers className="w-5 h-5 text-brand-500" />
            <span>4. Visual Concept Gallery</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visuals.map((v, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                <div className="aspect-square w-full overflow-hidden bg-slate-100">
                  <img src={v.imageUrl} alt={v.type} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider block">
                    {v.type}
                  </span>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{v.prompt}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Coherence Audit & Launch Kit */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
          <Rocket className="w-5 h-5 text-emerald-600" />
          <span>5. Coherence Audit &amp; Go-To-Market Messaging</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs mb-6">
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-emerald-900">
                Coherence Score: {project.consistency?.score || 90} / 100
              </span>
            </div>
            <p className="text-emerald-800 leading-relaxed">
              {project.consistency?.scoreExplanation}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block mb-1">One-Line Elevator Pitch:</span>
            <p className="text-slate-700 italic font-medium leading-relaxed">
              "{project.launchKit?.oneLinePitch}"
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs pt-4 border-t border-slate-100">
          <div>
            <span className="font-bold text-slate-800 block mb-1">Hero Headline &amp; Subtitle:</span>
            <h3 className="text-lg font-bold text-slate-900 mb-1">{project.launchKit?.headline}</h3>
            <p className="text-slate-600">{project.launchKit?.subheadline}</p>
          </div>

          <div>
            <span className="font-bold text-slate-800 block mb-1">Public Social Post:</span>
            <pre className="whitespace-pre-wrap font-sans text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
              {project.launchKit?.socialPost}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrandKit;
