import { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (identifier: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Check localStorage for persisted session
    const stored = localStorage.getItem('hostelpulse_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (identifier: string, password: string, role: UserRole): boolean => {
    // Mock authentication - in real app, this would call an API
    const foundUser = mockUsers.find(
      u => u.role === role && (u.email === identifier || ('studentId' in u && u.studentId === identifier))
    );

    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      localStorage.setItem('hostelpulse_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hostelpulse_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
