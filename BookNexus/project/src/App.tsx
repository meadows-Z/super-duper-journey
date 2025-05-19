import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BooksProvider } from './contexts/BooksContext';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import AddBookPage from './pages/AddBookPage';
import MyBooksPage from './pages/MyBooksPage';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastProvider } from './contexts/ToastContext';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <BooksProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/add-book" 
              element={
                <ProtectedRoute>
                  <AddBookPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-books" 
              element={
                <ProtectedRoute>
                  <MyBooksPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </BooksProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;