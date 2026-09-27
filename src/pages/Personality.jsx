import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { aiAPI, projectsAPI } from '../services/api';
import { StageHeader } from '../components/StageHeader';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { Sparkles, Ban, HeartHandshake, CheckCircle } from 'lucide-react';

export const Personality = () => {
  const { project, updateProjectState } = useOutletContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState(project.personality || { traits: [], avoidTraits: [], principles: [] });

  const hasData = Boolean(project.personality?.traits && project.personality.traits.length > 0);

  const handleGenerate = async (isRegen = false) => {
    setError('');
    if (isRegen) {
      setRegenerating(true);
    } else {
      setLoading(true);
    }

    try {
      const res = await aiAPI.runPersonality(project._id, {
        regenerate: isRegen,
      });

      if (res.success && res.personality) {
        const updated = {
          ...project,
          personality: res.personality,
          currentStage: res.currentStage || project.currentStage,
          progress: res.progress || project.progress,
        };
        updateProjectState(updated);
        setFormData(res.personality);
        setIsEditing(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate personality stage.');
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
        personality: formData,
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

  const updateTrait = (idx, field, val) => {
    const newTraits = [...(formData.traits || [])];
    newTraits[idx] = { ...newTraits[idx], [field]: val };
    setFormData({ ...formData, traits: newTraits });
  };

  return (
    <div>
      <StageHeader
        stageNumber={3}
        title="Brand Personality & Archetypes"
        description="Crafts 3-5 justified character traits, anti-traits the brand will never exhibit, and foundational behavioral principles."
        isEditing={isEditing}
        onToggleEdit={hasData ? handleSaveEdits : null}
        onRegenerate={hasData ? () => handleGenerate(true) : null}
        onContinue={() => navigate(`/projects/${project._id}/naming`)}
        isRegenerating={regenerating}
        isSaving={saving}
        showRegenerate={hasData}
        showContinue={hasData}
        continueLabel="Continue to Naming"
      />

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
          {error}
        </div>
      )}

      {loading ? (
        <Loading stage="personality" />
      ) : !hasData ? (
        <Card className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Synthesize Brand Personality</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              We'll translate your positioning ({project.positioning?.category || 'Strategic Platform'}) into justified human character traits, avoiding random generic buzzwords.
            </p>
            <Button
              size="lg"
              variant="primary"
              onClick={() => handleGenerate(false)}
              icon={Sparkles}
              className="w-full"
            >
              Generate Brand Personality
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* 3-5 Justified Traits */}
          <Card
            title="Core Justified Traits"
            subtitle="Every trait must directly advance user trust and market positioning"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(formData.traits || []).map((t, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all"
                >
                  {isEditing ? (
                    <div className="space-y-2">
                      <Input
                        label={`Trait #${idx + 1}`}
                        value={t.trait}
                        onChange={(e) => updateTrait(idx, 'trait', e.target.value)}
                      />
                      <Input
                        as="textarea"
                        rows={2}
                        label="Strategic Justification"
                        value={t.reason}
                        onChange={(e) => updateTrait(idx, 'reason', e.target.value)}
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-2 h-2 rounded-full bg-brand-500" />
                        <h4 className="font-bold text-slate-900 text-base">{t.trait}</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-4">{t.reason}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Anti-Traits & Behavioral Principles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              title="Anti-Traits (What We Are NOT)"
              subtitle="Behaviors and attitudes the brand strictly forbids"
            >
              <ul className="space-y-2.5">
                {(formData.avoidTraits || []).map((avoid, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
                    <Ban className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="font-medium">{avoid}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card
              title="Foundational Voice Principles"
              subtitle="Guiding rules for brand tone and user interactions"
            >
              <ul className="space-y-2.5">
                {(formData.principles || []).map((prin, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{prin}</span>
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

export default Personality;
