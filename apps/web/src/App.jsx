import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from '@/contexts/AuthContext.jsx';
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute.jsx';

import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import CricketPage from './pages/CricketPage';
import TechPage from './pages/TechPage';
import FinancePage from './pages/FinancePage';
import AboutPage from './pages/AboutPage';

import AdminSetupPage from './pages/admin/AdminSetupPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreatePostPage from './pages/admin/CreatePostPage';
import EditPostPage from './pages/admin/EditPostPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/article" element={<ArticlePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/cricket" element={<CricketPage />} />
          <Route path="/tech" element={<TechPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Admin Routes */}
          <Route path="/admin/setup" element={<AdminSetupPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/posts/new" element={
            <ProtectedAdminRoute>
              <CreatePostPage />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/posts/:id/edit" element={
            <ProtectedAdminRoute>
              <EditPostPage />
            </ProtectedAdminRoute>
          } />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;