import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';

function AdminHeader() {
  const { logout, currentAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/admin/dashboard" className="text-xl font-bold text-primary">
            MBC Admin
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link to="/admin/dashboard" className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </Link>
            <Link to="/admin/posts/new" className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <FileText size={16} />
              <span>New Post</span>
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground hidden sm:inline-block">
            {currentAdmin?.email}
          </span>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;