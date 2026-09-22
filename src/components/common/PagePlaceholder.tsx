import React from 'react';
import { Link } from 'react-router-dom';
import { type LucideIcon, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface PagePlaceholderProps {
  title: string;
  subtitle: string;
  badge?: string;
  icon: LucideIcon;
  breadcrumbs?: BreadcrumbItem[];
  children?: React.ReactNode;
}

export const PagePlaceholder: React.FC<PagePlaceholderProps> = ({
  title,
  subtitle,
  badge,
  icon: Icon,
  breadcrumbs = [{ label: 'Performia', to: '/' }],
  children,
}) => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb & Meta */}
      <div className="space-y-1">
        <nav className="flex items-center text-xs text-slate-500 gap-1.5" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <ChevronRight className="h-3 w-3 text-slate-400" />}
              {crumb.to ? (
                <Link
                  to={crumb.to}
                  className="hover:text-slate-800 transition hover:underline"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-medium text-slate-700">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-semibold text-slate-900 tracking-tight sm:text-2xl">
                {title}
              </h2>
              {badge && (
                <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-[#0078D4] border border-blue-200/70">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{subtitle}</p>
          </div>

          {/* Enterprise Action Pill Placeholders */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50 transition"
            >
              Export
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md bg-[#0078D4] px-3.5 py-1.5 text-xs font-medium text-white shadow-xs hover:bg-[#106EBE] transition"
            >
              Action
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Card Container */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col items-center justify-center text-center py-10 px-4 max-w-md mx-auto">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-[#0078D4] border border-blue-100 shadow-2xs mb-4">
            <Icon className="h-7 w-7" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">{title} Module</h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
            This section represents the <span className="font-medium text-slate-700">{title}</span> workspace in Performia. Application shell and routing are configured.
          </p>
          {children}
        </div>
      </div>
    </div>
  );
};
