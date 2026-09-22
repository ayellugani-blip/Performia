import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle,
  Layers,
  Sparkles,
  ArrowRight,
  BarChart2,
  Minus,
  ChevronRight,
  Clock,
  BookOpen,
  Calendar,
  Lightbulb,
  Users,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface KpiCard {
  id: string;
  label: string;
  value: string;
  delta?: string;
  deltaDirection?: 'up' | 'down' | 'neutral';
  deltaLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  suffix?: string;
  isAlert?: boolean;
}

interface EmployeeRow {
  id: string;
  name: string;
  initials: string;
  role: string;
  department: string;
  performance: number;
  trend: 'declining' | 'slight-decline' | 'stable' | 'improving';
  goalCompletion: number;
  aiSignal: string;
  color: string;
}

interface AiRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  icon: React.ComponentType<{ className?: string }>;
  affectedCount: number;
}

interface QuarterDataPoint {
  quarter: string;
  value: number;
  label: string;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const kpiCards: KpiCard[] = [
  {
    id: 'team-performance',
    label: 'Team Performance',
    value: '82',
    suffix: '%',
    delta: '+4.8%',
    deltaDirection: 'up',
    deltaLabel: 'vs prev. quarter',
    icon: TrendingUp,
    iconBg: 'bg-blue-50',
    iconColor: 'text-[#0078D4]',
  },
  {
    id: 'goal-completion',
    label: 'Goal Completion',
    value: '78',
    suffix: '%',
    delta: '+6.2%',
    deltaDirection: 'up',
    deltaLabel: 'vs prev. quarter',
    icon: Target,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'at-risk',
    label: 'Employees At Risk',
    value: '4',
    isAlert: true,
    deltaLabel: 'Need immediate attention',
    icon: AlertTriangle,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    id: 'skill-coverage',
    label: 'Skill Coverage',
    value: '74',
    suffix: '%',
    deltaLabel: 'of required competencies',
    icon: Layers,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
];

const quarterlyData: QuarterDataPoint[] = [
  { quarter: 'Q1', value: 68, label: '68%' },
  { quarter: 'Q2', value: 74, label: '74%' },
  { quarter: 'Q3', value: 79, label: '79%' },
  { quarter: 'Q4', value: 82, label: '82%' },
];

const employees: EmployeeRow[] = [
  {
    id: 'EMP-1001',
    name: 'Anudeep',
    initials: 'AN',
    role: 'Senior Software Engineer',
    department: 'Engineering',
    performance: 69,
    trend: 'declining',
    goalCompletion: 64,
    aiSignal: 'Deadline consistency',
    color: '#dc2626',
  },
  {
    id: 'EMP-1002',
    name: 'Eleven',
    initials: 'EL',
    role: 'Software Engineer',
    department: 'Engineering',
    performance: 72,
    trend: 'declining',
    goalCompletion: 68,
    aiSignal: 'Delivery trend',
    color: '#ea580c',
  },
  {
    id: 'EMP-1003',
    name: 'Walter White',
    initials: 'WW',
    role: 'Data Scientist',
    department: 'Analytics',
    performance: 76,
    trend: 'declining',
    goalCompletion: 71,
    aiSignal: 'Production delivery',
    color: '#d97706',
  },
  {
    id: 'EMP-1004',
    name: 'Indiana Jones',
    initials: 'IJ',
    role: 'Operations Coordinator',
    department: 'Operations',
    performance: 78,
    trend: 'slight-decline',
    goalCompletion: 73,
    aiSignal: 'Goal execution',
    color: '#ca8a04',
  },
  {
    id: 'EMP-1005',
    name: 'Hermione Granger',
    initials: 'HG',
    role: 'ML Engineer',
    department: 'AI/ML',
    performance: 80,
    trend: 'slight-decline',
    goalCompletion: 75,
    aiSignal: 'Due-date consistency',
    color: '#7c3aed',
  },
];

const recommendations: AiRecommendation[] = [
  {
    id: 'r1',
    title: 'Project Planning Support',
    description: 'Assign structured sprint planning tools to 3 engineers with recurring deadline misses.',
    priority: 'High',
    icon: BarChart2,
    affectedCount: 3,
  },
  {
    id: 'r2',
    title: 'Deadline Management',
    description: 'Initiate 1-on-1 coaching sessions for employees with declining delivery patterns.',
    priority: 'High',
    icon: Clock,
    affectedCount: 2,
  },
  {
    id: 'r3',
    title: 'Skill Development',
    description: 'Bridge identified skill gaps in production systems and data engineering pipelines.',
    priority: 'Medium',
    icon: BookOpen,
    affectedCount: 5,
  },
  {
    id: 'r4',
    title: '30-Day Follow-up',
    description: 'Schedule structured performance follow-ups to track recovery and goal realignment.',
    priority: 'Medium',
    icon: Calendar,
    affectedCount: 4,
  },
];

// ─── Sub-Components ───────────────────────────────────────────────────────────

const TrendIcon: React.FC<{ trend: EmployeeRow['trend'] }> = ({ trend }) => {
  if (trend === 'declining') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-600">
        <TrendingDown className="h-3 w-3" /> Declining
      </span>
    );
  }
  if (trend === 'slight-decline') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600">
        <Minus className="h-3 w-3" /> Slight decline
      </span>
    );
  }
  if (trend === 'improving') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
        <TrendingUp className="h-3 w-3" /> Improving
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
      <Minus className="h-3 w-3" /> Stable
    </span>
  );
};

