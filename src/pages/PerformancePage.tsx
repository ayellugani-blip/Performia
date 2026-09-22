import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  Award,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Filter,
  Download,
  Activity,
  Building2,
  ChevronRight,
  ArrowUpRight,
  PieChart,
} from 'lucide-react';

// ─── Types & Interfaces ────────────────────────────────────────────────────────

interface KpiCardData {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  delta: string;
  deltaDirection: 'up' | 'down';
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  valueColor?: string;
}

interface DepartmentPerf {
  name: string;
  performance: number;
  goalCompletion: number;
  employeesCount: number;
  status: 'Exceeding' | 'On Track' | 'Needs Attention';
  statusColor: string;
}

interface DistributionSegment {
  name: string;
  count: number;
  percentage: number;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const kpiCards: KpiCardData[] = [
  {
    id: 'avg-perf',
    label: 'Average Performance',
    value: '81',
    suffix: '%',
    delta: '+3.4%',
    deltaDirection: 'up',
    subtitle: 'vs previous quarter (78%)',
    icon: TrendingUp,
    iconBg: 'bg-[#0078D4]/10',
    iconColor: 'text-[#0078D4]',
  },
  {
    id: 'goal-completion',
    label: 'Goal Completion',
    value: '78',
    suffix: '%',
    delta: '+5.1%',
    deltaDirection: 'up',
    subtitle: 'vs previous quarter (73%)',
    icon: Target,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'improving',
    label: 'Improving',
    value: '12',
    delta: '+3 employees',
    deltaDirection: 'up',
    subtitle: 'Upward trajectory',
    icon: Award,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    valueColor: 'text-violet-700',
  },
  {
    id: 'declining',
    label: 'Declining',
    value: '4',
    delta: '-1 employee',
    deltaDirection: 'down',
    subtitle: 'Require intervention',
    icon: AlertTriangle,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-600',
    valueColor: 'text-red-600',
  },
];

const quarterlyTrendPoints = [
  { quarter: 'Q1', perf: 72, goals: 68, label: 'Q1 2024' },
  { quarter: 'Q2', perf: 75, goals: 71, label: 'Q2 2024' },
  { quarter: 'Q3', perf: 78, goals: 74, label: 'Q3 2024' },
  { quarter: 'Q4', perf: 81, goals: 78, label: 'Q4 2024 (Current)' },
];

const departmentData: DepartmentPerf[] = [
  {
    name: 'AI/ML',
    performance: 86,
    goalCompletion: 88,
    employeesCount: 8,
    status: 'Exceeding',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    name: 'Finance',
    performance: 85,
    goalCompletion: 84,
    employeesCount: 7,
    status: 'Exceeding',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    name: 'Design',
    performance: 84,
    goalCompletion: 82,
    employeesCount: 6,
    status: 'Exceeding',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    name: 'HR',
    performance: 83,
    goalCompletion: 85,
    employeesCount: 5,
    status: 'On Track',
    statusColor: 'bg-blue-50 text-[#0078D4] border-blue-200',
  },
  {
    name: 'Marketing',
    performance: 82,
    goalCompletion: 80,
    employeesCount: 10,
    status: 'On Track',
    statusColor: 'bg-blue-50 text-[#0078D4] border-blue-200',
  },
  {
    name: 'Engineering',
    performance: 79,
    goalCompletion: 74,
    employeesCount: 14,
    status: 'Needs Attention',
    statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    name: 'Operations',
    performance: 77,
    goalCompletion: 71,
    employeesCount: 9,
    status: 'Needs Attention',
    statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
];

const distributionData: DistributionSegment[] = [
  {
    name: 'High Performance',
    count: 18,
    percentage: 30,
    description: 'Score ≥ 85% with consistent goal delivery',
    color: '#16a34a',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  {
    name: 'Stable',
    count: 26,
    percentage: 44,
    description: 'Score 75%–84% meeting core operational targets',
    color: '#0078D4',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    name: 'Improving',
    count: 12,
    percentage: 20,
    description: 'Positive performance velocity over last 2 cycles',
    color: '#7c3aed',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
  },
  {
    name: 'Declining',
    count: 4,
    percentage: 6,
    description: 'Score < 75% or 2+ quarters of downward slope',
    color: '#dc2626',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
];

// ─── Main Performance Component ──────────────────────────────────────────────

export const PerformancePage: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [hoveredQuarter, setHoveredQuarter] = useState<number | null>(3); // default Q4 hovered
  const [hoveredGoalQuarter, setHoveredGoalQuarter] = useState<number | null>(3); // default Q4 goal hovered
  const [exportToast, setExportToast] = useState<string | null>(null);

  const handleExport = () => {
    setExportToast('Generating & Exporting Intelligence Report (PDF / CSV)...');
    setTimeout(() => {
      setExportToast('Report exported successfully to your downloads.');
      setTimeout(() => setExportToast(null), 3000);
    }, 1200);
  };

  // Filtered department list if selected
  const filteredDepartments =
    selectedDepartment === 'All'
      ? departmentData
      : departmentData.filter((d) => d.name === selectedDepartment);

  return (
    <div className="space-y-7 animate-fadeIn pb-10">
      {exportToast && (
        <div className="fixed top-20 right-8 z-50 rounded-lg bg-[#0078D4] text-white px-4 py-2.5 shadow-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Sparkles className="h-4 w-4" />
          <span>{exportToast}</span>
        </div>
      )}

      {/* ── 1. Page Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-2.5 py-1 text-[11px] font-semibold text-[#0078D4]">
              <Sparkles className="h-3 w-3" />
              Organizational Analytics · FY 2024
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Performance Intelligence
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-normal leading-relaxed">
            Analyze performance trends, goals and workforce patterns across departments.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span>Dept:</span>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="All">All Departments (7)</option>
              {departmentData.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-slate-400" />
            Export Intelligence Report
          </button>
        </div>
      </div>

      {/* ── 2. KPI Cards ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="card-elevated p-5 transition-all hover:translate-y-[-2px] hover:shadow-md cursor-default select-none"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${card.iconBg}`}>
                  <Icon className={`h-4.5 w-4.5 ${card.iconColor}`} />
                </div>

                <span
                  className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    card.deltaDirection === 'up'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                      : 'bg-red-50 text-red-700 border border-red-100'
                  }`}
                >
                  {card.deltaDirection === 'up' ? (
                    <TrendingUp className="h-2.5 w-2.5" />
                  ) : (
                    <TrendingDown className="h-2.5 w-2.5" />
                  )}
                  {card.delta}
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-0.5">
                  <span
                    className={`text-3xl font-bold tabular-nums tracking-tight ${
                      card.valueColor ? card.valueColor : 'text-slate-900'
                    }`}
                  >
                    {card.value}
                  </span>
                  {card.suffix && (
                    <span className="text-lg font-semibold text-slate-400">{card.suffix}</span>
                  )}
                </div>

                <p className="mt-1 text-xs font-semibold text-slate-800">{card.label}</p>
                <p className="mt-0.5 text-[11px] text-slate-400 font-normal">{card.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 3 + 4. Performance Trend Chart & Goal Completion Comparison ───── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* 3. Performance Trend (Quarterly Line/Area Chart) */}
        <div className="card-surface p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#0078D4]" />
                <h3 className="text-base font-bold text-slate-900">Performance Trend</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Workforce performance trajectory (Q1 – Q4 2024)
              </p>
            </div>

            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-100 px-2.5 py-0.5 text-[11px] font-semibold text-[#0078D4]">
              +9% YTD Growth
            </span>
          </div>

          {/* SVG Area / Line Chart */}
          <div className="relative pt-2 pb-1">
            <svg viewBox="0 0 400 140" className="w-full h-40 overflow-visible">
              <defs>
                <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0078D4" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0078D4" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <line x1="30" y1="20" x2="370" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="30" y1="55" x2="370" y2="55" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="30" y1="90" x2="370" y2="90" stroke="#f1f5f9" strokeDasharray="3 3" />

              {/* Area path */}
              <path
                d="M 40,95 L 140,80 L 240,62 L 340,40 L 340,120 L 40,120 Z"
                fill="url(#perfGrad)"
              />

              {/* Line path */}
              <path
                d="M 40,95 L 140,80 L 240,62 L 340,40"
                fill="none"
                stroke="#0078D4"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Points */}
              {[
                { x: 40, y: 95, val: '72%', q: 'Q1' },
                { x: 140, y: 80, val: '75%', q: 'Q2' },
                { x: 240, y: 62, val: '78%', q: 'Q3' },
                { x: 340, y: 40, val: '81%', q: 'Q4' },
              ].map((pt, i) => (
                <g
                  key={pt.q}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredQuarter(i)}
                >
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredQuarter === i ? 6 : 4}
                    fill={hoveredQuarter === i ? '#0078D4' : '#ffffff'}
                    stroke="#0078D4"
                    strokeWidth="3"
                    className="transition-all"
                  />
                  <text
                    x={pt.x}
                    y={pt.y - 10}
                    textAnchor="middle"
                    className="text-[11px] font-bold fill-slate-800 font-mono"
                  >
                    {pt.val}
                  </text>
                  <text
                    x={pt.x}
                    y="132"
                    textAnchor="middle"
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      hoveredQuarter === i ? 'fill-[#0078D4]' : 'fill-slate-400'
                    }`}
                  >
                    {pt.q}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Quarterly average calculated across 59 active profiles</span>
            <span className="font-semibold text-slate-700">Peak: 81% (Q4)</span>
          </div>
        </div>

        {/* 4. Goal Completion Chart Across Quarters */}
        <div className="card-surface p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Goal Completion Comparison</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Target completion progression across evaluation cycles (Q1 – Q4 2024)
              </p>
            </div>

            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
              +10% Goal Velocity
            </span>
          </div>

          {/* Real Clean SVG Goal Growth Curve & Benchmark Area Chart */}
          <div className="relative pt-2 pb-1">
            <svg viewBox="0 0 400 140" className="w-full h-40 overflow-visible">
              <defs>
                <linearGradient id="goalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Reference Grid lines */}
              <line x1="30" y1="20" x2="370" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="30" y1="55" x2="370" y2="55" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="30" y1="90" x2="370" y2="90" stroke="#f1f5f9" strokeDasharray="3 3" />

              {/* Target Benchmark Line (75%) */}
              <line
                x1="30"
                y1="65"
                x2="370"
                y2="65"
                stroke="#059669"
                strokeDasharray="4 4"
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />

              {/* Smooth Curved Area Under Growth Line */}
              <path
                d="M 40,98 L 140,85 L 240,72 L 340,52 L 340,120 L 40,120 Z"
                fill="url(#goalGrad)"
              />

              {/* Smooth Emerald Growth Curve Line */}
              <path
                d="M 40,98 L 140,85 L 240,72 L 340,52"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive Quarter Growth Nodes */}
              {quarterlyTrendPoints.map((item, i) => {
                const points = [
                  { x: 40, y: 98 },
                  { x: 140, y: 85 },
                  { x: 240, y: 72 },
                  { x: 340, y: 52 },
                ];
                const pt = {
                  x: points[i].x,
                  y: points[i].y,
                  val: `${item.goals}%`,
                  q: item.quarter,
                };
                const isHovered = hoveredGoalQuarter === i;
                const isCurrent = i === quarterlyTrendPoints.length - 1;
                return (
                  <g
                    key={pt.q}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredGoalQuarter(i)}
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 6 : 4}
                      fill={isHovered ? '#10b981' : '#ffffff'}
                      stroke="#10b981"
                      strokeWidth="3"
                      className="transition-all duration-150"
                    />

                    <text
                      x={pt.x}
                      y={pt.y - 10}
                      textAnchor="middle"
                      className={`text-[11px] font-bold font-mono transition-colors ${
                        isCurrent ? 'fill-emerald-700 font-extrabold' : 'fill-slate-800'
                      }`}
                    >
                      {pt.val}
                    </text>

                    <text
                      x={pt.x}
                      y="132"
                      textAnchor="middle"
                      className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${
                        isHovered || isCurrent ? 'fill-emerald-700' : 'fill-slate-400'
                      }`}
                    >
                      {pt.q}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Actual Goal Completion
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-500">
                <span className="h-0.5 w-3 border-b border-dashed border-emerald-600" /> Target Benchmark (75%)
              </span>
            </span>
            <span className="font-semibold text-emerald-700">Peak: 78% (Q4)</span>
          </div>
        </div>
      </div>

      {/* ── 5. Department Performance Comparison Section ───────────────────── */}
      <div className="card-surface p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4.5 w-4.5 text-[#0078D4]" />
              <h2 className="text-base font-bold text-slate-900">Department Performance</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparative matrix of performance scores and goal completion across 7 departments
            </p>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{filteredDepartments.length}</strong> departments
          </span>
        </div>

        {/* Department Grid/Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDepartments.map((dept) => (
            <div
              key={dept.name}
              className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-900">{dept.name}</span>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${dept.statusColor}`}
                  >
                    {dept.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-slate-400" /> {dept.employeesCount} Employees
                  </span>
                </div>

                {/* Bars */}
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-semibold text-slate-700">Performance</span>
                      <span className="font-bold text-slate-900 font-mono">{dept.performance}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${dept.performance}%`,
                          background: dept.performance >= 84 ? '#16a34a' : dept.performance >= 80 ? '#0078D4' : '#d97706',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-semibold text-slate-600">Goal Completion</span>
                      <span className="font-bold text-slate-800 font-mono">{dept.goalCompletion}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full transition-all bg-emerald-500"
                        style={{ width: `${dept.goalCompletion}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[10px] font-medium text-slate-400">Q4 Cycle Health</span>
                <Link
                  to={`/employees?department=${encodeURIComponent(dept.name)}`}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0078D4] hover:text-[#106EBE] hover:underline"
                >
                  View Dept Team <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 6 + 7. Performance Distribution & AI Performance Summary ───────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* 6. Performance Distribution (2/3 width) */}
        <div className="card-surface lg:col-span-2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <PieChart className="h-4.5 w-4.5 text-[#0078D4]" />
                <div>
                  <h2 className="text-base font-bold text-slate-900">Performance Distribution</h2>
                  <p className="text-xs text-slate-500">
                    Workforce segment categorization across 59 evaluated profiles
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-600">Total: 59 Employees</span>
            </div>

            {/* Segment Progress Bar */}
            <div className="h-4 w-full rounded-lg bg-slate-100 flex overflow-hidden mb-5">
              {distributionData.map((seg) => (
                <div
                  key={seg.name}
                  style={{ width: `${seg.percentage}%`, background: seg.color }}
                  className="h-full transition-all relative group cursor-pointer"
                  title={`${seg.name}: ${seg.count} (${seg.percentage}%)`}
                />
              ))}
            </div>

            {/* Distribution Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {distributionData.map((seg) => (
                <div
                  key={seg.name}
                  className={`rounded-xl border ${seg.borderColor} ${seg.bgColor} p-3.5 flex flex-col justify-between`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full" style={{ background: seg.color }} />
                      <span className="text-xs font-bold text-slate-900">{seg.name}</span>
                    </div>
                    <span className="text-xs font-bold font-mono text-slate-900">
                      {seg.count} <span className="text-slate-400 font-normal">({seg.percentage}%)</span>
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-snug">{seg.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>74% of workforce is operating at Stable or High Performance levels.</span>
            <Link to="/employees" className="font-semibold text-[#0078D4] hover:underline flex items-center gap-1">
              Explore Directory <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* 7. AI Performance Summary (1/3 width) */}
        <div className="card-ai lg:col-span-1 p-6 flex flex-col justify-between relative">
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(0,120,212,0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0078D4]/20 border border-[#0078D4]/30">
                  <Sparkles className="h-4 w-4 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">AI Performance Summary</h3>
                  <p className="text-[10px] text-blue-200">PerformIQ Pattern Detection</p>
                </div>
              </div>
            </div>

            <div
              className="rounded-lg p-3.5 text-xs leading-relaxed"
              style={{
                background: 'rgba(15,23,42,0.5)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(226,232,240,0.9)',
              }}
            >
              “Overall workforce performance reached a peak of <strong className="text-white font-bold">81% in Q4 (+3.4% YoY)</strong>, spearheaded by strong velocity in AI/ML and Finance. However, delivery bottlenecks in Engineering have resulted in 4 employees showing declining performance trends.”
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Detected Patterns
              </span>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>AI/ML leading velocity at 86% average</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>Engineering deadline consistency gap</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <ArrowUpRight className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span>12 employees on upward trajectory</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/10 relative z-10 flex items-center justify-between">
            <span className="text-[10px] text-slate-400">Confidence: 95%</span>
            <Link
              to="/insights"
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-300 hover:text-white transition-colors"
            >
              Full AI Report <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};

