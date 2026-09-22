import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Users,
  AlertTriangle,
  Target,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Search,
  CheckCircle2,
  TrendingDown,
  BookOpen,
  Zap,
  Briefcase,
  GitBranch,
} from 'lucide-react';

// ─── Types & Interfaces ────────────────────────────────────────────────────────

interface SkillItem {
  name: string;
  category: 'Engineering' | 'Architecture' | 'AI/Data' | 'Security' | 'Management' | 'Core';
  level: number; // percentage (0-100)
  rating: string; // e.g., '4.4/5'
  tier: 'Advanced' | 'Proficient' | 'Developing' | 'Critical Gap';
  employeesCount: number;
}

interface SkillGapItem {
  skill: string;
  currentCoverage: number;
  requiredCoverage: number;
  gap: number;
  employeesAffected: number;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
}

interface EmployeeSkillRow {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  role: string;
  department: string;
  topSkills: string[];
  skillCoverage: number;
  primaryGap: string;
  gapSeverity: 'high' | 'medium' | 'low';
}

interface RoleRequirement {
  role: string;
  department: string;
  requiredSkills: string[];
  currentCoverage: number;
  gapStatus: 'Target Met' | 'Minor Gap' | 'Critical Gap';
  headcount: number;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const kpis = [
  {
    id: 'skills-tracked',
    label: 'Skills Tracked',
    value: '42',
    subtitle: '6 competency clusters',
    icon: Layers,
    iconBg: 'bg-blue-50',
    iconColor: 'text-[#0078D4]',
    valueColor: 'text-slate-900',
  },
  {
    id: 'employees-assessed',
    label: 'Employees Assessed',
    value: '59',
    subtitle: '100% Q4 workforce audit',
    icon: Users,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    valueColor: 'text-slate-900',
  },
  {
    id: 'critical-gaps',
    label: 'Critical Skill Gaps',
    value: '8',
    subtitle: 'Across 3 departments',
    icon: AlertTriangle,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-600',
    valueColor: 'text-red-600',
    isAlert: true,
  },
  {
    id: 'skill-coverage',
    label: 'Skill Coverage',
    value: '74',
    suffix: '%',
    subtitle: 'Target benchmark: 85%',
    icon: Target,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    valueColor: 'text-slate-900',
  },
];

const organizationSkills: SkillItem[] = [
  {
    name: 'Python',
    category: 'Engineering',
    level: 88,
    rating: '4.4/5',
    tier: 'Advanced',
    employeesCount: 24,
  },
  {
    name: 'Cloud Architecture',
    category: 'Architecture',
    level: 68,
    rating: '3.4/5',
    tier: 'Developing',
    employeesCount: 16,
  },
  {
    name: 'AI / Machine Learning',
    category: 'AI/Data',
    level: 76,
    rating: '3.8/5',
    tier: 'Proficient',
    employeesCount: 14,
  },
  {
    name: 'Data Engineering',
    category: 'AI/Data',
    level: 64,
    rating: '3.2/5',
    tier: 'Developing',
    employeesCount: 12,
  },
  {
    name: 'Cybersecurity',
    category: 'Security',
    level: 60,
    rating: '3.0/5',
    tier: 'Developing',
    employeesCount: 11,
  },
  {
    name: 'Project Management',
    category: 'Management',
    level: 52,
    rating: '2.6/5',
    tier: 'Critical Gap',
    employeesCount: 18,
  },
  {
    name: 'Communication',
    category: 'Core',
    level: 85,
    rating: '4.3/5',
    tier: 'Advanced',
    employeesCount: 42,
  },
  {
    name: 'System Design',
    category: 'Engineering',
    level: 80,
    rating: '4.0/5',
    tier: 'Proficient',
    employeesCount: 20,
  },
];

const topSkillGaps: SkillGapItem[] = [
  {
    skill: 'Project Management',
    currentCoverage: 52,
    requiredCoverage: 80,
    gap: -28,
    employeesAffected: 14,
    priority: 'High',
    category: 'Delivery & Planning',
  },
  {
    skill: 'Cloud Architecture',
    currentCoverage: 68,
    requiredCoverage: 85,
    gap: -17,
    employeesAffected: 9,
    priority: 'High',
    category: 'Infrastructure',
  },
  {
    skill: 'AI/ML',
    currentCoverage: 76,
    requiredCoverage: 90,
    gap: -14,
    employeesAffected: 6,
    priority: 'Medium',
    category: 'Applied AI',
  },
  {
    skill: 'Cybersecurity',
    currentCoverage: 60,
    requiredCoverage: 78,
    gap: -18,
    employeesAffected: 11,
    priority: 'High',
    category: 'SecOps & Compliance',
  },
  {
    skill: 'Data Engineering',
    currentCoverage: 64,
    requiredCoverage: 82,
    gap: -18,
    employeesAffected: 8,
    priority: 'Medium',
    category: 'Pipeline Systems',
  },
];

const employeeMatrix: EmployeeSkillRow[] = [
  {
    id: 'EMP001',
    name: 'Anudeep',
    initials: 'AN',
    avatarColor: '#dc2626',
    role: 'Senior Software Engineer',
    department: 'Engineering',
    topSkills: ['Python', 'FastAPI', 'Technical Execution'],
    skillCoverage: 72,
    primaryGap: 'Project Management',
    gapSeverity: 'high',
  },
  {
    id: 'EMP-1002',
    name: 'Eleven',
    initials: 'EL',
    avatarColor: '#ea580c',
    role: 'Software Engineer',
    department: 'Engineering',
    topSkills: ['React', 'TypeScript', 'Frontend Architecture'],
    skillCoverage: 68,
    primaryGap: 'Cloud Architecture',
    gapSeverity: 'high',
  },
  {
    id: 'EMP-1003',
    name: 'Walter White',
    initials: 'WW',
    avatarColor: '#d97706',
    role: 'Data Scientist',
    department: 'Analytics',
    topSkills: ['Python', 'Statistical Modeling', 'PyTorch'],
    skillCoverage: 76,
    primaryGap: 'Data Engineering',
    gapSeverity: 'medium',
  },
  {
    id: 'EMP-1005',
    name: 'Hermione Granger',
    initials: 'HG',
    avatarColor: '#7c3aed',
    role: 'ML Engineer',
    department: 'AI/ML',
    topSkills: ['NLP', 'Model Deployment', 'Python'],
    skillCoverage: 86,
    primaryGap: 'Distributed Systems',
    gapSeverity: 'low',
  },
  {
    id: 'EMP-1006',
    name: 'Tony Stark',
    initials: 'TS',
    avatarColor: '#0284c7',
    role: 'Principal Architect',
    department: 'Engineering',
    topSkills: ['System Design', 'Cloud Infra', 'FastAPI'],
    skillCoverage: 94,
    primaryGap: 'Sprint Documentation',
    gapSeverity: 'low',
  },
  {
    id: 'EMP-1007',
    name: 'Bruce Wayne',
    initials: 'BW',
    avatarColor: '#0f172a',
    role: 'Security Lead',
    department: 'Operations',
    topSkills: ['Cybersecurity', 'Threat Analysis', 'Auditing'],
    skillCoverage: 91,
    primaryGap: 'Cross-team Coaching',
    gapSeverity: 'low',
  },
];

const roleRequirements: RoleRequirement[] = [
  {
    role: 'Senior Software Engineer',
    department: 'Engineering',
    requiredSkills: ['Python / Node', 'System Design', 'Cloud Architecture', 'Project Planning'],
    currentCoverage: 72,
    gapStatus: 'Critical Gap',
    headcount: 14,
  },
  {
    role: 'ML Engineer',
    department: 'AI/ML',
    requiredSkills: ['PyTorch / TensorFlow', 'MLOps', 'Data Pipelines', 'Python'],
    currentCoverage: 84,
    gapStatus: 'Minor Gap',
    headcount: 8,
  },
  {
    role: 'Data Scientist',
    department: 'Analytics',
    requiredSkills: ['Statistical Modeling', 'SQL / BigQuery', 'Python', 'ETL Architecture'],
    currentCoverage: 78,
    gapStatus: 'Minor Gap',
    headcount: 6,
  },
  {
    role: 'DevOps / Cloud Engineer',
    department: 'Operations',
    requiredSkills: ['Kubernetes', 'Cloud Security', 'CI/CD Pipelines', 'Terraform'],
    currentCoverage: 70,
    gapStatus: 'Critical Gap',
    headcount: 5,
  },
  {
    role: 'Product Operations Lead',
    department: 'Operations',
    requiredSkills: ['Project Management', 'Workflow Automation', 'Agile Delivery', 'Communication'],
    currentCoverage: 88,
    gapStatus: 'Target Met',
    headcount: 4,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const SkillsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredMatrix = employeeMatrix.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.primaryGap.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const filteredSkills =
    selectedCategory === 'All'
      ? organizationSkills
      : organizationSkills.filter((s) => s.category === selectedCategory);

  return (
    <div className="space-y-7 animate-fadeIn pb-10">

      {/* ── 1. Page Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-2.5 py-1 text-[11px] font-semibold text-[#0078D4]">
              <Sparkles className="h-3 w-3" />
              Competency Matrix · Q4 2024
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Workforce Skill Graph
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-normal leading-relaxed">
            Map current capabilities against role requirements and identify skill gaps.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            to="/employees"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-all"
          >
            <Users className="h-3.5 w-3.5 text-slate-500" />
            View Directory
          </Link>
          <a
            href="#skill-matrix"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0078D4] px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#106EBE] transition-all"
          >
            <Zap className="h-3.5 w-3.5" />
            Explore Employee Matrix
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

                {kpi.isAlert && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-50 border border-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700">
                    <AlertTriangle className="h-2.5 w-2.5" /> Action needed
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-baseline gap-0.5">
                  <span
                    className={`text-3xl font-bold tabular-nums tracking-tight ${kpi.valueColor}`}
                  >
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

      {/* ── 3 + AI Insight: Organization Skill Overview & AI Panel ──────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Organization Skill Overview (2/3 width) */}
        <div className="card-surface lg:col-span-2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <Layers className="h-4.5 w-4.5 text-[#0078D4]" />
                  <h2 className="text-base font-bold text-slate-900">Organization Skill Overview</h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Proficiency levels across core engineering and operational capabilities
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
                {['All', 'Engineering', 'Architecture', 'AI/Data', 'Security', 'Management'].map(
                  (cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-md font-semibold transition-all whitespace-nowrap ${
                        selectedCategory === cat
                          ? 'bg-[#0078D4] text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Horizontal Proficiency Bars */}
            <div className="space-y-4">
              {filteredSkills.map((skill) => {
                const barColor =
                  skill.level >= 80
                    ? '#16a34a'
                    : skill.level >= 70
                    ? '#0078D4'
                    : skill.level >= 60
                    ? '#d97706'
                    : '#dc2626';

                return (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{skill.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          ({skill.employeesCount} assessed)
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            skill.tier === 'Advanced'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                              : skill.tier === 'Proficient'
                              ? 'bg-blue-50 text-[#0078D4] border border-blue-100'
                              : skill.tier === 'Developing'
                              ? 'bg-amber-50 text-amber-700 border border-amber-100'
                              : 'bg-red-50 text-red-700 border border-red-100'
                          }`}
                        >
                          {skill.tier}
                        </span>
                        <span className="font-mono font-bold text-slate-800 text-xs w-10 text-right">
                          {skill.level}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Track */}
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${skill.level}%`,
                          background: barColor,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Aggregated across 59 employee self-assessments and peer evaluations</span>
            <span className="font-semibold text-slate-700">Benchmark: 80% Proficient</span>
          </div>
        </div>

        {/* AI Skill Insight (1/3 width) */}
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
                  <h3 className="text-sm font-bold text-white">AI Skill Insight</h3>
                  <p className="text-[10px] text-blue-200">PerformIQ Skill Telemetry</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold bg-blue-500/20 text-blue-200 border border-blue-400/30">
                Live Signal
              </span>
            </div>

            {/* Core insight */}
            <div
              className="rounded-lg p-3.5 text-xs leading-relaxed"
              style={{
                background: 'rgba(15,23,42,0.5)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(226,232,240,0.95)',
              }}
            >
              “<strong className="text-white font-semibold">Project Management is the largest cross-functional skill gap</strong>, affecting multiple employees across Engineering and Operations.”
            </div>

            {/* Data bullet points */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Supporting Evidence
              </span>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-start gap-2 text-slate-200">
                  <TrendingDown className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
                  <span>Engineering shows a 28% gap in sprint task breakdown</span>
                </div>
                <div className="flex items-start gap-2 text-slate-200">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>14 engineers flagged for milestone estimation variance</span>
                </div>
                <div className="flex items-start gap-2 text-slate-200">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Technical capability (Python, System Design) remains strong (&gt;80%)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/10 relative z-10 flex items-center justify-between">
            <span className="text-[10px] text-slate-400">Confidence: 94%</span>
            <Link
              to="/insights"
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-300 hover:text-white transition-colors"
            >
              View Gap Action Plan <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

      </div>

      {/* ── 4. Top Skill Gaps (5 Cards Grid) ─────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-600" />
            <h2 className="text-base font-bold text-slate-900">Top Skill Gaps</h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">5 Priority Competencies</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {topSkillGaps.map((gapItem) => (
            <div
              key={gapItem.skill}
              className="card-surface p-4 flex flex-col justify-between hover:border-slate-300 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-1 mb-2">
                  <span className="text-xs font-bold text-slate-900 leading-tight">
                    {gapItem.skill}
                  </span>
                  {gapItem.priority === 'High' ? (
                    <span className="badge-high">High</span>
                  ) : (
                    <span className="badge-medium">Medium</span>
                  )}
                </div>

                <p className="text-[10px] text-slate-400 font-medium mb-3">{gapItem.category}</p>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Current:</span>
                    <strong className="text-slate-800 font-mono">{gapItem.currentCoverage}%</strong>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Required:</span>
                    <strong className="text-slate-800 font-mono">{gapItem.requiredCoverage}%</strong>
                  </div>
                  <div className="flex justify-between text-[11px] pt-1 border-t border-slate-100">
                    <span className="text-red-600 font-semibold">Deficit Gap:</span>
                    <strong className="text-red-600 font-mono font-bold">{gapItem.gap}%</strong>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                <span className="text-slate-500 flex items-center gap-1 font-medium">
                  <Users className="h-3 w-3 text-slate-400" /> {gapItem.employeesAffected} affected
                </span>
                <span className="text-[#0078D4] font-semibold">Q4 Priority</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. Employee Skill Matrix (Table) ─────────────────────────────────── */}
      <div id="skill-matrix" className="card-surface overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 pt-5 pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4.5 w-4.5 text-[#0078D4]" />
              <h2 className="text-base font-bold text-slate-900">Employee Skill Matrix</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Individual proficiency mapping and identified growth priorities
            </p>
          </div>

          {/* Table Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search employee or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/70 pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#0078D4] focus:outline-none"
            />
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80">
                {['Employee', 'Role', 'Top Skills', 'Skill Coverage', 'Primary Gap', 'Action'].map(
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
              {filteredMatrix.map((emp) => (
                <tr
                  key={emp.id}
                  className="group border-b border-slate-50 hover:bg-slate-50/70 transition-colors"
                >
                  {/* Employee */}
                  <td className="px-4 py-3 pl-5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{ background: emp.avatarColor }}
                      >
                        {emp.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 leading-tight">{emp.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{emp.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-700">{emp.role}</p>
                    <p className="text-[10px] text-slate-400">{emp.department}</p>
                  </td>

                  {/* Top Skills */}
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {emp.topSkills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-block rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700 border border-slate-200/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Skill Coverage */}
                  <td className="px-4 py-3 min-w-[130px]">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-slate-200">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${emp.skillCoverage}%`,
                            background:
                              emp.skillCoverage >= 85
                                ? '#16a34a'
                                : emp.skillCoverage >= 75
                                ? '#0078D4'
                                : '#dc2626',
                          }}
                        />
                      </div>
                      <span className="font-bold font-mono text-[11px] text-slate-800">
                        {emp.skillCoverage}%
                      </span>
                    </div>
                  </td>

                  {/* Primary Gap */}
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        emp.gapSeverity === 'high'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : emp.gapSeverity === 'medium'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <AlertTriangle className="h-2.5 w-2.5" />
                      {emp.primaryGap}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3 pr-5">
                    <Link
                      to={`/employees/${emp.id}`}
                      className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:border-[#0078D4] hover:text-[#0078D4] hover:bg-blue-50/30 transition-all whitespace-nowrap"
                    >
                      View Profile
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 6. Role Skill Requirements ───────────────────────────────────────── */}
      <div className="card-surface p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4.5 w-4.5 text-[#0078D4]" />
              <h2 className="text-base font-bold text-slate-900">Role Skill Requirements</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Standardized role competencies and workforce fulfillment benchmarks
            </p>
          </div>

          <span className="text-xs text-slate-500 font-medium">5 Core Job Families</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roleRequirements.map((req) => (
            <div
              key={req.role}
              className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{req.role}</h3>
                    <p className="text-[10px] text-slate-400">{req.department} · {req.headcount} active</p>
                  </div>

                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold border ${
                      req.gapStatus === 'Target Met'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : req.gapStatus === 'Minor Gap'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}
                  >
                    {req.gapStatus}
                  </span>
                </div>

                {/* Required skills tags */}
                <div className="mt-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                    Required Competencies
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {req.requiredSkills.map((sk) => (
                      <span
                        key={sk}
                        className="inline-block rounded bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Coverage bar */}
                <div className="mt-4 pt-3 border-t border-slate-200/70">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-500 font-medium">Current Cohort Coverage</span>
                    <span className="font-bold text-slate-900 font-mono">{req.currentCoverage}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${req.currentCoverage}%`,
                        background:
                          req.currentCoverage >= 85
                            ? '#16a34a'
                            : req.currentCoverage >= 75
                            ? '#0078D4'
                            : '#dc2626',
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2 flex items-center justify-between text-[10px] text-slate-400">
                <span>Target: 85%</span>
                <span className="text-[#0078D4] font-semibold">Audit Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 7. Supporting Skill Graph / Taxonomy Clusters ───────────────────── */}
      <div className="card-surface p-5 bg-gradient-to-r from-slate-50 to-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0078D4]/10 text-[#0078D4]">
            <GitBranch className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Workforce Competency Taxonomy Graph</h3>
            <p className="text-xs text-slate-500">
              42 competency nodes dynamically connected to job descriptions and sprint telemetry.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 shadow-2xs">
            <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
            8 Active Skill Gaps
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg bg-[#0078D4] px-3 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-[#106EBE] transition-all"
          >
            Update Taxonomy
          </button>
        </div>
      </div>

    </div>
  );
};

