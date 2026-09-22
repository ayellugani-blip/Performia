import React, { useState } from 'react';
import {
  X,
  BrainCircuit,
  FileText,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Building2,
  Calendar,
  Users,
  Code,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { AiInsight } from '../../types/insights';

interface InsightDetailModalProps {
  insight: AiInsight | null;
  onClose: () => void;
}

export const InsightDetailModal: React.FC<InsightDetailModalProps> = ({
  insight,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'fastapi'>('details');

  if (!insight) return null;

  // Generate FastAPI JSON preview representation
  const fastApiJsonPayload = {
    insight_id: insight.id,
    timestamp: insight.timestamp,
    department: insight.department,
    category: insight.category,
    priority: insight.priority.toLowerCase(),
    status: insight.status.toLowerCase().replace(' ', '_'),
    confidence_score: insight.confidenceScore / 100,
    model_version: insight.modelSource || 'PerformIQ-FastAPI-v2.4',
    telemetry_payload: {
      insight: insight.insight,
      evidence: insight.evidence,
      reason: insight.reason,
      impact: insight.impact,
      recommended_action: insight.recommendedAction,
    },
    affected_employees: insight.affectedEmployees.map((e) => ({
      employee_id: e.id,
      name: e.name,
      role: e.role,
      department: e.department,
    })),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      {/* Modal Card Container */}
      <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FC] text-[#0078D4] border border-blue-200 shadow-2xs">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#0078D4] uppercase tracking-wider">
                  PerformIQ AI Insight Detail
                </span>
                <span className="rounded-full bg-slate-200 px-2 py-0.2 text-[10px] font-semibold text-slate-700">
                  {insight.id}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {insight.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Switcher: View Details vs FastAPI JSON Schema */}
        <div className="flex border-b border-slate-200 bg-slate-100/60 px-6 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'details'
                ? 'border-[#0078D4] text-[#0078D4] bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Structured Intelligence</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('fastapi')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'fastapi'
                ? 'border-[#0078D4] text-[#0078D4] bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            <span>FastAPI Payload Preview</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {activeTab === 'details' ? (
            <>
              {/* Meta Tags Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-200/70">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Department</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Building2 className="h-3.5 w-3.5 text-[#0078D4]" />
                    {insight.department}
                  </span>
                </div>

                <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-200/70">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Priority</span>
                  <span className={`font-bold mt-0.5 inline-block ${
                    insight.priority === 'High' ? 'text-red-600' : insight.priority === 'Medium' ? 'text-amber-600' : 'text-emerald-600'
                  }`}>
                    {insight.priority} Priority
                  </span>
                </div>

                <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-200/70">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Confidence Score</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    {insight.confidenceScore}% Model Certainty
                  </span>
                </div>

                <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-200/70">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Generated</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    {insight.date}
                  </span>
                </div>
              </div>

              {/* 5-Step Telemetry Breakdown */}
              <div className="space-y-4">
                {/* 1. AI Insight */}
                <div className="rounded-xl border border-blue-200/80 bg-blue-50/40 p-4">
                  <span className="text-[10px] font-bold text-[#0078D4] uppercase tracking-wider block mb-1">
                    1. AI Insight Signal
                  </span>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    "{insight.insight}"
                  </h4>
                </div>

                {/* 2. Supporting Evidence */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-1.5 text-slate-600 font-bold text-xs uppercase tracking-wide mb-1">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span>2. Supporting Evidence</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{insight.evidence}"
                  </p>
                </div>

                {/* 3. Reason */}
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-1.5 text-slate-600 font-bold text-xs uppercase tracking-wide mb-1">
                    <HelpCircle className="h-4 w-4 text-amber-600" />
                    <span>3. Root Cause Analysis (Reason)</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {insight.reason}
                  </p>
                </div>

                {/* 4. Impact */}
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-1.5 text-slate-600 font-bold text-xs uppercase tracking-wide mb-1">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span>4. Business & Delivery Impact</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {insight.impact}
                  </p>
                </div>

                {/* 5. Recommended Action */}
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
                  <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs uppercase tracking-wide mb-1">
                    <Lightbulb className="h-4 w-4 text-emerald-600" />
                    <span>5. Recommended Managerial Action</span>
                  </div>
                  <p className="text-xs text-emerald-950 font-semibold leading-relaxed">
                    {insight.recommendedAction}
                  </p>
                </div>
              </div>

              {/* Affected Employees Section */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-[#0078D4]" />
                    Affected Employees ({insight.affectedEmployees.length})
                  </h4>
                  <span className="text-[11px] text-slate-500">Click to view employee profile</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {insight.affectedEmployees.map((emp) => (
                    <Link
                      key={emp.id}
                      to={`/employees/${emp.id}`}
                      onClick={onClose}
                      className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2.5 hover:border-blue-300 hover:bg-blue-50/30 transition-all group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${emp.color} text-xs font-bold text-white shadow-2xs`}>
                          {emp.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 group-hover:text-[#0078D4] truncate">
                            {emp.name}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            {emp.role}
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0078D4] shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* FastAPI JSON Payload Tab */
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-slate-900 px-4 py-3 text-xs text-slate-300 border border-slate-800">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-sky-400" />
                  <span className="font-semibold text-white">FastAPI Response Contract</span>
                </div>
                <span className="font-mono text-[11px] text-emerald-400">HTTP 200 OK</span>
              </div>

              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-sky-300 overflow-x-auto shadow-inner">
                <pre>{JSON.stringify(fastApiJsonPayload, null, 2)}</pre>
              </div>

              <p className="text-xs text-slate-500 italic">
                Note: Once backend integration completes, the frontend will map this JSON schema directly to the component props above.
              </p>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50/80">
          <span className="text-xs text-slate-500">
            Source: {insight.modelSource || 'FastAPI PerformIQ Engine'}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                alert(`Insight signal ${insight.id} marked as acknowledged!`);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0078D4] px-4 py-2 text-xs font-semibold text-white hover:bg-[#106ebe] transition-colors shadow-2xs cursor-pointer"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Acknowledge Signal</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
