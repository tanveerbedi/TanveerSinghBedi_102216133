'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type AuthState = {
  user: { email: string; isAdmin: boolean } | null;
  loading: boolean;
  login: (isAdmin: boolean) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string; isAdmin: boolean } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for an existing session
    setTimeout(() => {
      // For this mock, we'll start as a logged-out user (anonymous shopper)
      setUser(null); 
      setLoading(false);
    }, 500);
  }, []);

  const login = (isAdmin: boolean) => {
    setUser({ email: isAdmin ? 'admin@example.com' : 'user@example.com', isAdmin });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
