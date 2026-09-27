import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { aiAPI } from '../services/api';
import { StageHeader } from '../components/StageHeader';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { CheckCircle2, AlertTriangle, Sparkles, Lightbulb, Activity } from 'lucide-react';

export const Consistency = () => {
  const { project, updateProjectState } = useOutletContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [error, setError] = useState('');

  const consistencyData = project.consistency || {};
  const hasData = Boolean(consistencyData.score && consistencyData.score > 0);

  const handleGenerate = async (isRegen = false) => {
    setError('');
    if (isRegen) {
      setRegenerating(true);
    } else {
      setLoading(true);
    }

    try {
      const res = await aiAPI.runConsistency(project._id);

      if (res.success && res.consistency) {
        const updated = {
          ...project,
          consistency: res.consistency,
          currentStage: res.currentStage || project.currentStage,
          progress: res.progress || project.progress,
        };
        updateProjectState(updated);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to run consistency audit.');
    } finally {
      setLoading(false);
      setRegenerating(false);
    }
  };

  const score = consistencyData.score || 0;
  const scoreColor =
    score >= 90 ? 'text-emerald-600' : score >= 75 ? 'text-brand-600' : 'text-amber-600';

  return (
    <div>
      <StageHeader
        stageNumber={7}
        title="Brand System Coherence Audit"
        description="Audits the holistic harmony and alignment between your strategic positioning, personality voice, chosen name, and visual language."
        onRegenerate={hasData ? () => handleGenerate(true) : null}
        onContinue={() => navigate(`/projects/${project._id}/launch`)}
        isRegenerating={regenerating}
        showRegenerate={hasData}
        showContinue={hasData}
        continueLabel="Proceed to Launch Kit"
      />

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
          {error}
        </div>
      )}

      {loading ? (
        <Loading stage="consistency" />
      ) : !hasData ? (
        <Card className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Run Brand System Coherence Audit</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              We'll check the internal consistency across all assets created so far: name "{project.naming?.selectedName || project.projectName}", positioning, palette, and traits.
            </p>
            <Button
              size="lg"
              variant="primary"
              onClick={() => handleGenerate(false)}
              icon={Sparkles}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Calculate System Coherence
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Audit Score Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center shadow-inner shrink-0">
                <span className={`text-4xl font-extrabold font-mono ${scoreColor}`}>
                  {score}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">out of 100</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-4 h-4 text-brand-600" />
                  <h3 className="text-lg font-bold text-slate-900">
                    AI-Generated Internal Coherence Estimate
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                  {consistencyData.scoreExplanation ||
                    'Coherence estimate measuring semantic alignment between positioning statements, archetype personality traits, and the visual palette.'}
                </p>
                <p className="text-[11px] text-slate-400 mt-1.5 italic">
                  *Note: This is an internal algorithmic estimate of harmony, not an external market metric.
                </p>
              </div>
            </div>
          </div>

          {/* Potential Friction Points & Harmonization Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              title="Identified Friction Points"
              subtitle="Places where brand elements slightly diverge or create mixed signals"
            >
              <ul className="space-y-3">
                {(consistencyData.issues || []).map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card
              title="Harmonizing Recommendations"
              subtitle="Concrete adjustments to achieve maximum brand cohesion"
            >
              <ul className="space-y-3">
                {(consistencyData.recommendations || []).map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                    <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{rec}</span>
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

export default Consistency;
