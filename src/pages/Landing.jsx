import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Target,
  Palette,
  CheckCircle2,
  Rocket,
  ShieldCheck,
  Layers,
  Wand2,
} from 'lucide-react';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

export const Landing = () => {
  const { loginDemo } = useAuth();
  const navigate = useNavigate();

  const handleDemoLaunch = () => {
    loginDemo();
    navigate('/projects/demo-teamup-project');
  };

  const steps = [
    { title: 'Discovery', desc: 'Dissect the raw idea into acute problem statements, target archetypes, and market friction vectors.', icon: Compass },
    { title: 'Positioning', desc: 'Define category design, defensible differentiators, and competitive angles.', icon: Target },
    { title: 'Brand Personality', desc: 'Synthesize archetypes, 3-5 justified traits, and behavioral principles.', icon: Sparkles },
    { title: 'Naming', desc: 'Craft inventive trademarkable name options across semantic territories with selection memory.', icon: Layers },
    { title: 'AI Critique', desc: 'The AI aggressively stress-tests its own earlier output to flag clichés and blind spots.', icon: ShieldCheck },
    { title: 'Visual Direction', desc: 'Curate harmonic color palettes, typographic pairings, shapes, and logo concept art.', icon: Palette },
    { title: 'Generated Visuals', desc: 'Pollinations AI renders vector logo marks, brand moodboards, and social launch graphics.', icon: Wand2 },
    { title: 'Consistency Check', desc: 'Calculates an internal coherence audit score across strategic positioning and visual assets.', icon: CheckCircle2 },
    { title: 'Launch Kit', desc: 'Generates high-conversion landing page copy, one-line elevator pitches, and social posts.', icon: Rocket },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 bg-white border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-xs font-semibold text-brand-700 mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
            <span>Staged AI Brand Architecture Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1] mb-6">
            Turn an incomplete idea into a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
              complete, market-ready brand
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 mb-10 leading-relaxed font-normal">
            No massive single-shot prompts that return hallucinations. Watch your idea evolve progressively through a visible, 10-stage AI strategy engine — from discovery and naming to visual identity and launch copy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto shadow-md shadow-brand-500/20">
                <span>Start Building Your Brand</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              onClick={handleDemoLaunch}
              className="w-full sm:w-auto border-amber-300 bg-amber-50/50 text-amber-900 hover:bg-amber-100"
            >
              <Compass className="w-4 h-4 mr-2 text-amber-600" />
              <span>Explore Demo Project (TeamUp)</span>
            </Button>
          </div>

          {/* Interactive Flow Preview Ribbon */}
          <div className="mt-14 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-500">
            <span className="text-slate-400">Progression:</span>
            <span className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-700">Discovery</span>
            <span>&rarr;</span>
            <span className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-700">Positioning</span>
            <span>&rarr;</span>
            <span className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-700">Personality</span>
            <span>&rarr;</span>
            <span className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-700">Naming</span>
            <span>&rarr;</span>
            <span className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-700">Critique</span>
            <span>&rarr;</span>
            <span className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-700">Visuals</span>
            <span>&rarr;</span>
            <span className="bg-brand-50 text-brand-700 font-semibold px-2.5 py-1 rounded-md">Brand Kit</span>
          </div>
        </div>
      </section>

      {/* 10-Stage Process Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">The Staged AI Architecture</h2>
          <p className="mt-3 text-slate-600 text-sm leading-relaxed">
            Every stage rigorously builds upon the previous stage’s decisions. You can inspect, edit, or regenerate every output at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-brand-600">0{idx + 1}</span>
                  <h3 className="font-bold text-slate-900 text-base">{step.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Demo Showcase Card */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-100 text-amber-800 rounded-full inline-block mb-3">
                INSTANT HACKATHON EVALUATION
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Inspect the "TeamUp" Sample Brand</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Want to evaluate the complete 10-stage output immediately without entering an idea or setting API keys? Explore our fully populated demo project for a college student teammate finder.
              </p>
            </div>
            <Button size="lg" onClick={handleDemoLaunch} className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white">
              Launch Demo Mode
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-white border-t border-slate-200 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 BrandCraft AI. Built for the Brand Builder Hackathon.</p>
          <p className="font-medium text-slate-600">Powered by Gemini AI, Pollinations, and ImageKit.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
