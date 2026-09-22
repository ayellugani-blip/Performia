import React from 'react';
import {
  TrendingUp,
  Target,
  MessageSquare,
  Award,
  Cpu,
  Sparkles,
  ArrowRight,
  FileSearch,
  Database,
  Zap,
} from 'lucide-react';

export const AiPipelineFlow: React.FC = () => {
  return (
    <div className="card-ai p-6 sm:p-7 shadow-lg transition-all duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-700/60">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Sparkles className="h-4 w-4 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              AI Reasoning Pipeline
            </h3>
            <span className="rounded-full bg-sky-500/15 border border-sky-400/30 px-2.5 py-0.5 text-[10px] font-semibold text-sky-300 uppercase tracking-wide">
              FastAPI Schema Ready
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-300 font-normal">
            Multi-dimensional telemetry synthesis flow powering PerformIQ Workforce Intelligence.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto rounded-lg bg-slate-900/80 px-3 py-1.5 border border-slate-700/80 text-[11px] text-slate-300 font-medium">
          <Zap className="h-3.5 w-3.5 text-amber-400" />
          <span>Endpoint: <code className="font-mono text-sky-300">/api/v1/insights/pipeline</code></span>
        </div>
      </div>

      {/* Visual Flow Diagram */}
      <div className="pt-6 pb-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* STEP 1: Data Sources Inputs (Performance + Goals + Feedback + Skills) */}
          <div className="lg:col-span-4 rounded-xl bg-slate-900/70 border border-slate-800 p-4 shadow-inner">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5 text-slate-400" /> 1. Core Data Telemetry
              </span>
              <span className="text-[10px] text-sky-400 font-mono">4 Inputs</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Performance */}
              <div className="flex items-center gap-2 rounded-lg bg-slate-800/80 border border-slate-700/70 px-2.5 py-2 text-xs font-semibold text-slate-200">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-blue-500/20 text-blue-400">
                  <TrendingUp className="h-3.5 w-3.5" />
                </div>
                <span>Performance</span>
              </div>

              {/* Goals */}
              <div className="flex items-center gap-2 rounded-lg bg-slate-800/80 border border-slate-700/70 px-2.5 py-2 text-xs font-semibold text-slate-200">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-emerald-500/20 text-emerald-400">
                  <Target className="h-3.5 w-3.5" />
                </div>
                <span>Goals</span>
              </div>

              {/* Feedback */}
              <div className="flex items-center gap-2 rounded-lg bg-slate-800/80 border border-slate-700/70 px-2.5 py-2 text-xs font-semibold text-slate-200">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-purple-500/20 text-purple-400">
                  <MessageSquare className="h-3.5 w-3.5" />
                </div>
                <span>Feedback</span>
              </div>

              {/* Skills */}
              <div className="flex items-center gap-2 rounded-lg bg-slate-800/80 border border-slate-700/70 px-2.5 py-2 text-xs font-semibold text-slate-200">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-amber-500/20 text-amber-400">
                  <Award className="h-3.5 w-3.5" />
                </div>
                <span>Skills</span>
              </div>
            </div>
          </div>

          {/* ARROW 1 */}
          <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 border border-sky-500/40 text-sky-400 shadow-md">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>

          {/* STEP 2: AI Analysis Engine */}
          <div className="lg:col-span-3 rounded-xl bg-gradient-to-b from-sky-950/80 to-slate-900/90 border border-sky-500/40 p-4 relative shadow-lg">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-sky-600 px-3 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white shadow-xs">
              Synthesizer
            </div>

            <div className="flex flex-col items-center text-center pt-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/40 shadow-inner mb-2">
                <Cpu className="h-6 w-6 animate-pulse" />
              </div>
              <h4 className="text-sm font-bold text-white tracking-tight">
                AI Analysis
              </h4>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Pattern Recognition & Risk Correlation
              </p>
              <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-slate-950/70 px-2.5 py-0.5 text-[10px] text-sky-300 border border-sky-900">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>PerformIQ Engine v2.4</span>
              </div>
            </div>
          </div>

          {/* ARROW 2 */}
          <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 border border-sky-500/40 text-sky-400 shadow-md">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>

          {/* STEP 3: Structured Output Artifacts */}
          <div className="lg:col-span-3 rounded-xl bg-slate-900/70 border border-slate-800 p-4 shadow-inner">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" /> 3. Intelligence Output
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Structured</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-lg bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 text-xs font-semibold text-white">
                <span className="text-slate-300">1. Insight</span>
                <span className="rounded bg-sky-500/20 text-sky-300 text-[10px] px-1.5 py-0.5 font-mono">Signal</span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 text-xs font-semibold text-white">
                <span className="text-slate-300">2. Evidence</span>
                <span className="rounded bg-purple-500/20 text-purple-300 text-[10px] px-1.5 py-0.5 font-mono">Proof</span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 text-xs font-semibold text-white">
                <span className="text-slate-300">3. Recommendation</span>
                <span className="rounded bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.5 font-mono">Action</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Disclaimer Banner */}
      <div className="mt-4 flex items-center gap-2 rounded-lg bg-slate-900/60 border border-slate-800 px-3.5 py-2 text-[11px] text-slate-300">
        <FileSearch className="h-4 w-4 text-sky-400 shrink-0" />
        <span>
          <strong className="text-white font-semibold">FastAPI Ready Presentation Layer:</strong> These intelligence pipeline values will automatically update dynamically once connected to the PerformIQ FastAPI AI backend.
        </span>
      </div>
    </div>
  );
};
