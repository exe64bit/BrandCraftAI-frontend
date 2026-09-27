import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { aiAPI, projectsAPI } from '../services/api';
import { StageHeader } from '../components/StageHeader';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { NameCard } from '../components/NameCard';
import { Sparkles, Layers, Check, Edit2 } from 'lucide-react';

export const Naming = () => {
  const { project, updateProjectState } = useOutletContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [customNameInput, setCustomNameInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const namingData = project.naming || { options: [], selectedName: '' };
  const options = namingData.options || [];
  const selectedName = namingData.selectedName || (options.find((o) => o.selected)?.name) || '';

  const hasData = options.length > 0;

  const handleGenerate = async (isRegen = false) => {
    setError('');
    if (isRegen) {
      setRegenerating(true);
    } else {
      setLoading(true);
    }

    try {
      const res = await aiAPI.runNaming(project._id, {
        regenerate: isRegen,
      });

      if (res.success && res.naming) {
        const updated = {
          ...project,
          naming: res.naming,
          currentStage: res.currentStage || project.currentStage,
          progress: res.progress || project.progress,
        };
        updateProjectState(updated);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate brand names.');
    } finally {
      setLoading(false);
      setRegenerating(false);
    }
  };

  const handleSelectName = async (nameOption) => {
    const updatedOptions = options.map((opt) => ({
      ...opt,
      selected: opt.name === nameOption.name,
    }));

    setSaving(true);
    setError('');

    try {
      const res = await projectsAPI.updateProject(project._id, {
        naming: {
          options: updatedOptions,
          selectedName: nameOption.name,
        },
      });

      if (res.success && res.project) {
        updateProjectState(res.project);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update selected brand name.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddCustomName = async (e) => {
    e.preventDefault();
    if (!customNameInput.trim()) return;

    const newOption = {
      name: customNameInput.trim(),
      rationale: 'Founder designated custom brand name.',
      positioning: 'Custom strategic identity selected by team.',
      territory: 'abstract',
      selected: true,
      isNewlyAdded: true,
    };

    const updatedOptions = [
      ...options.map((o) => ({ ...o, selected: false })),
      newOption,
    ];

    setSaving(true);
    setError('');

    try {
      const res = await projectsAPI.updateProject(project._id, {
        naming: {
          options: updatedOptions,
          selectedName: newOption.name,
        },
      });

      if (res.success && res.project) {
        updateProjectState(res.project);
        setCustomNameInput('');
        setShowCustomInput(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save custom name.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <StageHeader
        stageNumber={4}
        title="Brand Naming Strategy"
        description="Generates inventive, trademark-conscious brand names across semantic territories (metaphorical, descriptive, abstract, action, and community). Select one to anchor all downstream visual and launch assets."
        onRegenerate={hasData ? () => handleGenerate(true) : null}
        onContinue={() => navigate(`/projects/${project._id}/critique`)}
        isRegenerating={regenerating}
        isSaving={saving}
        showRegenerate={hasData}
        showContinue={hasData}
        continueLabel="Continue to Critique"
      />

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
          {error}
        </div>
      )}

      {loading ? (
        <Loading stage="naming" />
      ) : !hasData ? (
        <Card className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-4">
              <Layers className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Generate Distinctive Brand Names</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              We'll synthesize your category ({project.positioning?.category || 'Platform'}), traits, and target audience to invent 5 memorable, high-resonance name concepts.
            </p>
            <Button
              size="lg"
              variant="primary"
              onClick={() => handleGenerate(false)}
              icon={Sparkles}
              className="w-full"
            >
              Generate Brand Names
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Active Selected Brand Bar */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-400 block mb-1">
                Active Brand Name Selected
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {selectedName || 'No Name Selected Yet'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                All subsequent stages (Critique, Visual Direction, Images, and Launch Kit) will use this name.
              </p>
            </div>

            <button
              onClick={() => setShowCustomInput(!showCustomInput)}
              className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white transition-colors shrink-0 flex items-center gap-1.5"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{showCustomInput ? 'Cancel Custom' : 'Enter Custom Name'}</span>
            </button>
          </div>

          {showCustomInput && (
            <form
              onSubmit={handleAddCustomName}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-end gap-3"
            >
              <div className="flex-1">
                <Input
                  label="Type your custom brand name"
                  placeholder="e.g. HyperMatch, CoFoundry..."
                  value={customNameInput}
                  onChange={(e) => setCustomNameInput(e.target.value)}
                  autoFocus
                  required
                />
              </div>
              <Button type="submit" variant="primary" size="md" isLoading={saving}>
                Add &amp; Select
              </Button>
            </form>
          )}

          {/* Name Options Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Name Options ({options.length})
              </h3>
              <span className="text-xs text-slate-500">
                Click any card to designate as the official brand name
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {options.map((option, idx) => (
                <NameCard
                  key={idx}
                  option={option}
                  isSelected={option.name === selectedName || Boolean(option.selected)}
                  onSelect={() => handleSelectName(option)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Naming;
