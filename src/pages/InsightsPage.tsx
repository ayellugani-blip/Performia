import React, { useState } from 'react';
import {
  BrainCircuit,
  AlertTriangle,
  Users,
  CheckCircle2,
  Sparkles,
  Filter,
  RefreshCw,
  Zap,
  Info,
} from 'lucide-react';
import { mockKpiCards, mockPriorityInsights, mockTimelineInsights } from '../data/mockInsights';
import type { AiInsight } from '../types/insights';
import { AiPipelineFlow } from '../components/insights/AiPipelineFlow';
import { InsightCard } from '../components/insights/InsightCard';
import { InsightsTimeline } from '../components/insights/InsightsTimeline';
import { InsightDetailModal } from '../components/insights/InsightDetailModal';

export const InsightsPage: React.FC = () => {
  const [departmentFilter, setDepartmentFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [selectedInsight, setSelectedInsight] = useState<AiInsight | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Filter insights based on user selections
  const filteredInsights = mockPriorityInsights.filter((insight) => {
    const matchDept = departmentFilter === 'All' || insight.department === departmentFilter;
    const matchPriority = priorityFilter === 'All' || insight.priority === priorityFilter;
    return matchDept && matchPriority;
  });

  // Handle mock refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // Map icon name string to icon component for KPI cards
  const renderKpiIcon = (iconName: string) => {
    switch (iconName) {
      case 'BrainCircuit':
        return BrainCircuit;
      case 'AlertTriangle':
        return AlertTriangle;
      case 'Users':
        return Users;
      case 'CheckCircle2':
        return CheckCircle2;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="space-y-7 pb-12 animate-fadeIn">
      {/* ── 1. PAGE HEADER & ACTIONS ───────────────────────────────────────── */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0078D4] mb-1">
            <span>Performia</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600">AI Workforce Insights</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight sm:text-3xl">
              AI Workforce Insights
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#EFF6FC] px-2.5 py-0.5 text-xs font-bold text-[#0078D4] border border-blue-200 shadow-2xs">
              <Sparkles className="h-3.5 w-3.5" />
              PerformIQ AI
            </span>
          </div>

          {/* Prompt Subtitle requirement */}
          <p className="mt-1 text-sm text-slate-500 font-normal leading-relaxed">
            AI-generated intelligence from performance, goals, feedback and skills.
          </p>
        </div>

        {/* Top Header Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Department Filter */}
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-500">Dept:</span>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Product & Design">Product & Design</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Sales & Marketing">Sales & Marketing</option>
              <option value="Quality Assurance">Quality Assurance</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs">
            <span className="text-slate-500">Priority:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Refresh AI Analysis Button */}
          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0078D4] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#106ebe] transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh AI Analysis</span>
          </button>
        </div>
      </div>

      {/* Backend Integration Readiness Banner */}
      <div className="rounded-xl bg-slate-900 text-white p-3.5 px-4 shadow-sm border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <span className="font-bold text-white">FastAPI Presentation Layer Ready</span>
            <span className="mx-2 text-slate-500">•</span>
            <span className="text-slate-300">
              Mock presentation data bound to structured schema. Ready for live FastAPI inference payloads.
            </span>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 rounded bg-slate-800 px-2.5 py-1 text-[11px] font-mono text-sky-300 border border-slate-700 self-start sm:self-auto">
          GET /api/v1/insights
        </span>
      </div>

      {/* ── 2. KPI CARDS SECTION ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {mockKpiCards.map((card) => {
          const IconComponent = renderKpiIcon(card.iconName);
          return (
            <div
              key={card.id}
              className="card-elevated p-5 transition-all hover:translate-y-[-2px] hover:shadow-md cursor-default select-none"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBgClass}`}>
                  <IconComponent className={`h-5 w-5 ${card.iconColorClass}`} />
                </div>

                {card.badgeText && (
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    card.id === 'high-priority'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-blue-50 text-[#0078D4] border border-blue-200'
                  }`}>
                    {card.badgeText}
                  </span>
                )}
              </div>

              {/* Value & Label */}
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {card.label}
                </p>
                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                  {card.value}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {card.changeLabel}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 3. AI REASONING PIPELINE FLOW ──────────────────────────────────── */}
      <section>
        <AiPipelineFlow />
      </section>

      {/* ── 4. PRIORITY AI INSIGHTS CARDS ───────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-[#0078D4]" />
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Priority AI Insights
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Structured intelligence cards detailing 5-stage synthesis: Insight, Evidence, Reason, Impact, and Action.
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-500">
            Showing {filteredInsights.length} of {mockPriorityInsights.length} priority insights
          </span>
        </div>

        {/* Insight Cards Grid */}
        {filteredInsights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredInsights.map((insight) => (
              <InsightCard
                key={insight.id}
                insight={insight}
                onViewDetails={(ins) => setSelectedInsight(ins)}
              />
            ))}
          </div>
        ) : (
          <div className="card-elevated p-8 text-center bg-white">
            <Info className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">No Insights Found</h3>
            <p className="text-xs text-slate-500 mt-1">
              No priority insights match the selected filter criteria. Try resetting department or priority filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setDepartmentFilter('All');
                setPriorityFilter('All');
              }}
              className="mt-3 inline-flex items-center gap-1 rounded-md bg-[#EFF6FC] px-3 py-1.5 text-xs font-semibold text-[#0078D4] border border-blue-200"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* ── 5. RECENT AI INSIGHTS TIMELINE ─────────────────────────────────── */}
      <section className="space-y-4">
        <InsightsTimeline
          items={mockTimelineInsights}
          allInsights={mockPriorityInsights}
          onSelectInsight={(ins) => setSelectedInsight(ins)}
        />
      </section>

      {/* ── 6. DETAIL MODAL ────────────────────────────────────────────────── */}
      {selectedInsight && (
        <InsightDetailModal
          insight={selectedInsight}
          onClose={() => setSelectedInsight(null)}
        />
      )}
    </div>
  );
};

export default InsightsPage;
