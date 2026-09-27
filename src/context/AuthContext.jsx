import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('brand_builder_token') || null);
  const [loading, setLoading] = useState(true);
  const [isDemoUser, setIsDemoUser] = useState(localStorage.getItem('is_demo_session') === 'true');

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('brand_builder_token');
      const isDemo = localStorage.getItem('is_demo_session') === 'true';

      if (isDemo) {
        setUser({ id: 'demo-user-id', name: 'Demo Judge / Founder', email: 'demo@brandcraft.ai' });
        setIsDemoUser(true);
        setLoading(false);
        return;
      }

      if (storedToken) {
        try {
          const res = await authAPI.getMe();
          if (res.success && res.user) {
            setUser(res.user);
          } else {
            logout();
          }
        } catch (err) {
          console.warn('Session verification failed:', err.message);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await authAPI.login(email, password);
    if (res.success && res.token) {
      localStorage.setItem('brand_builder_token', res.token);
      localStorage.setItem('brand_builder_user', JSON.stringify(res.user));
      localStorage.removeItem('is_demo_session');
      setToken(res.token);
      setUser(res.user);
      setIsDemoUser(false);
    }
    return res;
  };

  const register = async (name, email, password) => {
    const res = await authAPI.register(name, email, password);
    if (res.success && res.token) {
      localStorage.setItem('brand_builder_token', res.token);
      localStorage.setItem('brand_builder_user', JSON.stringify(res.user));
      localStorage.removeItem('is_demo_session');
      setToken(res.token);
      setUser(res.user);
      setIsDemoUser(false);
    }
    return res;
  };

  const loginDemo = () => {
    const demoUser = { id: 'demo-user-id', name: 'Demo Judge / Founder', email: 'demo@brandcraft.ai' };
    localStorage.setItem('brand_builder_token', 'demo-jwt-token-string');
    localStorage.setItem('brand_builder_user', JSON.stringify(demoUser));
    localStorage.setItem('is_demo_session', 'true');
    setToken('demo-jwt-token-string');
    setUser(demoUser);
    setIsDemoUser(true);
  };

  const logout = () => {
    localStorage.removeItem('brand_builder_token');
    localStorage.removeItem('brand_builder_user');
    localStorage.removeItem('is_demo_session');
    setToken(null);
    setUser(null);
    setIsDemoUser(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: Boolean(user && token),
        isDemoUser,
        login,
        register,
        loginDemo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
