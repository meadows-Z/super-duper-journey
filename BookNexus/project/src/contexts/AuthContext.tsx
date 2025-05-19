import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { useToast } from './ToastContext';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    // Check for stored user on initial load
    const storedUser = localStorage.getItem('booktracker_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));

      // For demo purposes, we'll accept any email/password and create a mock user
      const mockUser: User = {
        id: Date.now().toString(),
        username: email.split('@')[0],
        email,
      };
      
      setUser(mockUser);
      localStorage.setItem('booktracker_user', JSON.stringify(mockUser));
      showToast('success', 'Successfully logged in');
    } catch (error) {
      showToast('error', 'Login failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));

      // For demo purposes, we'll create a mock user
      const mockUser: User = {
        id: Date.now().toString(),
        username,
        email,
      };
      
      setUser(mockUser);
      localStorage.setItem('booktracker_user', JSON.stringify(mockUser));
      showToast('success', 'Account created successfully');
    } catch (error) {
      showToast('error', 'Registration failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('booktracker_user');
    showToast('info', 'You have been logged out');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
};