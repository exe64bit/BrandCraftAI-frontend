import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { aiAPI } from '../services/api';
import { StageHeader } from '../components/StageHeader';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import {
  AlertTriangle,
  Sparkles,
  Zap,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const Critique = () => {
  const { project, updateProjectState } = useOutletContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [error, setError] = useState('');

  const critiqueData = project.critique || {};
  const hasData = Boolean(critiqueData.genericPatterns && critiqueData.genericPatterns.length > 0);

  const handleGenerate = async (isRegen = false) => {
    setError('');
    if (isRegen) {
      setRegenerating(true);
    } else {
      setLoading(true);
    }

    try {
      const res = await aiAPI.runCritique(project._id);

      if (res.success && res.critique) {
        const updated = {
          ...project,
          critique: res.critique,
          currentStage: res.currentStage || project.currentStage,
          progress: res.progress || project.progress,
        };
        updateProjectState(updated);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate critique.');
    } finally {
      setLoading(false);
      setRegenerating(false);
    }
  };

  return (
    <div>
      <StageHeader
        stageNumber={5}
        title="AI Devil's Advocate & Stress-Test"
        description="The AI rigorously challenges its own earlier strategy—flagging clichés, fragile behavioral assumptions, naming liabilities, and strategic blind spots before launch."
        onRegenerate={hasData ? () => handleGenerate(true) : null}
        onContinue={() => navigate(`/projects/${project._id}/visual`)}
        isRegenerating={regenerating}
        showRegenerate={hasData}
        showContinue={hasData}
        continueLabel="Proceed to Visual Direction"
      />

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
          {error}
        </div>
      )}

      {loading ? (
        <Loading stage="critique" />
      ) : !hasData ? (
        <Card className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Stress-Test Your Brand Identity</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              We'll interrogate your chosen name ("{project.naming?.selectedName || project.projectName}"), positioning, and audience logic to uncover vulnerabilities before you spend resources on visuals.
            </p>
            <Button
              size="lg"
              variant="primary"
              onClick={() => handleGenerate(false)}
              icon={Sparkles}
              className="w-full bg-slate-900 hover:bg-slate-800"
            >
              Run Brand Critique
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Top Banner Alert */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Constructive Friction: </span>
              This critique does not overwrite your earlier work. It gives you critical visibility into risks so you can make informed decisions in visual direction and launch copy.
            </div>
          </div>

          {/* Generic Patterns & Fragile Assumptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              title="Generic Tropes & Clichés"
              subtitle="Startup buzzwords and patterns that weaken distinctiveness"
            >
              <ul className="space-y-2.5">
                {(critiqueData.genericPatterns || []).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card
              title="Fragile Hypotheses"
              subtitle="Unproven user behaviors being taken for granted"
            >
              <ul className="space-y-2.5">
                {(critiqueData.weakAssumptions || []).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <HelpCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Internal Contradictions & Audience Mismatch */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              title="Internal Tensions"
              subtitle="Subtle contradictions between personality, name, and problem"
            >
              <ul className="space-y-2.5">
                {(critiqueData.contradictions || []).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <Zap className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card
              title="Audience Alienation Risks"
              subtitle="Ways the current posture might fail key customer segments"
            >
              <ul className="space-y-2.5">
                {(critiqueData.audienceMismatch || []).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Naming Concerns & Counter-Strategies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              title="Naming Vulnerabilities"
              subtitle="Potential trademark or pronunciation friction"
            >
              <ul className="space-y-2.5">
                {(critiqueData.namingConcerns || []).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card
              title="Strategic Counter-Pivots"
              subtitle="Concrete ways to reinforce the brand right now"
            >
              <ul className="space-y-2.5">
                {(critiqueData.alternatives || []).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 font-medium">
                    <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Critique;
