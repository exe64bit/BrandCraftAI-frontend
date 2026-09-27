import React, { useEffect, useState } from 'react';
import { useParams, Outlet, useNavigate } from 'react-router-dom';
import { projectsAPI } from '../services/api';
import { Sidebar } from '../components/Sidebar';
import { BrandPreview } from '../components/BrandPreview';
import { Loader2 } from 'lucide-react';

export const WorkspaceLayout = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchProject = async () => {
    try {
      setLoading(true);
      const res = await projectsAPI.getProjectById(id);
      if (res.success && res.project) {
        setProject(res.project);
      } else {
        setError('Project could not be loaded.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load brand project.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const updateProjectState = (updatedProject) => {
    setProject(updatedProject);
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-brand-600 animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-600">Loading Brand Architecture Workspace...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 max-w-md w-full text-center shadow-sm">
          <p className="text-sm font-semibold text-rose-600 mb-4">{error || 'Project not found.'}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex">
      <Sidebar project={project} />

      <main className="flex-1 max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <BrandPreview project={project} />
        <Outlet context={{ project, updateProjectState, reloadProject: fetchProject }} />
      </main>
    </div>
  );
};

export default WorkspaceLayout;
