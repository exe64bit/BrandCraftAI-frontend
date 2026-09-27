import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { aiAPI, projectsAPI } from '../services/api';
import { StageHeader } from '../components/StageHeader';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { Rocket, Sparkles, Copy, Check, MessageSquare, Megaphone, Terminal } from 'lucide-react';

export const Launch = () => {
  const { project, updateProjectState } = useOutletContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [copiedKey, setCopiedKey] = useState(null);

  const launchData = project.launchKit || {};
  const hasData = Boolean(launchData.headline && launchData.oneLinePitch);

  const [formData, setFormData] = useState(launchData);

  const handleCopyText = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerate = async (isRegen = false) => {
    setError('');
    if (isRegen) {
      setRegenerating(true);
    } else {
      setLoading(true);
    }

    try {
      const res = await aiAPI.runLaunch(project._id, {
        regenerate: isRegen,
      });

      if (res.success && res.launchKit) {
        const updated = {
          ...project,
          launchKit: res.launchKit,
          currentStage: res.currentStage || project.currentStage,
          progress: res.progress || project.progress,
        };
        updateProjectState(updated);
        setFormData(res.launchKit);
        setIsEditing(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate launch kit.');
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
        launchKit: formData,
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
        stageNumber={8}
        title="Go-To-Market Launch Kit"
        description="Generates high-conversion landing page copy, one-line elevator pitches, founder launch notes, social campaign copy, and brand voice guidelines."
        isEditing={isEditing}
        onToggleEdit={hasData ? handleSaveEdits : null}
        onRegenerate={hasData ? () => handleGenerate(true) : null}
        onContinue={() => navigate(`/projects/${project._id}/brand-kit`)}
        isRegenerating={regenerating}
        isSaving={saving}
        showRegenerate={hasData}
        showContinue={hasData}
        continueLabel="View Final Brand Kit"
      />

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
          {error}
        </div>
      )}

      {loading ? (
        <Loading stage="launch" />
      ) : !hasData ? (
        <Card className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Build Your Go-To-Market Kit</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              We'll translate "{project.naming?.selectedName || project.projectName}" and its positioning into magnetic landing page copy, social announcements, and brand voice examples.
            </p>
            <Button
              size="lg"
              variant="primary"
              onClick={() => handleGenerate(false)}
              icon={Sparkles}
              className="w-full"
            >
              Generate Launch Kit
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Landing Page Hero Preview Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                Landing Page Hero Section
              </span>
              <button
                type="button"
                onClick={() => handleCopyText('hero', `${formData.headline}\n${formData.subheadline}`)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
                title="Copy headline"
              >
                {copiedKey === 'hero' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-3">
                <Input
                  label="Headline"
                  value={formData.headline || ''}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                />
                <Input
                  label="Subheadline"
                  as="textarea"
                  rows={2}
                  value={formData.subheadline || ''}
                  onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
                />
                <Input
                  label="CTA Button Text"
                  value={formData.cta || ''}
                  onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                />
              </div>
            ) : (
              <div className="text-center py-6 max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4">
                  {formData.headline}
                </h2>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed max-w-xl mx-auto">
                  {formData.subheadline}
                </p>
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-xl font-bold text-white shadow-md transition-all hover:opacity-95"
                  style={{
                    backgroundColor: project.visualDirection?.colors?.primary || '#3B82F6',
                  }}
                >
                  {formData.cta || 'Get Started Now'}
                </button>
              </div>
            )}
          </div>

          {/* One-Line Elevator Pitch & Social Proof */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              title="One-Line Elevator Pitch"
              subtitle="The definitive concise summary of the brand"
              action={
                <button
                  onClick={() => handleCopyText('pitch', formData.oneLinePitch)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  {copiedKey === 'pitch' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              }
            >
              {isEditing ? (
                <Input
                  as="textarea"
                  rows={3}
                  value={formData.oneLinePitch || ''}
                  onChange={(e) => setFormData({ ...formData, oneLinePitch: e.target.value })}
                />
              ) : (
                <p className="text-sm font-semibold text-slate-900 leading-relaxed italic">
                  "{formData.oneLinePitch}"
                </p>
              )}
            </Card>

            <Card
              title="Social Proof Hook"
              subtitle="Rallying angle to establish trust"
            >
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {formData.landingPageCopy?.socialProofHook ||
                  'Backed by rapid campus growth and student peer recommendations.'}
              </p>
            </Card>
          </div>

          {/* Social Post Announcement & Founder Memo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              title="Social Announcement (X / LinkedIn)"
              subtitle="Ready-to-post public launch copy"
              action={
                <button
                  onClick={() => handleCopyText('social', formData.socialPost)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  {copiedKey === 'social' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              }
            >
              {isEditing ? (
                <Input
                  as="textarea"
                  rows={5}
                  value={formData.socialPost || ''}
                  onChange={(e) => setFormData({ ...formData, socialPost: e.target.value })}
                />
              ) : (
                <pre className="whitespace-pre-wrap font-sans text-xs text-slate-700 bg-slate-50 p-3.5 rounded-lg border border-slate-200/80 leading-relaxed">
                  {formData.socialPost}
                </pre>
              )}
            </Card>

            <Card
              title="Founder's Launch Letter"
              subtitle="The authentic 'Why We Built This' manifesto"
            >
              {isEditing ? (
                <Input
                  as="textarea"
                  rows={5}
                  value={formData.launchMessage || ''}
                  onChange={(e) => setFormData({ ...formData, launchMessage: e.target.value })}
                />
              ) : (
                <p className="text-xs text-slate-700 leading-relaxed italic bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
                  "{formData.launchMessage}"
                </p>
              )}
            </Card>
          </div>

          {/* Brand Voice in Action (Microcopy Examples) */}
          <Card
            title="Brand Voice in Action"
            subtitle="Real microcopy examples illustrating tone across user states"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(formData.brandVoiceExamples || []).map((ex, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-bold text-slate-900 block mb-1">State {idx + 1}</span>
                  <p className="text-slate-600 leading-relaxed">{ex}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Launch;
