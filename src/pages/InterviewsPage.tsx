import React, { useState } from 'react';
import {
  Sparkles,
  Users,
  CheckCircle2,
  Target,
  ArrowRight,
  ArrowLeft,
  Search,
  MessageSquare,
  Cpu,
  Clock,
  Plus,
  RefreshCw,
  FileText,
  Brain,
  Zap,
  Activity,
  Award,
} from 'lucide-react';

// ─── Types & Interfaces ────────────────────────────────────────────────────────

interface KpiData {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
}

interface CandidateInsight {
  metric: string;
  score: number;
  rating: string;
  badgeType: 'high' | 'medium' | 'low';
  color: string;
}

interface RecentInterview {
  id: string;
  candidateName: string;
  candidateInitials: string;
  avatarBg: string;
  role: string;
  date: string;
  skillMatch: number;
  status: 'In Progress' | 'Shortlisted' | 'Completed' | 'Review Needed';
  statusColor: string;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const kpis: KpiData[] = [
  {
    id: 'active-interviews',
    label: 'Active Interviews',
    value: '6',
    subtitle: '2 in progress today',
    icon: Activity,
    iconBg: 'bg-blue-50',
    iconColor: 'text-[#0078D4]',
  },
  {
    id: 'candidates-assessed',
    label: 'Candidates Assessed',
    value: '48',
    subtitle: 'Across 12 technical roles',
    icon: Users,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'interviews-completed',
    label: 'Interviews Completed',
    value: '42',
    subtitle: '87.5% completion rate',
    icon: CheckCircle2,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    id: 'avg-skill-match',
    label: 'Average Skill Match',
    value: '79',
    suffix: '%',
    subtitle: '+4% vs previous cohort',
    icon: Target,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
];

const candidateInsights: CandidateInsight[] = [
  {
    metric: 'Technical Skills',
    score: 88,
    rating: 'Advanced',
    badgeType: 'high',
    color: '#16a34a',
  },
  {
    metric: 'Problem Solving',
    score: 82,
    rating: 'Strong',
    badgeType: 'high',
    color: '#0078D4',
  },
  {
    metric: 'Communication',
    score: 79,
    rating: 'Clear & Structured',
    badgeType: 'medium',
    color: '#0078D4',
  },
  {
    metric: 'Role Fit',
    score: 85,
    rating: 'High Match',
    badgeType: 'high',
    color: '#16a34a',
  },
];

const mockQuestions = [
  {
    number: 1,
    skill: 'Python & Concurrency',
    question: 'How do Python asyncio and multiprocessing differ when handling I/O-bound vs CPU-bound tasks?',
    response: 'Asyncio uses an event loop in a single thread, ideal for I/O bound tasks without GIL contention. Multiprocessing spawns discrete OS processes with their own memory space and Python interpreter, bypassing the GIL for CPU-intensive workloads.',
  },
  {
    number: 2,
    skill: 'Data Modeling & Indexing',
    question: 'When designing a relational schema with high read-to-write ratios, how do you optimize index strategy?',
    response: 'I evaluate composite index column cardinality and query patterns, apply B-tree indexes for equality/range predicates, leverage covering indexes to avoid table lookups, and avoid redundant indexing on frequently updated columns to prevent write penalties.',
  },
  {
    number: 3,
    skill: 'System Design & API Architecture',
    question: 'How would you design a scalable API for a high-traffic application?',
    response: 'I would structure the API with a stateless microservice architecture behind a redundant NGINX/Envoy load balancer. For high traffic, I would implement Redis caching for frequent idempotent read queries, token bucket rate limiting to prevent abuse, and asynchronous processing using Celery/RabbitMQ for long-running writes. Additionally, we would use read-replicas with horizontal sharding for database scaling and Prometheus/Grafana for p99 latency observability.',
  },
  {
    number: 4,
    skill: 'Error Handling & Resilience',
    question: 'Explain how you would implement circuit breakers and retries with exponential backoff for downstream service failures.',
    response: 'I wrap external API calls in a circuit breaker pattern (e.g. Resilience4j/Hystrix style). When consecutive error thresholds exceed 50%, the circuit trips open, immediately returning fallbacks without overwhelming downstream dependencies. Retries use exponential backoff with full jitter.',
  },
  {
    number: 5,
    skill: 'Security & Auth',
    question: 'How do you safeguard stateless microservices against token forgery and replay attacks?',
    response: 'We use asymmetric JWT tokens signed with RS256 private keys, enforce short lifespans (15 min) paired with cryptographically secure refresh token rotation stored in HttpOnly cookies, validate jti claims against a distributed revocation denylist, and enforce mTLS between internal services.',
  },
];

const recentInterviews: RecentInterview[] = [
  {
    id: 'CAND-2041',
    candidateName: 'Peter Parker',
    candidateInitials: 'PP',
    avatarBg: '#dc2626',
    role: 'Software Engineer',
    date: 'Today · 10:30 AM',
    skillMatch: 85,
    status: 'In Progress',
    statusColor: 'bg-blue-50 text-[#0078D4] border-blue-200',
  },
  {
    id: 'CAND-2040',
    candidateName: 'Miles Morales',
    candidateInitials: 'MM',
    avatarBg: '#ea580c',
    role: 'Frontend Engineer',
    date: 'Yesterday · 3:15 PM',
    skillMatch: 88,
    status: 'Shortlisted',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'CAND-2039',
    candidateName: 'Bruce Wayne',
    candidateInitials: 'BW',
    avatarBg: '#0f172a',
    role: 'Security Architect',
    date: 'Oct 18, 2024',
    skillMatch: 94,
    status: 'Shortlisted',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'CAND-2038',
    candidateName: 'Wanda Maximoff',
    candidateInitials: 'WM',
    avatarBg: '#7c3aed',
    role: 'AI Research Scientist',
    date: 'Oct 17, 2024',
    skillMatch: 91,
    status: 'Shortlisted',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'CAND-2037',
    candidateName: 'Tony Stark',
    candidateInitials: 'TS',
    avatarBg: '#0284c7',
    role: 'Principal Systems Architect',
    date: 'Oct 14, 2024',
    skillMatch: 96,
    status: 'Completed',
    statusColor: 'bg-slate-100 text-slate-700 border-slate-200',
  },
  {
    id: 'CAND-2036',
    candidateName: 'Clark Kent',
    candidateInitials: 'CK',
    avatarBg: '#2563eb',
    role: 'Technical Writer / Comm Lead',
    date: 'Oct 12, 2024',
    skillMatch: 82,
    status: 'Review Needed',
    statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export const InterviewsPage: React.FC = () => {
  // Create interview form state
  const [selectedRole, setSelectedRole] = useState('Software Engineer');
  const [selectedExp, setSelectedExp] = useState('Senior (5-8 yrs)');
  const [requiredSkills, setRequiredSkills] = useState('Python, FastAPI, System Design, Distributed Caching');
  const [generatedToast, setGeneratedToast] = useState(false);

  // Active workspace question state
  const [currentQIndex, setCurrentQIndex] = useState(2); // Question 3 (index 2) by default
  const [evaluated, setEvaluated] = useState(false);
  const [evaluating, setEvaluating] = useState(false);

  // Search in recent interviews
  const [searchTerm, setSearchTerm] = useState('');

  const currentQ = mockQuestions[currentQIndex];

  const handleGenerateInterview = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratedToast(true);
    setTimeout(() => setGeneratedToast(false), 4000);
  };

  const handleEvaluateResponse = () => {
    setEvaluating(true);
    setTimeout(() => {
      setEvaluating(false);
      setEvaluated(true);
    }, 800);
  };

  const filteredInterviews = recentInterviews.filter((item) =>
    item.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-7 animate-fadeIn pb-10">

      {/* ── 1. Page Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-2.5 py-1 text-[11px] font-semibold text-[#0078D4]">
              <Brain className="h-3 w-3" />
              PerformIQ Assessment Engine · Active Session
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Interview Intelligence
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-normal leading-relaxed">
            AI-powered interviews that evaluate candidates against role-specific skills.
          </p>
        </div>

        {/* Header Action Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="#create-interview"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0078D4] px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#106EBE] transition-all"
          >
            <Plus className="h-3.5 w-3.5" />
            New Interview Template
          </a>
        </div>
      </div>

      {/* ── 2. KPI Cards ────────────────────────────────────────────────────── */}
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
                <span className="text-[11px] font-medium text-slate-400">Q4 Hiring</span>
              </div>

              <div>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-3xl font-bold tabular-nums tracking-tight text-slate-900">
                    {kpi.value}
                  </span>
                  {kpi.suffix && (
                    <span className="text-lg font-semibold text-slate-400">{kpi.suffix}</span>
                  )}
                </div>

                <p className="mt-1 text-xs font-semibold text-slate-800">{kpi.label}</p>
                <p className="mt-0.5 text-[11px] text-slate-400 font-normal">{kpi.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 3. Create Interview Section ──────────────────────────────────────── */}
      <div id="create-interview" className="card-surface p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0078D4]/10 text-[#0078D4]">
              <Cpu className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Create Interview</h2>
              <p className="text-xs text-slate-500">
                Generate dynamic competency-aligned questions with AI telemetry
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-500">Adaptive Synthesis</span>
        </div>

        <form onSubmit={handleGenerateInterview} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Select Role */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Select Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs font-medium text-slate-800 focus:bg-white focus:border-[#0078D4] focus:outline-none"
              >
                <option value="Software Engineer">Software Engineer</option>
                <option value="Senior Backend Engineer">Senior Backend Engineer</option>
                <option value="ML Research Engineer">ML Research Engineer</option>
                <option value="Cloud & DevOps Architect">Cloud & DevOps Architect</option>
                <option value="Product Designer">Product Designer</option>
              </select>
            </div>

            {/* Experience Level */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Experience Level
              </label>
              <select
                value={selectedExp}
                onChange={(e) => setSelectedExp(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs font-medium text-slate-800 focus:bg-white focus:border-[#0078D4] focus:outline-none"
              >
                <option value="Senior (5-8 yrs)">Senior (5–8 yrs)</option>
                <option value="Mid-Level (3-5 yrs)">Mid-Level (3–5 yrs)</option>
                <option value="Lead / Staff (8+ yrs)">Lead / Staff (8+ yrs)</option>
                <option value="Entry-Level (1-2 yrs)">Entry-Level (1–2 yrs)</option>
              </select>
            </div>

            {/* Required Skills */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Required Skills
              </label>
              <input
                type="text"
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
                placeholder="e.g. Python, FastAPI, System Design..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-[#0078D4] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-[11px] text-slate-400">
              Generates 5 tailored technical & problem-solving prompts with real-time rubric criteria.
            </p>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0078D4] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#106EBE] transition-all"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Generate Interview
            </button>
          </div>
        </form>

        {/* Toast confirmation */}
        {generatedToast && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800 animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Interview template ready:</strong> Generated 5 adaptive questions for <strong>{selectedRole}</strong> ({selectedExp}).
              </span>
            </div>
            <button
              type="button"
              onClick={() => setGeneratedToast(false)}
              className="font-bold text-emerald-700 hover:text-emerald-900"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* ── 4. Interview Workspace & Candidate Insights (Side by Side) ─────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* 4A. Interview Workspace (2/3 width) */}
        <div className="card-surface lg:col-span-2 p-6 flex flex-col justify-between space-y-5">
          <div>
            {/* Candidate Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-700 text-sm font-bold text-white shadow-sm">
                  PP
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">Peter Parker</h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10px] font-semibold text-[#0078D4]">
                      <Clock className="h-2.5 w-2.5" /> Active Session
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Role: <strong className="text-slate-700">Software Engineer</strong> · Assessment ID: <span className="font-mono text-slate-600">CAND-2041</span>
                  </p>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="text-right">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-xs font-bold text-slate-800">
                    Question {currentQ.number} of {mockQuestions.length}
                  </span>
                  <span className="text-[11px] text-slate-400">({Math.round((currentQ.number / mockQuestions.length) * 100)}%)</span>
                </div>
                {/* 5-step progress dots/bar */}
                <div className="flex items-center gap-1.5">
                  {mockQuestions.map((q, idx) => (
                    <button
                      key={q.number}
                      type="button"
                      onClick={() => {
                        setCurrentQIndex(idx);
                        setEvaluated(false);
                      }}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === currentQIndex
                          ? 'w-6 bg-[#0078D4]'
                          : idx < currentQIndex
                          ? 'w-3 bg-emerald-500'
                          : 'w-3 bg-slate-200'
                      }`}
                      title={`Jump to Question ${q.number}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Skill Being Evaluated Pill */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Skill Being Evaluated:</span>
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-xs font-bold text-slate-800">
                <Zap className="h-3 w-3 text-amber-500" />
                {currentQ.skill}
              </span>
            </div>

            {/* Current Question Block */}
            <div className="mt-3 p-4 rounded-xl bg-slate-50/80 border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0078D4] block mb-1">
                Current Question · #{currentQ.number}
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                "{currentQ.question}"
              </p>
            </div>

            {/* Candidate Response Area */}
            <div className="mt-4 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5 text-slate-500" />
                  Candidate Response (Live Audio Transcription)
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  Real-time Synthesized
                </span>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-700 leading-relaxed min-h-[110px] shadow-2xs font-normal">
                {currentQ.response}
              </div>
            </div>

            {/* Evaluated feedback block if triggered */}
            {evaluated && (
              <div className="mt-4 p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs animate-fadeIn space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  AI Evaluation Score: 92/100 (Advanced Competency)
                </div>
                <p className="text-emerald-900 leading-relaxed">
                  Candidate covered horizontal scaling, rate limiting algorithms (token bucket), distributed caching with Redis, and queue-based decoupling. Demonstrates production-grade system understanding.
                </p>
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentQIndex === 0}
                onClick={() => {
                  setCurrentQIndex((prev) => Math.max(0, prev - 1));
                  setEvaluated(false);
                }}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ArrowLeft className="h-3 w-3" />
                Previous
              </button>

              <button
                type="button"
                disabled={currentQIndex === mockQuestions.length - 1}
                onClick={() => {
                  setCurrentQIndex((prev) => Math.min(mockQuestions.length - 1, prev + 1));
                  setEvaluated(false);
                }}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Next Question
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleEvaluateResponse}
              disabled={evaluating}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0078D4] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#106EBE] transition-all disabled:opacity-75"
            >
              {evaluating ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  Analyzing Rubric...
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5 text-blue-200" />
                  Evaluate Response
                </>
              )}
            </button>
          </div>
        </div>

        {/* 4B. Candidate Insights (1/3 width) */}
        <div className="card-ai lg:col-span-1 p-6 flex flex-col justify-between relative">
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(0,120,212,0.25) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0078D4]/20 border border-[#0078D4]/30">
                  <Award className="h-4 w-4 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Candidate Insights</h3>
                  <p className="text-[10px] text-blue-200">Peter Parker · Live Rubric</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                85% Match
              </span>
            </div>

            {/* Metrics Breakdown with Progress Bars & Badges */}
            <div className="space-y-3 pt-1">
              {candidateInsights.map((insight) => (
                <div key={insight.metric} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-200 font-medium">{insight.metric}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-white/10 text-slate-200 border border-white/10">
                        {insight.rating}
                      </span>
                      <span className="font-mono font-bold text-white text-xs">
                        {insight.score}%
                      </span>
                    </div>
                  </div>

                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${insight.score}%`,
                        background: insight.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* AI Summary Note */}
            <div
              className="rounded-lg p-3 text-xs leading-relaxed mt-3"
              style={{
                background: 'rgba(15,23,42,0.55)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(226,232,240,0.9)',
              }}
            >
              “Candidate articulates strong fundamentals in caching tiers and decoupled queuing. Demonstrated high familiarity with production distributed systems.”
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/10 relative z-10 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Recommend for Next Round
            </span>
            <button
              type="button"
              className="text-xs font-semibold text-blue-300 hover:text-white transition-colors"
            >
              Export Summary
            </button>
          </div>
        </div>

      </div>

      {/* ── 5. Recent Interviews Table ───────────────────────────────────────── */}
      <div className="card-surface overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 pt-5 pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="h-4.5 w-4.5 text-[#0078D4]" />
              <h2 className="text-base font-bold text-slate-900">Recent Interviews</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Assessed candidates, evaluation scores, and recruitment decision status
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/70 pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#0078D4] focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80">
                {['Candidate', 'Role', 'Date', 'Skill Match', 'Status', 'Action'].map(
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
              {filteredInterviews.map((item) => (
                <tr
                  key={item.id}
                  className="group border-b border-slate-50 hover:bg-slate-50/70 transition-colors"
                >
                  {/* Candidate */}
                  <td className="px-4 py-3 pl-5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{ background: item.avatarBg }}
                      >
                        {item.candidateInitials}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 leading-tight">
                          {item.candidateName}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{item.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-700">{item.role}</p>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                    {item.date}
                  </td>

                  {/* Skill Match */}
                  <td className="px-4 py-3 min-w-[120px]">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-slate-200">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${item.skillMatch}%`,
                            background:
                              item.skillMatch >= 90
                                ? '#16a34a'
                                : item.skillMatch >= 80
                                ? '#0078D4'
                                : '#d97706',
                          }}
                        />
                      </div>
                      <span className="font-bold font-mono text-[11px] text-slate-800">
                        {item.skillMatch}%
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${item.statusColor}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3 pr-5 whitespace-nowrap">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:border-[#0078D4] hover:text-[#0078D4] hover:bg-blue-50/30 transition-all"
                    >
                      View Report
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

