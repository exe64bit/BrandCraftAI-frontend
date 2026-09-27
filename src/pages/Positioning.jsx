import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { aiAPI, projectsAPI } from '../services/api';
import { StageHeader } from '../components/StageHeader';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { Sparkles, Target, Zap, Shield, BookmarkCheck } from 'lucide-react';

export const Positioning = () => {
  const { project, updateProjectState } = useOutletContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState(project.positioning || {});

  const hasData = Boolean(project.positioning?.category && project.positioning?.positioningStatement);

  const handleGenerate = async (isRegen = false) => {
    setError('');
    if (isRegen) {
      setRegenerating(true);
    } else {
      setLoading(true);
    }

    try {
      const res = await aiAPI.runPositioning(project._id, {
        regenerate: isRegen,
      });

      if (res.success && res.positioning) {
        const updated = {
          ...project,
          positioning: res.positioning,
          currentStage: res.currentStage || project.currentStage,
          progress: res.progress || project.progress,
        };
        updateProjectState(updated);
        setFormData(res.positioning);
        setIsEditing(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate positioning stage.');
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
        positioning: formData,
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
        stageNumber={2}
        title="Positioning & Category Design"
        description="Grounds the brand in a defined market category with an undeniable value proposition and defensible competitive angle."
        isEditing={isEditing}
        onToggleEdit={hasData ? handleSaveEdits : null}
        onRegenerate={hasData ? () => handleGenerate(true) : null}
        onContinue={() => navigate(`/projects/${project._id}/personality`)}
        isRegenerating={regenerating}
        isSaving={saving}
        showRegenerate={hasData}
        showContinue={hasData}
        continueLabel="Continue to Personality"
      />

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
          {error}
        </div>
      )}

      {loading ? (
        <Loading stage="positioning" />
      ) : !hasData ? (
        <Card className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Build Your Strategic Positioning</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Using the Discovery inputs ({project.discovery?.targetAudience ? 'Audience & Problem identified' : 'Initial Idea'}), we will formulate an undeniable category definition and competitive angle.
            </p>
            <Button
              size="lg"
              variant="primary"
              onClick={() => handleGenerate(false)}
              icon={Sparkles}
              className="w-full"
            >
              Generate Strategic Positioning
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Headline Positioning Statement */}
          <div className="bg-gradient-to-r from-brand-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <BookmarkCheck className="w-5 h-5 text-brand-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-200">
                Foundational Positioning Statement
              </span>
            </div>
            {isEditing ? (
              <Input
                as="textarea"
                rows={3}
                value={formData.positioningStatement || ''}
                onChange={(e) => setFormData({ ...formData, positioningStatement: e.target.value })}
                className="text-slate-900"
              />
            ) : (
              <blockquote className="text-base sm:text-lg font-medium leading-relaxed italic text-white/95">
                "{formData.positioningStatement}"
              </blockquote>
            )}
          </div>

          {/* Category & Value Prop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Defined Market Category" subtitle="The strategic space your product commands">
              {isEditing ? (
                <Input
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              ) : (
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-brand-500 shrink-0" />
                  <p className="text-sm font-bold text-slate-900">{formData.category}</p>
                </div>
              )}
            </Card>

            <Card title="Core Value Proposition" subtitle="The tangible gain delivered to the customer">
              {isEditing ? (
                <Input
                  as="textarea"
                  rows={2}
                  value={formData.valueProposition || ''}
                  onChange={(e) => setFormData({ ...formData, valueProposition: e.target.value })}
                />
              ) : (
                <p className="text-sm font-medium text-slate-800 leading-relaxed">
                  {formData.valueProposition}
                </p>
              )}
            </Card>
          </div>

          {/* Differentiator & Competitive Angle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Unfair Differentiator" subtitle="What makes confusion with alternatives impossible">
              {isEditing ? (
                <Input
                  as="textarea"
                  rows={3}
                  value={formData.differentiator || ''}
                  onChange={(e) => setFormData({ ...formData, differentiator: e.target.value })}
                />
              ) : (
                <div className="flex items-start gap-2.5 text-sm text-slate-700">
                  <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{formData.differentiator}</span>
                </div>
              )}
            </Card>

            <Card title="Competitive Angle & Status Quo" subtitle="How this shifts against default behaviors">
              {isEditing ? (
                <Input
                  as="textarea"
                  rows={3}
                  value={formData.competitiveAngle || ''}
                  onChange={(e) => setFormData({ ...formData, competitiveAngle: e.target.value })}
                />
              ) : (
                <div className="flex items-start gap-2.5 text-sm text-slate-700">
                  <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{formData.competitiveAngle}</span>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Positioning;
