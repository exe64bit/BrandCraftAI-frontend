import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { aiAPI, projectsAPI } from '../services/api';
import { StageHeader } from '../components/StageHeader';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { ColorPalette } from '../components/ColorPalette';
import { ImageCard } from '../components/ImageCard';
import { Palette, Sparkles, Wand2, Type, Box, EyeOff, Compass } from 'lucide-react';

export const Visual = () => {
  const { project, updateProjectState } = useOutletContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [generatingImageType, setGeneratingImageType] = useState(null);

  const visualData = project.visualDirection || {};
  const hasData = Boolean(visualData.colors && visualData.mood);

  const [formData, setFormData] = useState(visualData);

  const handleGenerateDirection = async (isRegen = false) => {
    setError('');
    if (isRegen) {
      setRegenerating(true);
    } else {
      setLoading(true);
    }

    try {
      const res = await aiAPI.runVisual(project._id, {
        regenerate: isRegen,
      });

      if (res.success && res.visualDirection) {
        const updated = {
          ...project,
          visualDirection: res.visualDirection,
          currentStage: res.currentStage || project.currentStage,
          progress: res.progress || project.progress,
        };
        updateProjectState(updated);
        setFormData(res.visualDirection);
        setIsEditing(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate visual direction.');
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
        visualDirection: formData,
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

  const handleGenerateImage = async (type) => {
    setGeneratingImageType(type);
    setError('');

    try {
      const res = await aiAPI.generateImage(project._id, { type });

      if (res.success && res.visual) {
        const updatedVisuals = [
          ...(project.generatedVisuals || []).filter((v) => v.type !== type),
          res.visual,
        ];
        const updated = {
          ...project,
          generatedVisuals: updatedVisuals,
          progress: res.progress || project.progress,
        };
        updateProjectState(updated);
      }
    } catch (err) {
      setError(err.response?.data?.message || `Failed to generate ${type} visual.`);
    } finally {
      setGeneratingImageType(null);
    }
  };

  const visualsMap = (project.generatedVisuals || []).reduce((acc, curr) => {
    acc[curr.type] = curr;
    return acc;
  }, {});

  const visualTypes = [
    {
      type: 'logo',
      title: 'Minimalist Vector Logo',
      description: 'Iconic vector brand mark designed from strategic shapes and color tokens.',
    },
    {
      type: 'moodboard',
      title: 'Aesthetic Moodboard',
      description: 'Tactile materials, architectural textures, and studio color composition.',
    },
    {
      type: 'brand-visual',
      title: 'Hero Brand Scene',
      description: 'Cinematic visual depicting the product in action with authentic human collaboration.',
    },
    {
      type: 'social-visual',
      title: 'Social Launch Creative',
      description: 'Dynamic poster layout and typography graphic tailored for Twitter & LinkedIn.',
    },
  ];

  return (
    <div>
      <StageHeader
        stageNumber={6}
        title="Visual Identity & Image Generation"
        description="Translates the brand strategy into a rich visual system—harmonic color palettes, typography pairings, geometry motifs, and Pollinations AI visual generation."
        isEditing={isEditing}
        onToggleEdit={hasData ? handleSaveEdits : null}
        onRegenerate={hasData ? () => handleGenerateDirection(true) : null}
        onContinue={() => navigate(`/projects/${project._id}/consistency`)}
        isRegenerating={regenerating}
        isSaving={saving}
        showRegenerate={hasData}
        showContinue={hasData}
        continueLabel="Continue to Consistency Check"
      />

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
          {error}
        </div>
      )}

      {loading ? (
        <Loading stage="visual" />
      ) : !hasData ? (
        <Card className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-4">
              <Palette className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Formulate Visual Identity System</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              We'll derive a cohesive color palette, typography pairing, and visual rules for "{project.naming?.selectedName || project.projectName}", informed by previous critique.
            </p>
            <Button
              size="lg"
              variant="primary"
              onClick={() => handleGenerateDirection(false)}
              icon={Sparkles}
              className="w-full"
            >
              Generate Visual Direction
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* Color Palette Section */}
          <Card
            title="Strategic Color Palette"
            subtitle="Curated 5-tone color system with hex codes and psychological rationale"
          >
            <ColorPalette
              colors={formData.colors}
              isEditing={isEditing}
              onChange={(newColors) => setFormData({ ...formData, colors: newColors })}
            />
          </Card>

          {/* Typography & Mood */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Typography Hierarchy" subtitle="Heading and body font pairings">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-brand-600" />
                    <span className="text-xs font-semibold text-slate-700">Display / Heading:</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900 font-display">
                    {formData.typography?.headingFont || 'Space Grotesk'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-semibold text-slate-700">Body &amp; UI Font:</span>
                  </div>
                  <span className="text-sm font-medium text-slate-900">
                    {formData.typography?.bodyFont || 'Inter'}
                  </span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed pt-1">
                  {formData.typography?.styleGuide}
                </p>
              </div>
            </Card>

            <Card title="Atmosphere & Mood" subtitle="Tactile visual world of the brand">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed italic mb-3">
                "{formData.mood}"
              </div>
              <div className="text-xs">
                <span className="font-semibold text-slate-800">Logo Concept Direction: </span>
                <span className="text-slate-600 leading-relaxed">{formData.logoDirection}</span>
              </div>
            </Card>
          </div>

          {/* Shapes, Symbols & Things to Avoid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="Geometric Shapes">
              <ul className="space-y-2">
                {(formData.shapes || []).map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <Box className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card title="Iconic Symbols">
              <ul className="space-y-2">
                {(formData.symbols || []).map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <Compass className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card title="Aesthetic Anti-Patterns">
              <ul className="space-y-2">
                {(formData.avoid || []).map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <EyeOff className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* AI Visual Concept Rendering Section (Pollinations AI + ImageKit) */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-brand-600" />
                  <h3 className="text-lg font-bold text-slate-900">AI Visual Concept Generation</h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Rendered via Pollinations AI backend endpoint and uploaded to ImageKit CDN storage.
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                Generated: {Object.keys(visualsMap).length} / 4 visuals
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {visualTypes.map((vType) => (
                <ImageCard
                  key={vType.type}
                  type={vType.type}
                  title={vType.title}
                  description={vType.description}
                  visual={visualsMap[vType.type]}
                  onGenerate={() => handleGenerateImage(vType.type)}
                  isGenerating={generatingImageType === vType.type}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visual;
