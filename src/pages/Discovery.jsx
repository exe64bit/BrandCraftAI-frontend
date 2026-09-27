import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { aiAPI, projectsAPI } from '../services/api';
import { StageHeader } from '../components/StageHeader';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { Sparkles, HelpCircle, Target, Shield, Compass } from 'lucide-react';

export const Discovery = () => {
  const { project, updateProjectState } = useOutletContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  // Editable local state
  const [formData, setFormData] = useState(project.discovery || {});
  const [userNotes, setUserNotes] = useState(project.discovery?.userNotes || '');

  const hasData = Boolean(project.discovery?.problem && project.discovery?.targetAudience);

  const handleGenerate = async (isRegen = false) => {
    setError('');
    if (isRegen) {
      setRegenerating(true);
    } else {
      setLoading(true);
    }

    try {
      const res = await aiAPI.runDiscovery(project._id, {
        userNotes,
        regenerate: isRegen,
      });

      if (res.success && res.discovery) {
        const updated = {
          ...project,
          discovery: res.discovery,
          currentStage: res.currentStage || project.currentStage,
          progress: res.progress || project.progress,
        };
        updateProjectState(updated);
        setFormData(res.discovery);
        setIsEditing(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate discovery stage.');
    } finally {
      setLoading(false);
      setRegenerating(false);
    }
  };

  const handleSaveEdits = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    setSaving(true);
    setError('');

    try {
      const res = await projectsAPI.updateProject(project._id, {
        discovery: {
          ...formData,
          userNotes,
        },
      });

      if (res.success && res.project) {
        updateProjectState(res.project);
        setIsEditing(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save modifications.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <StageHeader
        stageNumber={1}
        title="Discovery & Problem Space"
        description="Dissects your raw concept into target archetypes, acute problem vectors, market friction points, and core value propositions."
        isEditing={isEditing}
        onToggleEdit={hasData ? handleSaveEdits : null}
        onRegenerate={hasData ? () => handleGenerate(true) : null}
        onContinue={() => navigate(`/projects/${project._id}/positioning`)}
        isRegenerating={regenerating}
        isSaving={saving}
        showRegenerate={hasData}
        showContinue={hasData}
        continueLabel="Continue to Positioning"
      />

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
          {error}
        </div>
      )}

      {loading ? (
        <Loading stage="discovery" />
      ) : !hasData ? (
        <Card className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-4">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Ready to Discover Your Market Space</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              We'll analyze "{project.originalIdea}" and extract structured customer pains, transformation goals, and operational constraints.
            </p>

            <Input
              as="textarea"
              rows={3}
              label="Optional Founder Notes / Constraints"
              placeholder="e.g. Must work for both undergrads and grad students; no paid subscriptions; mobile-first..."
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              className="mb-6 text-left"
            />

            <Button
              size="lg"
              variant="primary"
              onClick={() => handleGenerate(false)}
              icon={Sparkles}
              className="w-full"
            >
              Analyze Idea &amp; Run Discovery
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Problem & Audience Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              title="Acute Problem Statement"
              subtitle="The high-friction friction vector being dismantled"
            >
              {isEditing ? (
                <Input
                  as="textarea"
                  rows={4}
                  value={formData.problem || ''}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                />
              ) : (
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {formData.problem}
                </p>
              )}
            </Card>

            <Card
              title="Target Audience Archetype"
              subtitle="Primary adopters who experience this friction daily"
            >
              {isEditing ? (
                <Input
                  as="textarea"
                  rows={4}
                  value={formData.targetAudience || ''}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                />
              ) : (
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {formData.targetAudience}
                </p>
              )}
            </Card>
          </div>

          {/* Market Context & Core Value */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Market Landscape Context" subtitle="Why the market is primed for this now">
              {isEditing ? (
                <Input
                  as="textarea"
                  rows={3}
                  value={formData.context || ''}
                  onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                />
              ) : (
                <p className="text-sm text-slate-700 leading-relaxed">{formData.context}</p>
              )}
            </Card>

            <Card title="Fundamental Core Value" subtitle="The primary transformation delivered">
              {isEditing ? (
                <Input
                  as="textarea"
                  rows={3}
                  value={formData.value || ''}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                />
              ) : (
                <p className="text-sm text-slate-700 leading-relaxed">{formData.value}</p>
              )}
            </Card>
          </div>

          {/* Goals and Constraints */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Transformation Goals" subtitle="What success looks like for the user">
              <ul className="space-y-2">
                {(formData.goals || []).map((goal, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <Target className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card title="Structural Constraints" subtitle="Guardrails and reality bounds">
              <ul className="space-y-2">
                {(formData.constraints || []).map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Unproven Assumptions & Open Strategic Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Key Validation Hypotheses" subtitle="Assumptions that must hold true">
              <ul className="space-y-2">
                {(formData.assumptions || []).map((a, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card title="Critical Strategic Questions" subtitle="Questions founders must answer">
              <ul className="space-y-2">
                {(formData.openQuestions || []).map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <HelpCircle className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                    <span>{q}</span>
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

export default Discovery;
