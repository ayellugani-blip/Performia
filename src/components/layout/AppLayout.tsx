import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const AppLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100/60 text-slate-900">
      {/* Sidebar Component (desktop fixed height / mobile drawer) */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area (Column with header pinned at top) */}
      <div className="flex flex-1 flex-col h-full min-w-0 overflow-hidden">
        {/* Top Header Component - Fixed at top with 0 scroll movement */}
        <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Page Viewport - Internal Scroll Container */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
