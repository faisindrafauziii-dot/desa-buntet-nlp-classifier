import React from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
  isAdmin?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  isAdmin = false,
}) => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation isAdmin={isAdmin} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
