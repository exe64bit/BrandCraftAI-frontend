import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateProject from './pages/CreateProject';
import WorkspaceLayout from './pages/WorkspaceLayout';
import Discovery from './pages/Discovery';
import Positioning from './pages/Positioning';
import Personality from './pages/Personality';
import Naming from './pages/Naming';
import Critique from './pages/Critique';
import Visual from './pages/Visual';
import Consistency from './pages/Consistency';
import Launch from './pages/Launch';
import BrandKit from './pages/BrandKit';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, isDemoUser } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated && !isDemoUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Redirect /projects/:id to /projects/:id/discovery or saved stage
const WorkspaceRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/projects/${id}/discovery`} replace />;
};

export const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/new"
            element={
              <ProtectedRoute>
                <CreateProject />
              </ProtectedRoute>
            }
          />

          {/* Workspace Staged Routes */}
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <WorkspaceLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<WorkspaceRedirect />} />
            <Route path="discovery" element={<Discovery />} />
            <Route path="positioning" element={<Positioning />} />
            <Route path="personality" element={<Personality />} />
            <Route path="naming" element={<Naming />} />
            <Route path="critique" element={<Critique />} />
            <Route path="visual" element={<Visual />} />
            <Route path="consistency" element={<Consistency />} />
            <Route path="launch" element={<Launch />} />
            <Route path="brand-kit" element={<BrandKit />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
