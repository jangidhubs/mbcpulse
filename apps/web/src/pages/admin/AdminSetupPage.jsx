
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Copy, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

function AdminSetupPage() {
  const { adminExists, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background">Loading...</div>;
  }

  // If admin already exists, don't show this page
  if (adminExists) {
    return <Navigate to="/admin/login" replace />;
  }

  const credentials = {
    email: 'admin@mbcpulse.com',
    password: 'Tr0pic@lThund3r#2024'
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  };

  return (
    <>
      <Helmet>
        <title>Admin Setup - MBC Pulse</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-lg admin-card border-primary/20">
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
              <ShieldAlert size={32} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Initial Admin Setup</h1>
            <p className="text-muted-foreground text-sm mt-2">
              Your admin account has been provisioned. Please save these temporary credentials securely.
              This page will not be accessible again.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-secondary/50 p-6 rounded-xl border border-border space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Admin Email</label>
                <div className="flex items-center justify-between mt-1 bg-background p-3 rounded-lg border border-border">
                  <code className="text-sm font-mono text-foreground">{credentials.email}</code>
                  <button 
                    onClick={() => copyToClipboard(credentials.email, 'Email')}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Copy email"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Temporary Password</label>
                <div className="flex items-center justify-between mt-1 bg-background p-3 rounded-lg border border-border">
                  <code className="text-sm font-mono text-foreground">{credentials.password}</code>
                  <button 
                    onClick={() => copyToClipboard(credentials.password, 'Password')}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Copy password"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
              <p className="text-sm text-yellow-600 dark:text-yellow-500">
                <strong>Important:</strong> You must change this password immediately after your first login for security purposes.
              </p>
            </div>

            <Button 
              onClick={() => navigate('/admin/login')} 
              className="w-full h-12 text-base"
            >
              <CheckCircle2 size={18} className="mr-2" />
              I've saved my credentials
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSetupPage;
