import axios from 'axios';
import { DEMO_PROJECT } from '../data/sampleProject';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('brand_builder_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Do not clear token if on demo mode
      const isDemo = localStorage.getItem('is_demo_session') === 'true';
      if (!isDemo && window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/') {
        localStorage.removeItem('brand_builder_token');
        localStorage.removeItem('brand_builder_user');
      }
    }
    return Promise.reject(error);
  }
);

// ----------------- Auth API -----------------
export const authAPI = {
  register: async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    return res.data;
  },
  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
  },
  getMe: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  },
};

// ----------------- Projects API -----------------
export const projectsAPI = {
  getProjects: async () => {
    try {
      const res = await api.get('/projects');
      return res.data;
    } catch (err) {
      // If server unreachable or demo user, provide empty or demo
      if (localStorage.getItem('is_demo_session') === 'true') {
        return { success: true, count: 1, projects: [DEMO_PROJECT] };
      }
      throw err;
    }
  },

  getProjectById: async (id) => {
    if (id === 'demo-teamup-project') {
      const stored = localStorage.getItem('demo_project_data');
      return { success: true, project: stored ? JSON.parse(stored) : DEMO_PROJECT };
    }
    const res = await api.get(`/projects/${id}`);
    return res.data;
  },

  createProject: async (projectName, originalIdea) => {
    const res = await api.post('/projects', { projectName, originalIdea });
    return res.data;
  },

  updateProject: async (id, updateData) => {
    if (id === 'demo-teamup-project') {
      const current = JSON.parse(localStorage.getItem('demo_project_data') || JSON.stringify(DEMO_PROJECT));
      const updated = { ...current, ...updateData, updatedAt: new Date().toISOString() };
      localStorage.setItem('demo_project_data', JSON.stringify(updated));
      return { success: true, project: updated };
    }
    const res = await api.patch(`/projects/${id}`, updateData);
    return res.data;
  },

  deleteProject: async (id) => {
    if (id === 'demo-teamup-project') {
      return { success: true, message: 'Demo project cannot be deleted permanently.' };
    }
    const res = await api.delete(`/projects/${id}`);
    return res.data;
  },
};

// ----------------- AI Stages API -----------------
export const aiAPI = {
  runDiscovery: async (id, data = {}) => {
    if (id === 'demo-teamup-project') {
      return { success: true, discovery: DEMO_PROJECT.discovery, currentStage: 'positioning' };
    }
    const res = await api.post(`/projects/${id}/discovery`, data);
    return res.data;
  },

  runPositioning: async (id, data = {}) => {
    if (id === 'demo-teamup-project') {
      return { success: true, positioning: DEMO_PROJECT.positioning, currentStage: 'personality' };
    }
    const res = await api.post(`/projects/${id}/positioning`, data);
    return res.data;
  },

  runPersonality: async (id, data = {}) => {
    if (id === 'demo-teamup-project') {
      return { success: true, personality: DEMO_PROJECT.personality, currentStage: 'naming' };
    }
    const res = await api.post(`/projects/${id}/personality`, data);
    return res.data;
  },

  runNaming: async (id, data = {}) => {
    if (id === 'demo-teamup-project') {
      return { success: true, naming: DEMO_PROJECT.naming, currentStage: 'critique' };
    }
    const res = await api.post(`/projects/${id}/naming`, data);
    return res.data;
  },

  runCritique: async (id, data = {}) => {
    if (id === 'demo-teamup-project') {
      return { success: true, critique: DEMO_PROJECT.critique, currentStage: 'visual' };
    }
    const res = await api.post(`/projects/${id}/critique`, data);
    return res.data;
  },

  runVisual: async (id, data = {}) => {
    if (id === 'demo-teamup-project') {
      return { success: true, visualDirection: DEMO_PROJECT.visualDirection, currentStage: 'images' };
    }
    const res = await api.post(`/projects/${id}/visual`, data);
    return res.data;
  },

  generateImage: async (id, data) => {
    if (id === 'demo-teamup-project') {
      const match = DEMO_PROJECT.generatedVisuals.find((v) => v.type === data.type) || DEMO_PROJECT.generatedVisuals[0];
      return { success: true, visual: match, generatedVisuals: DEMO_PROJECT.generatedVisuals };
    }
    const res = await api.post(`/projects/${id}/generate-image`, data);
    return res.data;
  },

  runConsistency: async (id, data = {}) => {
    if (id === 'demo-teamup-project') {
      return { success: true, consistency: DEMO_PROJECT.consistency, currentStage: 'launch' };
    }
    const res = await api.post(`/projects/${id}/consistency`, data);
    return res.data;
  },

  runLaunch: async (id, data = {}) => {
    if (id === 'demo-teamup-project') {
      return { success: true, launchKit: DEMO_PROJECT.launchKit, currentStage: 'brand-kit' };
    }
    const res = await api.post(`/projects/${id}/launch`, data);
    return res.data;
  },
};

export default api;
