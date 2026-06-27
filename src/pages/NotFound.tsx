import { Link } from 'react-router-dom';
import { Box } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="text-center">
        <Box className="w-12 h-12 text-accent mx-auto mb-4" />
        <h1 className="text-4xl font-heading font-medium text-txt-primary mb-2">404</h1>
        <p className="text-sm text-txt-secondary mb-6">Page not found</p>
        <Link to="/dashboard" className="px-4 py-2 bg-accent text-bg-primary rounded-button text-sm font-medium hover:bg-accent-hover transition-colors">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
