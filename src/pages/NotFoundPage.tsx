import React from 'react';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-8 text-center shadow-xs py-16">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-500 mb-4">
        <HelpCircle className="h-7 w-7" />
      </div>
      <h2 className="text-xl font-semibold text-slate-900">Page Not Found</h2>
      <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-sm">
        The requested URL path does not exist in Performia.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#0078D4] px-4 py-2 text-xs font-medium text-white hover:bg-[#106EBE] transition shadow-xs"
      >
        <ArrowLeft className="h-4 w-4" />
        Return to Overview
      </Link>
    </div>
  );
};
