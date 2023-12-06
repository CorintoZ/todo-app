import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    console.log('savedToken', savedToken);
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const fakeLoginRequest = (username: string, password: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const fakeToken = 'fakeToken123';
        resolve(fakeToken);
      }, 1000);
    });
  };

  const login = async (username: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const newToken = await fakeLoginRequest(username, password);
      localStorage.setItem('token', newToken);
      setToken(newToken);
      navigate('/tasks');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  const authContextValue: AuthContextProps = {
    token,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
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
}