const PerformanceBar: React.FC<{ value: number; color: string }> = ({ value }) => {
  const bgColor =
    value < 70 ? '#fecaca' : value < 77 ? '#fed7aa' : '#bbf7d0';
  const fillColor =
    value < 70 ? '#dc2626' : value < 77 ? '#d97706' : '#16a34a';

  return (
    <div className="flex items-center gap-2.5 min-w-[100px]">
      <div className="flex-1 h-1.5 rounded-full" style={{ background: bgColor }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${value}%`, background: fillColor }}
        />
      </div>
      <span className="text-[11px] font-semibold tabular-nums" style={{ color: fillColor }}>
        {value}%
      </span>
    </div>
  );
};

const PriorityBadge: React.FC<{ priority: AiRecommendation['priority'] }> = ({ priority }) => {
  if (priority === 'High') return <span className="badge-high">{priority}</span>;
  if (priority === 'Medium') return <span className="badge-medium">{priority}</span>;
  return <span className="badge-low">{priority}</span>;
};

// Simple SVG sparkline-style bar chart (no external library)
const PerformanceTrendChart: React.FC = () => {
  const maxVal = 100;
  const chartH = 100; // px height of bars area

  return (
    <div className="flex items-end justify-between gap-3 px-2 py-1" style={{ height: 130 }}>
      {quarterlyData.map((point, i) => {
        const barH = Math.round((point.value / maxVal) * chartH);
        const isCurrent = i === quarterlyData.length - 1;

        return (
          <div key={point.quarter} className="flex flex-col items-center gap-2 flex-1">
            {/* Value label */}
            <span
              className={`text-xs font-bold tabular-nums ${
                isCurrent ? 'text-[#0078D4]' : 'text-slate-500'
              }`}
            >
              {point.label}
            </span>

            {/* Bar */}
            <div
              className="relative w-full rounded-t-md transition-all duration-500"
              style={{
                height: barH,
                background: isCurrent
                  ? 'linear-gradient(180deg, #0078D4 0%, #2b88d8 100%)'
                  : i === quarterlyData.length - 2
                  ? '#93c5fd'
                  : '#cbd5e1',
                boxShadow: isCurrent
                  ? '0 2px 8px rgba(0,120,212,0.25)'
                  : 'none',
              }}
            >
              {isCurrent && (
                <div
                  className="absolute inset-x-0 top-0 h-0.5 rounded-t"
                  style={{ background: 'rgba(255,255,255,0.4)' }}
                />
              )}
            </div>

            {/* Quarter label */}
            <span
              className={`text-[11px] font-semibold uppercase tracking-wide ${
                isCurrent ? 'text-[#0078D4]' : 'text-slate-400'
              }`}
            >
              {point.quarter}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ─── Main OverviewPage ────────────────────────────────────────────────────────

export const OverviewPage: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-7 animate-fadeIn">

      {/* ── 1. Welcome Section ──────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-2.5 py-1 text-[11px] font-semibold text-[#0078D4] tracking-wide">
              <Sparkles className="h-3 w-3" />
              Q4 2024 · Live View
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {greeting}, Alex <span className="wave" style={{ display: 'inline-block' }}>👋</span>
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-normal leading-relaxed">
            Here's your team's performance intelligence for this quarter.{' '}
            <span className="text-slate-700 font-medium">4 employees</span> require your attention.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            to="/employees"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <Users className="h-3.5 w-3.5" />
            View All Employees
          </Link>
          <Link
            to="/insights"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0078D4] px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#106EBE] transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            PerformIQ Insights
          </Link>
        </div>
      </div>

      {/* ── 2. KPI Cards Row ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          const isHovered = hoveredCard === card.id;

          return (
            <div
              key={card.id}
              className="card-elevated p-5 cursor-default select-none transition-all duration-200"
              style={{
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: isHovered
                  ? '0 4px 20px rgba(15,23,42,0.1), 0 1px 4px rgba(15,23,42,0.06), 0 0 0 1px rgba(15,23,42,0.03)'
                  : undefined,
              }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${card.iconBg}`}
                >
                  <Icon className={`h-4.5 w-4.5 ${card.iconColor}`} />
                </div>

                {card.delta && (
                  <span
                    className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      card.deltaDirection === 'up'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {card.deltaDirection === 'up' ? (
                      <TrendingUp className="h-2.5 w-2.5" />
                    ) : (
                      <TrendingDown className="h-2.5 w-2.5" />
                    )}
                    {card.delta}
                  </span>
                )}

                {card.isAlert && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 border border-amber-100">
                    <AlertTriangle className="h-2.5 w-2.5" />
                    Action needed
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-baseline gap-0.5">
                  <span
                    className={`text-3xl font-bold tabular-nums tracking-tight ${
                      card.isAlert ? 'text-amber-600' : 'text-slate-900'
                    }`}
                  >
                    {card.value}
                  </span>
                  {card.suffix && (
                    <span className="text-lg font-semibold text-slate-400">{card.suffix}</span>
                  )}
                </div>

                <p className="mt-1 text-xs font-semibold text-slate-700">{card.label}</p>

                {card.deltaLabel && (
                  <p className="mt-0.5 text-[11px] text-slate-400 font-normal">{card.deltaLabel}</p>
                )}
              </div>

              {/* Micro sparkline dots */}
              {card.suffix === '%' && (
                <div className="mt-3 flex items-center gap-1">
                  {[60, 65, 70, 75, parseInt(card.value)].map((_v, i) => (
                    <div
                      key={i}
                      className="flex-1 h-1 rounded-full"
                      style={{
                        background:
                          i === 4
                            ? card.iconColor === 'text-[#0078D4]'
                              ? '#0078D4'
                              : card.iconColor === 'text-emerald-600'
                              ? '#16a34a'
                              : '#7c3aed'
                            : '#e2e8f0',
                        opacity: 0.4 + i * 0.15,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── 3 + 4: AI Insight Card + Trend Chart (side by side on large screens) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* ── 3. AI Insight Card (spans 3/5) */}
        <div className="card-ai lg:col-span-3 p-6 relative">
          {/* Soft blue radial glow */}
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '220px',
              height: '220px',
              background: 'radial-gradient(circle, rgba(0,120,212,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="relative z-10">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: 'rgba(0,120,212,0.2)',
                    border: '1px solid rgba(0,120,212,0.3)',
                  }}
                >
                  <Sparkles className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: 'rgba(113,175,229,0.9)' }}
                    >
                      PerformIQ AI · Live Detection
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5 leading-snug">
                    3 employees show declining performance trends
                  </h3>
                </div>
              </div>
            </div>

            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: 'rgba(203,213,225,0.85)' }}
            >
              Performance decline is primarily associated with{' '}
              <span className="font-semibold text-white">reduced goal completion</span> and recurring{' '}
              <span className="font-semibold text-white">delivery-related feedback</span>. Early signals
              suggest intervention before end of quarter is strongly recommended.
            </p>

            {/* Signal tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {['Deadline consistency', 'Delivery trend', 'Production delivery'].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold"
                  style={{
                    background: 'rgba(0,120,212,0.2)',
                    color: '#93c5fd',
                    border: '1px solid rgba(0,120,212,0.3)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div
              className="my-5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            />

            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-white">3</p>
                  <p className="text-[11px]" style={{ color: 'rgba(203,213,225,0.7)' }}>
                    At risk
                  </p>
                </div>
                <div
                  className="h-8 w-px"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                />
                <div className="text-center">
                  <p className="text-xl font-bold text-white">2</p>
                  <p className="text-[11px]" style={{ color: 'rgba(203,213,225,0.7)' }}>
                    Slight decline
                  </p>
                </div>
                <div
                  className="h-8 w-px"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                />
                <div className="text-center">
                  <p className="text-xl font-bold text-white">Q4</p>
                  <p className="text-[11px]" style={{ color: 'rgba(203,213,225,0.7)' }}>
                    Cycle
                  </p>
                </div>
              </div>

              <Link
                to="/insights"
                className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold text-white transition-all"
                style={{
                  background: 'rgba(0,120,212,0.45)',
                  border: '1px solid rgba(0,120,212,0.5)',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = 'rgba(0,120,212,0.65)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = 'rgba(0,120,212,0.45)')
                }
              >
                Review Insights
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── 4. Team Performance Trend (spans 2/5) */}
        <div className="card-surface lg:col-span-2 p-5 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Team Performance Trend</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Quarterly progression · FY 2024</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
              <TrendingUp className="h-2.5 w-2.5" />
              +14pts YTD
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-end mt-3">
            <PerformanceTrendChart />
          </div>

          {/* Trend note */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#0078D4] shrink-0" />
            <p className="text-[11px] text-slate-500">
              Q4 is current quarter — 82% team performance, highest this year.
            </p>
          </div>
        </div>
      </div>

      {/* ── 5 + 6: Employees Requiring Attention + AI Recommendations ──────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* ── 5. Employees Requiring Attention (2/3 width) */}
        <div className="card-surface xl:col-span-2 overflow-hidden">
          {/* Table header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Employees Requiring Attention</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                5 employees flagged by PerformIQ this quarter
              </p>
            </div>
            <Link
              to="/employees"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#0078D4] hover:underline hover:text-[#106EBE] transition"
            >
              View all <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80">
                  {['Employee', 'Performance', 'Trend', 'Goal Completion', 'AI Signal', ''].map(
                    (col) => (
                      <th
                        key={col}
                        className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 first:pl-5 last:pr-5"
                      >
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, idx) => (
                  <tr
                    key={emp.id}
                    className="group border-b border-slate-50 hover:bg-slate-50/70 transition-colors"
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    {/* Employee */}
                    <td className="px-4 py-3 pl-5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                          style={{ background: emp.color }}
                        >
                          {emp.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 leading-tight">{emp.name}</p>
                          <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                            {emp.role}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Performance */}
                    <td className="px-4 py-3 min-w-[120px]">
                      <PerformanceBar value={emp.performance} color={emp.color} />
                    </td>

                    {/* Trend */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <TrendIcon trend={emp.trend} />
                    </td>

                    {/* Goal Completion */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className="font-semibold tabular-nums"
                        style={{
                          color:
                            emp.goalCompletion < 68
                              ? '#dc2626'
                              : emp.goalCompletion < 73
                              ? '#d97706'
                              : '#ca8a04',
                        }}
                      >
                        {emp.goalCompletion}%
                      </span>
                    </td>

                    {/* AI Signal */}
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 border border-slate-200/70 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                        <Lightbulb className="h-2.5 w-2.5 text-amber-500 shrink-0" />
                        {emp.aiSignal}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-4 py-3 pr-5">
                      <Link
                        to={`/employees/${emp.id}`}
                        className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-600 hover:border-[#0078D4]/50 hover:text-[#0078D4] hover:bg-blue-50/30 transition-all whitespace-nowrap"
                      >
                        Review
                        <ArrowRight className="h-2.5 w-2.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── 6. AI Recommendations Panel (1/3 width) */}
        <div className="card-surface xl:col-span-1 flex flex-col">
          <div className="px-5 pt-5 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-0.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0078D4]/10">
                <Sparkles className="h-3.5 w-3.5 text-[#0078D4]" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">AI Recommendations</h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 pl-8">Generated for this quarter</p>
          </div>

          <div className="flex-1 px-4 py-3 space-y-2">
            {recommendations.map((rec, idx) => {
              const RecIcon = rec.icon;
              return (
                <div
                  key={rec.id}
                  className="group rounded-lg border border-slate-200/70 bg-slate-50/50 p-3.5 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all cursor-default"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200/80 shadow-2xs group-hover:border-[#0078D4]/30 group-hover:bg-blue-50/40 transition-all">
                      <RecIcon className="h-3.5 w-3.5 text-slate-600 group-hover:text-[#0078D4] transition-colors" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <p className="text-xs font-semibold text-slate-900 leading-tight">{rec.title}</p>
                        <PriorityBadge priority={rec.priority} />
                      </div>

                      <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
                        {rec.description}
                      </p>

                      <div className="mt-2 flex items-center gap-1.5">
                        <Users className="h-3 w-3 text-slate-400" />
                        <span className="text-[10px] font-medium text-slate-400">
                          {rec.affectedCount} employees affected
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Panel footer */}
          <div className="px-4 pb-4 pt-2 border-t border-slate-100 mt-1">
            <Link
              to="/insights"
              className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-[#0078D4]/30 bg-blue-50/60 py-2 text-xs font-semibold text-[#0078D4] hover:bg-blue-100/60 transition-all"
            >
              View All Recommendations
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom breathing room ─────────────────────────────────────────── */}
      <div className="h-4" />
    </div>
  );
};
