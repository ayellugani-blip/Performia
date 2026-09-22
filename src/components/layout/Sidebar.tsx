import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Award,
  CalendarCheck,
  BrainCircuit,
  Settings,
  X,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  exact?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Overview', to: '/', icon: LayoutDashboard, exact: true },
  { label: 'Employees', to: '/employees', icon: Users },
  { label: 'Performance', to: '/performance', icon: TrendingUp },
  { label: 'Skills', to: '/skills', icon: Award },
  { label: 'Interviews', to: '/interviews', icon: CalendarCheck },
  { label: 'Insights', to: '/insights', icon: BrainCircuit, badge: 'AI' },
  { label: 'Settings', to: '/settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [shimmerPath, setShimmerPath] = React.useState<string | null>(null);

  const handleNavClick = (to: string) => {
    // Trigger quick 700ms blue/white shimmer sweep on selected nav item
    setShimmerPath(to);
    setTimeout(() => {
      setShimmerPath(null);
    }, 700);

    // Close sidebar on mobile upon navigation
    if (window.innerWidth < 1024) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white border-r border-slate-200 transition-transform duration-200 ease-in-out lg:static lg:h-full lg:shrink-0 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            {/* Performia / PerformIQ Azure Styled Logo Mark */}
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0078D4] text-white shadow-xs">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-base text-slate-900 tracking-tight">
                  Performia
                </span>
                <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-[#0078D4] border border-blue-200/60">
                  PerformIQ
                </span>
              </div>
              <p className="text-[11px] font-normal text-slate-500 tracking-normal">
                AI Performance Intelligence
              </p>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Platform Navigation
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  onClick={() => handleNavClick(item.to)}
                  className={({ isActive }) =>
                    `relative overflow-hidden group flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-[#EFF6FC] text-[#0078D4] border-l-4 border-[#0078D4] pl-2 font-semibold shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-l-4 border-transparent pl-2'
                    }`
                  }
                >
                  {/* Premium Blue/White Gradient Shimmer Overlay */}
                  {shimmerPath === item.to && (
                    <span className="nav-shimmer-effect" />
                  )}

                  <div className="relative z-10 flex items-center gap-3">
                    <Icon className="h-4.5 w-4.5 shrink-0 transition-colors" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="relative z-10 rounded bg-[#0078D4] px-1.5 py-0.2 text-[10px] font-semibold tracking-wide text-white uppercase shadow-2xs">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Enterprise Organization Footer */}
        <div className="border-t border-slate-200/80 p-3.5 bg-slate-50/50">
          <div className="flex items-center justify-between rounded-lg border border-slate-200/70 bg-white p-2.5 shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-700">
                <ShieldCheck className="h-4 w-4 text-[#0078D4]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-slate-900">Contoso Global</p>
                <p className="truncate text-[11px] text-slate-500">Enterprise AI Plan</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
          </div>
        </div>
      </aside>
    </>
  );
};
