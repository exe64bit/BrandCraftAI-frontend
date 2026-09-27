import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { projectsAPI } from '../services/api';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

const exampleIdeas = [
  {
    name: 'TeamUp',
    idea: 'I want to create an app that helps students find teammates for college projects, matching them by skills, schedule availability, and work ethic.',
  },
  {
    name: 'TaxFlow AI',
    idea: 'An autonomous bookkeeping copilot for freelance software engineers that automatically audits deductions and drafts quarterly taxes without manual receipts.',
  },
  {
    name: 'RoastClub',
    idea: 'A micro-batch craft coffee subscription tailored for software developers and remote teams, delivering high-altitude single-origin beans.',
  },
];

export const CreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const [originalIdea, setOriginalIdea] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSelectExample = (ex) => {
    setProjectName(ex.name);
    setOriginalIdea(ex.idea);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!projectName.trim() || !originalIdea.trim()) {
      setError('Please provide both a project name and your original idea.');
      return;
    }

    setLoading(true);

    try {
      const res = await projectsAPI.createProject(projectName, originalIdea);
      if (res.success && res.project) {
        navigate(`/projects/${res.project._id}/discovery`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create brand project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mx-auto mb-3 shadow-xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Initiate Brand Architecture</h1>
          <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
            Enter your raw, unfinished concept. The staged AI engine will methodically expand it into a full identity.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Working Project Name"
              placeholder="e.g. StudentSquad, DevCoffee, TaxCopilot"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              helper="A temporary or working title. You will generate and select official names in Stage 4."
              required
            />

            <Input
              as="textarea"
              label="Original Business / Product Idea"
              placeholder="Describe what you want to build, who it is for, and the core pain point..."
              rows={5}
              value={originalIdea}
              onChange={(e) => setOriginalIdea(e.target.value)}
              helper="Be as raw or informal as you like. The AI will extract the problem, market positioning, and target archetypes."
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20"
              isLoading={loading}
            >
              <span>Begin Stage 1: Discovery</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </div>

        {/* Quick starter inspirations */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Or load a starter inspiration</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {exampleIdeas.map((ex, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectExample(ex)}
                className="text-left p-3 rounded-lg border border-slate-200 hover:border-brand-300 hover:bg-brand-50/30 transition-all text-xs"
              >
                <span className="font-bold text-slate-900 block mb-1">{ex.name}</span>
                <span className="text-slate-500 line-clamp-2 leading-relaxed">{ex.idea}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
