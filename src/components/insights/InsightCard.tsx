import React from 'react';
import {
  BrainCircuit,
  FileText,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Building2,
  Calendar,
  ChevronRight,
} from 'lucide-react';
import type { AiInsight, PriorityLevel } from '../../types/insights';

interface InsightCardProps {
  insight: AiInsight;
  onViewDetails: (insight: AiInsight) => void;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  insight,
  onViewDetails,
}) => {
  // Render badge based on priority level
  const renderPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case 'High':
        return (
          <span className="badge-high flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
            High Priority
          </span>
        );
      case 'Medium':
        return (
          <span className="badge-medium flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
            Medium Priority
          </span>
        );
      case 'Low':
        return (
          <span className="badge-low flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            Low Priority
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="card-elevated flex flex-col justify-between overflow-hidden transition-all duration-200 hover:shadow-lg border border-slate-200/90 bg-white">
      {/* ── CARD HEADER ─────────────────────────────────────────────────── */}
      <div className="p-5 pb-4 border-b border-slate-100 bg-slate-50/40">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-[#0078D4] border border-blue-100">
              <Building2 className="h-3 w-3" />
              {insight.department}
            </span>
            <span className="text-xs text-slate-400 font-normal">•</span>
            <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
              <Calendar className="h-3 w-3 text-slate-400" />
              {insight.date}
            </span>
          </div>

          {renderPriorityBadge(insight.priority)}
        </div>

        {/* 1. STAGE: AI Insight Header Statement */}
        <div className="flex items-start gap-2.5 mt-1">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EFF6FC] text-[#0078D4] border border-blue-100 mt-0.5">
            <BrainCircuit className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#0078D4] uppercase tracking-wider block">
              AI Insight
            </span>
            <h4 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
              {insight.insight}
            </h4>
          </div>
        </div>
      </div>

      {/* ── CARD BODY: STAGES 2 to 5 ────────────────────────────────────── */}
      <div className="p-5 space-y-4 flex-1 text-xs">
        
        {/* 2. Supporting Evidence */}
        <div className="rounded-lg bg-slate-50 p-3 border border-slate-200/60">
          <div className="flex items-center gap-1.5 mb-1 text-slate-500 font-bold text-[11px] uppercase tracking-wide">
            <FileText className="h-3.5 w-3.5 text-blue-600" />
            <span>Supporting Evidence</span>
          </div>
          <p className="text-slate-700 font-normal leading-relaxed italic">
            "{insight.evidence}"
          </p>
        </div>

        {/* 3. Reason */}
        <div>
          <div className="flex items-center gap-1.5 mb-1 text-slate-500 font-bold text-[11px] uppercase tracking-wide">
            <HelpCircle className="h-3.5 w-3.5 text-amber-600" />
            <span>Reason</span>
          </div>
          <p className="text-slate-700 leading-relaxed font-medium">
            {insight.reason}
          </p>
        </div>

        {/* 4. Impact */}
        <div>
          <div className="flex items-center gap-1.5 mb-1 text-slate-500 font-bold text-[11px] uppercase tracking-wide">
            <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
            <span>Impact</span>
          </div>
          <p className="text-slate-700 leading-relaxed font-medium">
            {insight.impact}
          </p>
        </div>

        {/* 5. Recommended Action */}
        <div className="rounded-lg bg-emerald-50/60 p-3 border border-emerald-100">
          <div className="flex items-center gap-1.5 mb-1 text-emerald-800 font-bold text-[11px] uppercase tracking-wide">
            <Lightbulb className="h-3.5 w-3.5 text-emerald-600" />
            <span>Recommended Action</span>
          </div>
          <p className="text-emerald-950 font-semibold leading-relaxed">
            {insight.recommendedAction}
          </p>
        </div>

      </div>

      {/* ── CARD FOOTER ─────────────────────────────────────────────────── */}
      <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between">
        {/* Affected Employees Avatar Stack */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5 overflow-hidden">
            {insight.affectedEmployees.slice(0, 3).map((emp) => (
              <div
                key={emp.id}
                title={`${emp.name} (${emp.role})`}
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${emp.color} text-[10px] font-bold text-white ring-2 ring-white`}
              >
                {emp.initials}
              </div>
            ))}
            {insight.affectedEmployees.length > 3 && (
              <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600 ring-2 ring-white">
                +{insight.affectedEmployees.length - 3}
              </div>
            )}
          </div>
          <span className="text-[11px] font-semibold text-slate-600">
            {insight.affectedCount} employees affected
          </span>
        </div>

        {/* View Details Button */}
        <button
          type="button"
          onClick={() => onViewDetails(insight)}
          className="inline-flex items-center gap-1 rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-[#0078D4] border border-blue-200 shadow-2xs hover:bg-[#EFF6FC] hover:border-blue-300 transition-all cursor-pointer group"
        >
          <span>View Details</span>
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};
