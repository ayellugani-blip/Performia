import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  Sparkles,
  Command,
  CheckCircle2,
} from 'lucide-react';
import { currentUser } from '../../data/currentUser';

import { ThemeSwitcher } from '../common/ThemeSwitcher';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Cmd+K / Ctrl+K keyboard shortcut listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      navigate(`/employees?search=${encodeURIComponent(globalSearch.trim())}`);
    }
  };

  // Derive dynamic page title and subtitle from pathname
  const getPageInfo = () => {
    const path = location.pathname;

    if (path === '/') {
      return {
        title: 'Executive Overview',
        category: 'Intelligence Dashboard',
      };
    }
    if (path === '/employees') {
      return {
        title: 'Employees Directory',
        category: 'Workforce Management',
      };
    }
    if (path.startsWith('/employees/')) {
      const empId = path.split('/')[2] || '';
      return {
        title: `Employee Profile ${empId ? `· ${empId}` : ''}`,
        category: 'Workforce Profile',
      };
    }
    if (path === '/performance') {
      return {
        title: 'Performance Reviews & OKRs',
        category: 'Evaluation & Benchmarks',
      };
    }
    if (path === '/skills') {
      return {
        title: 'Skills Matrix & Taxonomy',
        category: 'Competency Analysis',
      };
    }
    if (path === '/interviews') {
      return {
        title: '1-on-1s & Interview Intelligence',
        category: 'Continuous Feedback',
      };
    }
    if (path === '/insights') {
      return {
        title: 'PerformIQ AI Insights',
        category: 'Predictive Analytics',
      };
    }
    if (path === '/settings') {
      return {
        title: 'Platform & Enterprise Settings',
        category: 'Administration',
      };
    }

    return {
      title: 'Page Not Found',
      category: 'Performia',
    };
  };

  const { title, category } = getPageInfo();

  return (
    <header className="shrink-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      {/* Left side: Hamburger button + Dynamic Page Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="hidden text-[11px] font-semibold uppercase tracking-wider text-slate-400 sm:inline">
              {category}
            </span>
          </div>
          <h1 className="text-base sm:text-lg font-semibold text-slate-900 tracking-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Right side: Global Search + Notifications + Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Global Search Box (Microsoft/Azure style) */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-64 lg:w-80">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search employees, reviews, skills..."
            className="w-full rounded-md border border-slate-200 bg-slate-50/70 py-1.5 pl-9 pr-12 text-xs text-slate-800 placeholder-slate-400 transition focus:border-[#0078D4] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0078D4]"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
            <kbd className="inline-flex items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 shadow-2xs">
              <Command className="h-2.5 w-2.5" /> K
            </kbd>
          </div>
        </form>

        {/* Search icon trigger for mobile screens */}
        <button
          type="button"
          onClick={() => navigate('/employees')}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 md:hidden"
          aria-label="Search"
        >
          <Search className="h-4.5 w-4.5" />
        </button>

        {/* Theme Switcher (Light, Dark, Mix) */}
        <div className="hidden sm:block">
          <ThemeSwitcher />
        </div>

        {/* Notifications Popover Trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200/80 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0078D4]/20"
            aria-label="Notifications"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute 1.5 top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#0078D4] ring-2 ring-white" />
          </button>

          {/* Simple notification dropdown preview */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-lg border border-slate-200 bg-white p-3 shadow-lg z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-semibold text-slate-900">Notifications</span>
                <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-[#0078D4]">
                  2 unread
                </span>
              </div>
              <div className="mt-2 space-y-2 text-xs">
                <div className="flex items-start gap-2.5 rounded-md p-2 hover:bg-slate-50 transition">
                  <Sparkles className="h-4 w-4 mt-0.5 text-[#0078D4] shrink-0" />
                  <div>
                    <p className="font-medium text-slate-800">New AI Insight Ready</p>
                    <p className="text-[11px] text-slate-500">Q3 Engineering retention prediction updated.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 rounded-md p-2 hover:bg-slate-50 transition">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-medium text-slate-800">Review Cycle Completed</p>
                    <p className="text-[11px] text-slate-500">Product Design cycle finished with 98% sign-off.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* User Profile Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 rounded-lg border border-slate-200/80 bg-white p-1 sm:px-2.5 sm:py-1.5 hover:bg-slate-50 transition focus:outline-none focus:ring-2 focus:ring-[#0078D4]/20 cursor-pointer"
          >
            {/* Avatar with Azure Style Status Badge */}
            <div className="relative">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full ${currentUser.avatarColor} text-xs font-semibold text-white`}>
                {currentUser.initials}
              </div>
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            {/* Profile Info */}
            <div className="hidden text-left sm:block">
              <p className="text-xs font-semibold text-slate-900 leading-tight">{currentUser.name}</p>
              <p className="text-[11px] text-slate-500 leading-none">{currentUser.role}</p>
            </div>

            <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 sm:block" />
          </button>

          {/* Simple Profile Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 bg-white py-1 shadow-lg z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="border-b border-slate-100 px-3 py-2">
                <p className="text-xs font-semibold text-slate-900">{currentUser.name}</p>
                <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                <div className="mt-1.5 inline-flex items-center rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-700">
                  {currentUser.role} &bull; Global
                </div>
              </div>
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/settings');
                  }}
                  className="w-full px-3 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Account Profile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/settings');
                  }}
                  className="w-full px-3 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Notification Preferences
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/settings');
                  }}
                  className="w-full px-3 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Organization Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
