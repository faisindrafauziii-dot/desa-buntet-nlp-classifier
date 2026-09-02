import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiMenu, BiX } from 'react-icons/bi';

interface NavigationProps {
  isAdmin?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ isAdmin = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const adminLinks = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Dataset', path: '/admin/dataset' },
    { label: 'Preprocessing', path: '/admin/preprocessing' },
    { label: 'TF-IDF', path: '/admin/tfidf' },
    { label: 'Model Training', path: '/admin/model/training' },
    { label: 'Evaluation', path: '/admin/model/evaluation' },
    { label: 'Predict', path: '/admin/predict' },
    { label: 'History', path: '/admin/model/history' },
    { label: 'Requests', path: '/admin/requests' },
  ];

  const publicLinks = [
    { label: 'Home', path: '/' },
    { label: 'Submit Request', path: '/request' },
    { label: 'Track Status', path: '/status' },
  ];

  const links = isAdmin ? adminLinks : publicLinks;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to={isAdmin ? '/admin' : '/'} className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-600">
              {isAdmin ? '🏛️ Admin' : '🏘️ Desa Buntet'}
            </h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-600 hover:bg-neutral-100"
          >
            {isMobileMenuOpen ? (
              <BiX className="w-6 h-6" />
            ) : (
              <BiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
