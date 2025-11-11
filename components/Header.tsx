import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="flex items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="https://d64gsuwffb70l.cloudfront.net/687c280bbe5bd423bd10f60d_1759422831225_436f18c7.png" 
            alt="ART Services Logo" 
            className="h-12 w-auto"
          />
        </Link>

        
        <div className="flex items-center gap-3">
          <Link to="/mobile-demo">
            <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
              📱 Live Mobile Demo
            </Button>
          </Link>
          <Link to="/driver-app">
            <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
              🚗 Driver App
            </Button>
          </Link>
          <Link to="/customer">
            <Button variant="secondary" size="sm">
              Customer Login
            </Button>
          </Link>
          <Link to="/admin">
            <Button variant="secondary" size="sm">
              Admin Login
            </Button>
          </Link>
          <Link to="/vendor">
            <Button variant="secondary" size="sm">
              Vendor Login
            </Button>
          </Link>

        </div>
      </div>
    </header>
  );
};

