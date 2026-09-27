import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Plus, LogOut, Compass, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './Button';

export const Navbar = () => {
  const { user, isAuthenticated, isDemoUser, logout, loginDemo } = useAuth();
  const navigate = useNavigate();

  const handleDemoClick = () => {
    loginDemo();
    navigate('/projects/demo-teamup-project');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:bg-brand-700 transition-colors">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-900 tracking-tight text-base font-display flex items-center gap-1.5">
              BrandCraft <span className="text-xs px-1.5 py-0.5 bg-brand-50 text-brand-700 border border-brand-200 rounded font-semibold">AI</span>
            </span>
            <span className="text-[10px] text-slate-400 block -mt-1 font-medium tracking-wide">Brand Intelligence Platform</span>
          </div>
        </Link>

        {/* Action Center */}
        <div className="flex items-center gap-3">
          {/* Demo Button */}
          <button
            type="button"
            onClick={handleDemoClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>Live Sample: TeamUp</span>
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" icon={LayoutDashboard} className="hidden md:inline-flex">
                  Dashboard
                </Button>
              </Link>

              <Link to="/projects/new">
                <Button variant="primary" size="sm" icon={Plus}>
                  New Brand
                </Button>
              </Link>

              <div className="h-5 w-px bg-slate-200 hidden sm:block" />

              <div className="flex items-center gap-2 pl-1">
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-semibold text-slate-800 line-clamp-1">{user?.name}</p>
                  <p className="text-[10px] text-slate-400 line-clamp-1">
                    {isDemoUser ? 'Demo Judge Mode' : user?.email}
                  </p>
                </div>
              </div>

              <button
                onClick={logout}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
