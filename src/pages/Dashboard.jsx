import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Trash2, ArrowRight, Sparkles, Compass, Clock, CheckCircle2 } from 'lucide-react';
import { projectsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { DEMO_PROJECT } from '../data/sampleProject';

export const Dashboard = () => {
  const { user, isDemoUser, loginDemo } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await projectsAPI.getProjects();
      if (res.success && res.projects) {
        setProjects(res.projects);
      }
    } catch (err) {
      console.error('Failed to load projects:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (id === 'demo-teamup-project') {
      alert('The Demo Project cannot be deleted. It serves as a permanent reference model.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this brand project?')) return;

    try {
      setDeletingId(id);
      await projectsAPI.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete project.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleLaunchDemo = () => {
    loginDemo();
    navigate('/projects/demo-teamup-project');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Welcome back, {user?.name || 'Founder'}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your staged brand identities and continue refining strategy workflows.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              icon={Compass}
              onClick={handleLaunchDemo}
              className="border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100"
            >
              Demo: TeamUp
            </Button>

            <Link to="/projects/new">
              <Button variant="primary" size="md" icon={Plus}>
                + Create New Brand
              </Button>
            </Link>
          </div>
        </div>

        {/* Featured Sample Project Card for Judges/Users */}
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 text-white mb-10 shadow-xl border border-indigo-500/20 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
                  Featured Hackathon Benchmark
                </span>
                <span className="text-xs text-indigo-200 font-medium">10/10 Stages Completed</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                TeamUp — Collegiate Talent Matchmaker
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Explore a realistic, complete brand system generated end-to-end: discovery analysis, strategic positioning, archetype personality, 5 naming territories, AI self-critique, harmonic visual system, Pollinations visuals, consistency audit score, and full launch kit.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Button
                variant="primary"
                size="md"
                onClick={handleLaunchDemo}
                className="bg-brand-500 hover:bg-brand-400 text-white font-semibold shadow-lg"
              >
                <span>Inspect Brand System</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* User Projects List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Your Brand Projects</h3>
            <span className="text-xs font-medium text-slate-500">{projects.length} project(s)</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 animate-pulse h-48" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">No Brand Projects Yet</h4>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Enter an incomplete product or business idea and watch the staged AI turn it into a full identity.
              </p>
              <Link to="/projects/new">
                <Button variant="primary" icon={Plus}>
                  Create First Brand
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                const currentStage = project.currentStage || 'discovery';
                const progress = project.progress || { percentage: 10, completedStagesCount: 1, totalStages: 10 };
                const isCompleted = project.status === 'completed';

                return (
                  <div
                    key={project._id}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between p-6"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="font-bold text-slate-900 text-base line-clamp-1" title={project.projectName}>
                          {project.projectName}
                        </h4>
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                            isCompleted
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-brand-50 text-brand-700 border border-brand-200'
                          }`}
                        >
                          {isCompleted ? 'Completed' : currentStage}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {project.originalIdea}
                      </p>

                      <div className="mb-4">
                        <ProgressBar
                          current={progress.completedStagesCount}
                          total={progress.totalStages || 10}
                          percentage={progress.percentage}
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{new Date(project.updatedAt || project.createdAt).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleDelete(project._id, e)}
                          disabled={deletingId === project._id}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <Link to={`/projects/${project._id}/${currentStage === 'brand-kit' ? 'brand-kit' : currentStage}`}>
                          <Button variant="primary" size="sm">
                            <span>Continue</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
