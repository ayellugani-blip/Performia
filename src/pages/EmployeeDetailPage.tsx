import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEmployeeById } from '../data/mockEmployees';
import {
  ArrowLeft,
  Building2,
  UserCheck,
  TrendingDown,
  TrendingUp,
  Target,
  Layers,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  BarChart2,
  Check,
  ShieldAlert,
  Calendar,
  Zap,
  Award,
  BadgeCheck,
  FileText,
  Activity,
  GitCommit,
} from 'lucide-react';

// ─── Component ────────────────────────────────────────────────────────────────

export const EmployeeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const empData = getEmployeeById(id);

  // Dynamic employee details
  const employee = {
    id: empData.id,
    name: empData.name,
    role: empData.role,
    department: empData.department,
    manager: empData.manager || 'Sarah Connor',
    avatarInitials: empData.initials,
    status: 'Active',
    tenure: empData.tenure || '3.5 Years',
    avatarColor: empData.avatarColor,
  };

  const isHighPerformer = empData.performance >= 85;

  const kpis = [
    {
      id: 'current-performance',
      label: 'Current Performance',
      value: `${empData.performance}%`,
      subtitle: isHighPerformer ? '+4% vs Q3' : '-7% vs Q3',
      icon: Activity,
      iconBg: isHighPerformer ? 'bg-emerald-50' : 'bg-red-50',
      iconColor: isHighPerformer ? 'text-emerald-600' : 'text-red-600',
      valueColor: isHighPerformer ? 'text-emerald-600' : 'text-red-600',
    },
    {
      id: 'goal-completion',
      label: 'Goal Completion',
      value: `${empData.goalCompletion}%`,
      subtitle: empData.goalCompletion >= 85 ? '+5% vs Q3' : '-8% vs Q3',
      icon: Target,
      iconBg: empData.goalCompletion >= 85 ? 'bg-emerald-50' : 'bg-red-50',
      iconColor: empData.goalCompletion >= 85 ? 'text-emerald-600' : 'text-red-600',
      valueColor: empData.goalCompletion >= 85 ? 'text-emerald-600' : 'text-red-600',
    },
    {
      id: 'performance-trend',
      label: 'Performance Trend',
      value: empData.trend === 'improving' ? 'Improving' : empData.trend === 'stable' ? 'Stable' : 'Declining',
      isTrend: true,
      subtitle: empData.trend === 'improving' ? 'Consistent growth' : '2 consecutive quarters',
      icon: empData.trend === 'improving' ? TrendingUp : TrendingDown,
      iconBg: empData.trend === 'improving' ? 'bg-emerald-50' : 'bg-red-50',
      iconColor: empData.trend === 'improving' ? 'text-emerald-600' : 'text-red-600',
      valueColor: empData.trend === 'improving' ? 'text-emerald-600' : 'text-red-600',
    },
    {
      id: 'skill-coverage',
      label: 'Skill Coverage',
      value: '72%',
      subtitle: 'Target: 85%',
      icon: Layers,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      valueColor: 'text-amber-600',
    },
  ];

  const evidenceCards = [
    {
      id: 'trend',
      title: 'Performance Trend',
      icon: TrendingDown,
      iconColor: 'text-red-600',
      iconBg: 'bg-red-50',
      valueDisplay: '88 → 84 → 76 → 69',
      subtext: 'Steady decline over the last 4 quarters',
      steps: [
        { label: 'Q1', val: 88, color: '#16a34a' },
        { label: 'Q2', val: 84, color: '#65a30d' },
        { label: 'Q3', val: 76, color: '#d97706' },
        { label: 'Q4', val: 69, color: '#dc2626' },
      ],
    },
    {
      id: 'goals',
      title: 'Goal Completion',
      icon: Target,
      iconColor: 'text-red-600',
      iconBg: 'bg-red-50',
      valueDisplay: '91% → 86% → 72% → 64%',
      subtext: 'Drop in sprint task completion rate',
      steps: [
        { label: 'Q1', val: 91, color: '#16a34a' },
        { label: 'Q2', val: 86, color: '#16a34a' },
        { label: 'Q3', val: 72, color: '#d97706' },
        { label: 'Q4', val: 64, color: '#dc2626' },
      ],
    },
    {
      id: 'feedback',
      title: 'Feedback Pattern',
      icon: FileText,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      valueDisplay: 'Deadline Consistency',
      subtext: 'Repeated feedback mentions deadline consistency',
      tags: ['Milestones', 'PR Reviews', 'Sprint Commitment'],
    },
    {
      id: 'skill',
      title: 'Skill Signal',
      icon: ShieldAlert,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      valueDisplay: 'Project Management: 2/5',
      subtext: 'Identified core competency gap impacting planning',
      rating: 2,
      maxRating: 5,
    },
  ];

  const strengths = [
    { name: 'Technical Execution', score: 5, max: 5 },
    { name: 'Python', score: 5, max: 5 },
    { name: 'FastAPI', score: 4, max: 5 },
    { name: 'Problem Solving', score: 4, max: 5 },
  ];

  const improvementAreas = [
    { name: 'Deadline Management', priority: 'High', type: 'high' },
    { name: 'Project Planning', priority: 'Medium', type: 'medium' },
    { name: 'Project Management', priority: 'Needs Development', type: 'needs-dev' },
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Break large goals into smaller milestones',
      priority: 'High',
      priorityType: 'high',
      icon: GitCommit,
      reason: 'Large, complex epic goals correlate directly with missed delivery dates in Q3 and Q4.',
      expectedOutcome: 'Increases milestone completion rate (+15-20%) and improves sprint predictability.',
    },
    {
      id: 2,
      title: 'Provide project-planning support',
      priority: 'High',
      priorityType: 'high',
      icon: BarChart2,
      reason: 'Skill signal identifies Project Management (2/5) as the primary structural gap affecting delivery.',
      expectedOutcome: 'Improves task estimation accuracy and provides structured sprint backlog templates.',
    },
    {
      id: 3,
      title: 'Schedule a 30-day follow-up review',
      priority: 'Medium',
      priorityType: 'medium',
      icon: Calendar,
      reason: 'Monitor progress on restructured goals and offer ongoing coaching feedback.',
      expectedOutcome: 'Establishes an early feedback loop to ensure trajectory recovery before annual reviews.',
    },
  ];

  const historyPoints = [
    { quarter: 'Q1', score: 88, label: '88%', status: 'Strong', color: '#16a34a', bg: 'bg-emerald-500' },
    { quarter: 'Q2', score: 84, label: '84%', status: 'Good', color: '#65a30d', bg: 'bg-lime-600' },
    { quarter: 'Q3', score: 76, label: '76%', status: 'Moderate', color: '#d97706', bg: 'bg-amber-500' },
    { quarter: 'Q4', score: 69, label: '69%', status: 'Declining', color: '#dc2626', bg: 'bg-red-600' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-10">

      {/* ── Top Navigation & Visual Pipeline Indicator ─────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1 border-b border-slate-200/80">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link
            to="/employees"
            className="inline-flex items-center gap-1.5 font-medium text-[#0078D4] hover:text-[#106EBE] hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Employees
          </Link>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-900">{employee.name}</span>
          <span className="text-slate-400 font-mono">({employee.id})</span>
        </div>

        {/* Visual Story Sequence Banner */}
        <div className="hidden md:flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-600">
          <span className="text-[#0078D4]">PERFORMANCE DATA</span>
          <span className="text-slate-400">→</span>
          <span className="text-[#0078D4]">AI INSIGHT</span>
          <span className="text-slate-400">→</span>
          <span className="text-[#0078D4]">EVIDENCE</span>
          <span className="text-slate-400">→</span>
          <span className="text-[#0078D4]">REASON</span>
          <span className="text-slate-400">→</span>
          <span className="text-[#0078D4]">RECOMMENDED ACTION</span>
        </div>
      </div>

      {/* ── 1. Top Section: Employee Header Card ────────────────────────────── */}
      <div className="card-surface p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Avatar & Employee Basic Info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-md border border-white/20"
                style={{ backgroundColor: employee.avatarColor || '#0078D4' }}
              >
                {employee.avatarInitials}
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {employee.name}
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 font-mono text-[11px] font-bold text-slate-600">
                  {employee.id}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 border border-red-100 px-2.5 py-0.5 text-[11px] font-semibold text-red-700">
                  <AlertTriangle className="h-3 w-3" /> Action Required
                </span>
              </div>

              <p className="text-sm font-medium text-slate-600 mt-0.5">
                {employee.role}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5 text-slate-400" />
                  Department: <strong className="text-slate-700">{employee.department}</strong>
                </span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1">
                  <UserCheck className="h-3.5 w-3.5 text-slate-400" />
                  Manager: <strong className="text-slate-700">{employee.manager}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions / Status Pill */}
          <div className="flex items-center gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
            <div className="text-right hidden lg:block mr-2">
              <p className="text-[11px] text-slate-400 font-medium">Evaluation Cycle</p>
              <p className="text-xs font-semibold text-slate-800">Q4 2024 Intelligence</p>
            </div>
            <a
              href="#ai-actions"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0078D4] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#106EBE] transition-all"
            >
              <Zap className="h-3.5 w-3.5" />
              View Recommended Actions
            </a>
          </div>
        </div>
      </div>

      {/* ── 2. Four KPI Cards ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="card-elevated p-5 transition-all hover:translate-y-[-2px] hover:shadow-md cursor-default select-none"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${kpi.iconBg}`}>
                  <Icon className={`h-4.5 w-4.5 ${kpi.iconColor}`} />
                </div>
                {kpi.isTrend ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-50 border border-red-100 px-2 py-0.5 text-[11px] font-semibold text-red-700">
                    <TrendingDown className="h-3 w-3" /> {kpi.value}
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-slate-400">{kpi.subtitle}</span>
                )}
              </div>

              <div>
                <p className={`text-3xl font-bold tabular-nums tracking-tight ${kpi.valueColor}`}>
                  {kpi.value}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-800">{kpi.label}</p>
                {kpi.isTrend && (
                  <p className="mt-0.5 text-[11px] text-slate-400">{kpi.subtitle}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 3. Main Section: AI Performance Insight ─────────────────────────── */}
      <div className="card-ai p-6 relative">
        {/* Soft blue radial background highlight */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '260px',
            height: '260px',
            background: 'radial-gradient(circle, rgba(0,120,212,0.22) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: 'rgba(0,120,212,0.22)',
                  border: '1px solid rgba(0,120,212,0.35)',
                }}
              >
                <Sparkles className="h-5 w-5 text-blue-300" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  AI Performance Insight
                </h2>
                <p className="text-[11px]" style={{ color: 'rgba(203,213,225,0.75)' }}>
                  Synthesized across quarterly goals, peer feedback, and skill telemetry
                </p>
              </div>
            </div>

            {/* Badge */}
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide shadow-sm"
              style={{
                background: 'rgba(0,120,212,0.25)',
                color: '#93c5fd',
                border: '1px solid rgba(147,197,253,0.3)',
              }}
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-300 animate-pulse" />
              AI Generated Insight
            </span>
          </div>

          {/* Main Insight Text Box */}
          <div
            className="rounded-xl p-4 sm:p-5"
            style={{
              background: 'rgba(15,23,42,0.45)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <p className="text-sm sm:text-base leading-relaxed font-medium text-slate-100">
              “Performance has declined over the last two quarters, primarily due to reduced goal completion and recurring delivery-related feedback, while technical capability remains strong.”
            </p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3 text-xs pt-1" style={{ color: 'rgba(203,213,225,0.8)' }}>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Confidence Score: <strong className="text-white font-semibold">96%</strong>
              </span>
              <span className="flex items-center gap-1">
                <Activity className="h-3.5 w-3.5 text-blue-400" />
                Data Signals: <strong className="text-white font-semibold">4 Source Dimensions</strong>
              </span>
            </div>

            <span className="text-[11px]" style={{ color: 'rgba(148,163,184,0.8)' }}>
              Evaluated for Q4 Performance Cycle
            </span>
          </div>
        </div>
      </div>

      {/* ── 4. Why this insight? — Four Evidence Cards ───────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#0078D4]" />
            <h3 className="text-base font-bold text-slate-900">Why this insight?</h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">4 Core Evidence Cards</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {evidenceCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="card-surface p-4 flex flex-col justify-between hover:border-slate-300 transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-900">{card.title}</span>
                    <div className={`flex h-7 w-7 items-center justify-center rounded-md ${card.iconBg}`}>
                      <Icon className={`h-3.5 w-3.5 ${card.iconColor}`} />
                    </div>
                  </div>

                  <p className="text-sm font-bold text-slate-900 font-mono tracking-tight">
                    {card.valueDisplay}
                  </p>

                  <p className="mt-1 text-xs text-slate-500 leading-snug">
                    {card.subtext}
                  </p>
                </div>

                {/* Card-specific visualizations */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  {card.steps && (
                    <div className="flex items-end justify-between gap-1.5 h-10 pt-1">
                      {card.steps.map((step) => (
                        <div key={step.label} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="w-full rounded-t transition-all"
                            style={{
                              height: `${(step.val / 100) * 28}px`,
                              background: step.color,
                            }}
                          />
                          <span className="text-[10px] font-semibold text-slate-400">
                            {step.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {card.tags && (
                    <div className="flex flex-wrap gap-1">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block rounded bg-amber-50 border border-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {card.rating !== undefined && card.maxRating && (
                    <div className="flex items-center gap-1.5">
                      <div className="flex gap-1">
                        {Array.from({ length: card.maxRating }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-2.5 w-5 rounded ${
                              i < card.rating! ? 'bg-[#0078D4]' : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-bold text-slate-700 font-mono">
                        {card.rating}/{card.maxRating}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 5. Side-by-Side: Strengths & Improvement Areas ─────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Strengths Card */}
        <div className="card-surface p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Strengths</h3>
                  <p className="text-[11px] text-slate-400">Validated core competencies</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                <Check className="h-3 w-3" /> Core Foundation
              </span>
            </div>

            <div className="space-y-3.5">
              {strengths.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-800">{item.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Filled score dots */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: item.max }).map((_, i) => (
                        <span
                          key={i}
                          className={`h-2 w-2 rounded-full ${
                            i < item.score ? 'bg-emerald-600' : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-700 font-mono w-6 text-right">
                      {item.score}/{item.max}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Technical execution & engineering logic remain in top 10th percentile.
          </div>
        </div>

        {/* Improvement Areas Card */}
        <div className="card-surface p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <Target className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Improvement Areas</h3>
                  <p className="text-[11px] text-slate-400">Targeted growth priorities</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
                <AlertTriangle className="h-3 w-3" /> Focus Required
              </span>
            </div>

            <div className="space-y-3.5">
              {improvementAreas.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-slate-50/70 border border-slate-100"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                    <span className="text-xs font-semibold text-slate-800">{item.name}</span>
                  </div>

                  <div>
                    {item.type === 'high' && <span className="badge-high">High</span>}
                    {item.type === 'medium' && <span className="badge-medium">Medium</span>}
                    {item.type === 'needs-dev' && (
                      <span className="inline-flex items-center rounded-full bg-orange-50 border border-orange-200 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-orange-700 tracking-wide">
                        Needs Development
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Address project planning gaps to restore deadline consistency.
          </div>
        </div>
      </div>

      {/* ── 6. Prominent Section: AI Recommended Actions ────────────────────── */}
      <div id="ai-actions" className="card-surface p-6 space-y-5 border-l-4 border-l-[#0078D4]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0078D4]/10">
              <Sparkles className="h-4 w-4 text-[#0078D4]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">AI Recommended Actions</h2>
              <p className="text-xs text-slate-500">
                Tailored intervention plan to reverse performance decline
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-semibold text-[#0078D4]">
            3 Active Recommendations
          </span>
        </div>

        {/* 3 Recommendation Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {recommendations.map((rec) => {
            const RecIcon = rec.icon;
            return (
              <div
                key={rec.id}
                className="rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50/60 to-white p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-200 shadow-2xs">
                      <RecIcon className="h-4 w-4 text-[#0078D4]" />
                    </div>
                    {rec.priorityType === 'high' ? (
                      <span className="badge-high">Priority: {rec.priority}</span>
                    ) : (
                      <span className="badge-medium">Priority: {rec.priority}</span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {rec.id}. {rec.title}
                  </h3>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="bg-slate-100/70 p-2.5 rounded-lg border border-slate-200/60">
                      <span className="font-semibold text-slate-700 block mb-0.5 text-[11px] uppercase tracking-wider">
                        Reason
                      </span>
                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        {rec.reason}
                      </p>
                    </div>

                    <div className="bg-blue-50/60 p-2.5 rounded-lg border border-blue-100">
                      <span className="font-semibold text-[#0078D4] block mb-0.5 text-[11px] uppercase tracking-wider">
                        Expected Outcome
                      </span>
                      <p className="text-slate-700 leading-relaxed text-[11px] font-medium">
                        {rec.expectedOutcome}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-400">Assigned: Sarah Connor</span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0078D4] hover:text-[#106EBE] hover:underline"
                  >
                    Initiate Plan <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 7. Performance History Chart ─────────────────────────────────────── */}
      <div className="card-surface p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Performance History</h3>
            <p className="text-xs text-slate-500">4-Quarter historical trajectory for FY 2024</p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Q1-Q2 (Strong)
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Q3 (Moderate)
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-red-600" /> Q4 (Declining)
            </span>
          </div>
        </div>

        {/* Custom SVG / Bar Chart Representation */}
        <div className="pt-2">
          <div className="grid grid-cols-4 gap-4 sm:gap-6 items-end" style={{ height: 160 }}>
            {historyPoints.map((pt) => {
              const heightPercent = (pt.score / 100) * 120;
              return (
                <div key={pt.quarter} className="flex flex-col items-center gap-2">
                  <span className="text-sm font-bold font-mono" style={{ color: pt.color }}>
                    {pt.label}
                  </span>

                  <div
                    className="w-full max-w-[80px] rounded-t-lg transition-all duration-500 relative group"
                    style={{
                      height: `${heightPercent}px`,
                      background: pt.color,
                      boxShadow: pt.quarter === 'Q4' ? '0 4px 12px rgba(220,38,38,0.25)' : 'none',
                    }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded pointer-events-none transition-opacity whitespace-nowrap">
                      {pt.status}: {pt.score}%
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-800">{pt.quarter}</p>
                    <p className="text-[10px] text-slate-400">{pt.status}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center gap-2 text-xs text-slate-600">
            <Activity className="h-4 w-4 text-[#0078D4] shrink-0" />
            <span>
              <strong>Historical trend trajectory:</strong> Performance peaked at 88 in Q1 and consistently dropped through Q4 (69). Reversing this trend with the recommended actions is prioritized for Q1 2025.
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

