import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  Lightbulb,
  ArrowRight,
  ChevronDown,
  Users,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { MOCK_EMPLOYEES } from '../data/mockEmployees';

// ─── Types ────────────────────────────────────────────────────────────────────

type Trend = 'improving' | 'stable' | 'slight-decline' | 'declining';

interface Employee {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  role: string;
  department: string;
  performance: number;
  goalCompletion: number;
  trend: Trend;
  aiSignal: string;
  aiSignalSeverity: 'high' | 'medium' | 'low';
  joinedYear: number;
}

// ─── Filter Constants ─────────────────────────────────────────────────────────

const PERFORMANCE_FILTERS = ['All Performance', 'High (≥85%)', 'Medium (70–84%)', 'Needs Attention (<70%)'];
const TREND_FILTERS = ['All Trends', 'Improving', 'Stable', 'Slight Decline', 'Declining'];

// ─── Sub-Components ───────────────────────────────────────────────────────────

const TrendBadge: React.FC<{ trend: Trend }> = ({ trend }) => {
  const config = {
    improving: {
      icon: TrendingUp,
      label: 'Improving',
      className: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
    stable: {
      icon: Minus,
      label: 'Stable',
      className: 'bg-slate-100 text-slate-600 border-slate-200',
    },
    'slight-decline': {
      icon: Minus,
      label: 'Slight Decline',
      className: 'bg-amber-50 text-amber-700 border-amber-100',
    },
    declining: {
      icon: TrendingDown,
      label: 'Declining',
      className: 'bg-red-50 text-red-700 border-red-100',
    },
  };

  const { icon: Icon, label, className } = config[trend];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap ${className}`}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
};

const PerformanceCell: React.FC<{ value: number }> = ({ value }) => {
  const color = value >= 85 ? '#16a34a' : value >= 70 ? '#d97706' : '#dc2626';
  const bg = value >= 85 ? '#dcfce7' : value >= 70 ? '#fef3c7' : '#fee2e2';

  return (
    <div className="flex items-center gap-2.5 min-w-[110px]">
      <div className="flex-1 h-1.5 rounded-full" style={{ background: bg }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
      <span className="text-xs font-bold tabular-nums w-8 text-right" style={{ color }}>
        {value}%
      </span>
    </div>
  );
};

const AiSignalBadge: React.FC<{ signal: string; severity: Employee['aiSignalSeverity'] }> = ({
  signal,
  severity,
}) => {
  const cls =
    severity === 'high'
      ? 'bg-red-50 text-red-700 border-red-100'
      : severity === 'medium'
      ? 'bg-amber-50 text-amber-700 border-amber-100'
      : 'bg-blue-50 text-[#0078D4] border-blue-100';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-semibold leading-none max-w-[160px] truncate ${cls}`}
    >
      <Lightbulb className="h-2.5 w-2.5 shrink-0" />
      <span className="truncate">{signal}</span>
    </span>
  );
};

interface SelectFilterProps {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}

const SelectFilter: React.FC<SelectFilterProps> = ({ label, value, options, onChange }) => {
  const isActive = value !== options[0];
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none rounded-lg border px-3 py-2 pr-8 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#0078D4]/20 cursor-pointer ${
          isActive
            ? 'border-[#0078D4]/50 bg-blue-50 text-[#0078D4]'
            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
        }`}
        aria-label={label}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        className={`pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 ${
          isActive ? 'text-[#0078D4]' : 'text-slate-400'
        }`}
      />
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [performanceFilter, setPerformanceFilter] = useState(PERFORMANCE_FILTERS[0]);
  const [trendFilter, setTrendFilter] = useState(TREND_FILTERS[0]);
  const [sortField, setSortField] = useState<keyof Employee | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/employees');
      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();

      const mapped: Employee[] = data.map((item: any, idx: number) => {
        const match = MOCK_EMPLOYEES.find(
          (m) => m.id === item.id || m.name.toLowerCase() === (item.name || '').toLowerCase()
        );
        const colors = [
          '#dc2626',
          '#0078D4',
          '#7c3aed',
          '#db2777',
          '#1e293b',
          '#be123c',
          '#0369a1',
          '#ea580c',
          '#16a34a',
          '#d97706',
        ];

        const initials = item.name
          ? item.name
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)
          : 'EM';

        return {
          id: item.id || match?.id || `EMP-${1000 + idx}`,
          name: item.name || match?.name || 'Unnamed Employee',
          initials: match?.initials || initials,
          avatarColor: match?.avatarColor || colors[idx % colors.length],
          role: item.role || match?.role || 'Employee',
          department: item.department || match?.department || 'General',
          performance: match?.performance ?? (typeof item.performance === 'number' ? item.performance : 80),
          goalCompletion: match?.goalCompletion ?? (typeof item.goalCompletion === 'number' ? item.goalCompletion : 75),
          trend: match?.trend ?? item.trend ?? 'stable',
          aiSignal: match?.aiSignal ?? item.aiSignal ?? 'On track',
          aiSignalSeverity: match?.aiSignalSeverity ?? item.aiSignalSeverity ?? 'low',
          joinedYear: item.created_at ? new Date(item.created_at).getFullYear() : (match?.joinedYear ?? 2022),
        };
      });

      setEmployees(mapped);
      try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          sessionStorage.setItem('performia_employees', JSON.stringify(mapped));
        }
      } catch (_) {}
    } catch (err: any) {
      setError(err.message || 'Failed to connect to employee backend API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const DEPARTMENTS = useMemo(() => {
    const list = Array.from(new Set(employees.map((e) => e.department))).sort();
    return ['All Departments', ...list];
  }, [employees]);

  const ROLES = useMemo(() => {
    const list = Array.from(new Set(employees.map((e) => e.role))).sort();
    return ['All Roles', ...list];
  }, [employees]);

  const hasFilters =
    search.trim() !== '' ||
    departmentFilter !== 'All Departments' ||
    roleFilter !== 'All Roles' ||
    performanceFilter !== PERFORMANCE_FILTERS[0] ||
    trendFilter !== TREND_FILTERS[0];

  const clearFilters = () => {
    setSearch('');
    setDepartmentFilter('All Departments');
    setRoleFilter('All Roles');
    setPerformanceFilter(PERFORMANCE_FILTERS[0]);
    setTrendFilter(TREND_FILTERS[0]);
  };

  const handleSort = (field: keyof Employee) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filtered = useMemo(() => {
    let result = [...employees];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.role.toLowerCase().includes(q) ||
          e.department.toLowerCase().includes(q) ||
          e.id.toLowerCase().includes(q)
      );
    }

    // Department
    if (departmentFilter !== 'All Departments') {
      result = result.filter((e) => e.department === departmentFilter);
    }

    // Role
    if (roleFilter !== 'All Roles') {
      result = result.filter((e) => e.role === roleFilter);
    }

    // Performance
    if (performanceFilter === 'High (≥85%)') {
      result = result.filter((e) => e.performance >= 85);
    } else if (performanceFilter === 'Medium (70–84%)') {
      result = result.filter((e) => e.performance >= 70 && e.performance < 85);
    } else if (performanceFilter === 'Needs Attention (<70%)') {
      result = result.filter((e) => e.performance < 70);
    }

    // Trend
    if (trendFilter === 'Improving') result = result.filter((e) => e.trend === 'improving');
    else if (trendFilter === 'Stable') result = result.filter((e) => e.trend === 'stable');
    else if (trendFilter === 'Slight Decline') result = result.filter((e) => e.trend === 'slight-decline');
    else if (trendFilter === 'Declining') result = result.filter((e) => e.trend === 'declining');

    // Sort
    if (sortField) {
      result.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortAsc ? aVal - bVal : bVal - aVal;
        }
        return sortAsc
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }

    return result;
  }, [employees, search, departmentFilter, roleFilter, performanceFilter, trendFilter, sortField, sortAsc]);

  // Summary stats
  const total = employees.length;
  const atRisk = employees.filter((e) => e.trend === 'declining').length;
  const avgPerf = total > 0 ? Math.round(employees.reduce((s, e) => s + e.performance, 0) / total) : 0;
  const improving = employees.filter((e) => e.trend === 'improving').length;

  interface SortableHeaderProps {
    field: keyof Employee;
    children: React.ReactNode;
  }

  const SortableHeader: React.FC<SortableHeaderProps> = ({ field, children }) => (
    <button
      type="button"
      onClick={() => handleSort(field)}
      className="inline-flex items-center gap-1 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-700 transition-colors group"
    >
      {children}
      <ArrowUpDown
        className={`h-3 w-3 transition-colors ${
          sortField === field ? 'text-[#0078D4]' : 'text-slate-300 group-hover:text-slate-400'
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0078D4]/10">
              <Users className="h-4 w-4 text-[#0078D4]" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Workforce Directory
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Employees
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Explore employee performance, skills and AI insights.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {total} employees
          </span>
        </div>
      </div>

      {/* ── Summary Stat Pills ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Employees', value: total, color: 'text-slate-800', bg: 'bg-white' },
          { label: 'Avg. Performance', value: `${avgPerf}%`, color: 'text-[#0078D4]', bg: 'bg-white' },
          { label: 'At Risk', value: atRisk, color: 'text-red-600', bg: 'bg-white' },
          { label: 'Improving', value: improving, color: 'text-emerald-600', bg: 'bg-white' },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`card-surface ${stat.bg} px-4 py-3 flex flex-col gap-0.5`}
          >
            <span className={`text-xl font-bold tabular-nums ${stat.color}`}>{stat.value}</span>
            <span className="text-[11px] text-slate-400 font-medium">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* ── Toolbar: Search + Filters ─────────────────────────────────────── */}
      <div className="card-surface p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search employees by name, role or ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs text-slate-800 placeholder-slate-400 transition focus:border-[#0078D4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0078D4]/20"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded text-slate-400 hover:text-slate-700"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Filters row */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filter
            </div>
            <SelectFilter
              label="Department"
              value={departmentFilter}
              options={DEPARTMENTS}
              onChange={setDepartmentFilter}
            />
            <SelectFilter
              label="Role"
              value={roleFilter}
              options={ROLES}
              onChange={setRoleFilter}
            />
            <SelectFilter
              label="Performance"
              value={performanceFilter}
              options={PERFORMANCE_FILTERS}
              onChange={setPerformanceFilter}
            />
            <SelectFilter
              label="Trend"
              value={trendFilter}
              options={TREND_FILTERS}
              onChange={setTrendFilter}
            />

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-[11px] font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Active filter summary */}
        {hasFilters && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-slate-400 font-medium">Showing</span>
            <span className="text-[11px] font-bold text-slate-700">
              {filtered.length} of {total} employees
            </span>
            {search && (
              <span className="rounded-full bg-blue-50 border border-blue-100 px-2 py-0.5 text-[10px] font-semibold text-[#0078D4]">
                Search: "{search}"
              </span>
            )}
            {departmentFilter !== 'All Departments' && (
              <span className="rounded-full bg-blue-50 border border-blue-100 px-2 py-0.5 text-[10px] font-semibold text-[#0078D4]">
                {departmentFilter}
              </span>
            )}
            {roleFilter !== 'All Roles' && (
              <span className="rounded-full bg-blue-50 border border-blue-100 px-2 py-0.5 text-[10px] font-semibold text-[#0078D4]">
                {roleFilter}
              </span>
            )}
            {performanceFilter !== PERFORMANCE_FILTERS[0] && (
              <span className="rounded-full bg-blue-50 border border-blue-100 px-2 py-0.5 text-[10px] font-semibold text-[#0078D4]">
                {performanceFilter}
              </span>
            )}
            {trendFilter !== TREND_FILTERS[0] && (
              <span className="rounded-full bg-blue-50 border border-blue-100 px-2 py-0.5 text-[10px] font-semibold text-[#0078D4]">
                {trendFilter}
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── Loading / Error / Table Container ───────────────────────────── */}
      {loading ? (
        <div className="card-surface p-16 text-center flex flex-col items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0078D4]">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Loading Employees Directory…</p>
            <p className="text-xs text-slate-400 mt-1">Connecting to http://127.0.0.1:8000/api/employees</p>
          </div>
        </div>
      ) : error ? (
        <div className="card-surface p-12 text-center flex flex-col items-center justify-center gap-3 border-red-200 bg-red-50/20">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Unable to load employees</p>
            <p className="text-xs font-mono text-red-600 mt-1 max-w-md">{error}</p>
          </div>
          <button
            type="button"
            onClick={fetchEmployees}
            className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#0078D4] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#0060b0] transition"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry Connection
          </button>
        </div>
      ) : (
        <div className="card-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-100" style={{ background: '#f8fafc' }}>
                  <th className="px-5 py-3 text-left">
                    <SortableHeader field="name">Employee</SortableHeader>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <SortableHeader field="role">Role</SortableHeader>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <SortableHeader field="department">Department</SortableHeader>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <SortableHeader field="performance">Performance</SortableHeader>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <SortableHeader field="goalCompletion">Goal Completion</SortableHeader>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <SortableHeader field="trend">Trend</SortableHeader>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      AI Signal
                    </span>
                  </th>
                  <th className="px-4 py-3 pr-5 text-right">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Action
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                          <Users className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-700">No employees found</p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Try adjusting your search or filters.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={clearFilters}
                          className="mt-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
                        >
                          Clear all filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((emp, idx) => (
                    <tr
                      key={emp.id}
                      className="group border-b border-slate-50 transition-colors hover:bg-slate-50/80"
                      style={{
                        animationDelay: `${idx * 40}ms`,
                      }}
                    >
                      {/* Employee */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          {/* Avatar */}
                          <div
                            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-sm"
                            style={{ background: emp.avatarColor }}
                          >
                            {emp.initials}
                            {/* Online/status dot — color by trend */}
                            <span
                              className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-white"
                              style={{
                                background:
                                  emp.trend === 'improving'
                                    ? '#16a34a'
                                    : emp.trend === 'stable'
                                    ? '#94a3b8'
                                    : emp.trend === 'slight-decline'
                                    ? '#d97706'
                                    : '#dc2626',
                              }}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 leading-tight">
                              {emp.name}
                            </p>
                            <p className="text-[11px] text-slate-400 font-mono mt-0.5">{emp.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-4 py-3.5">
                        <p className="text-xs font-medium text-slate-700 leading-tight max-w-[160px]">
                          {emp.role}
                        </p>
                      </td>

                      {/* Department */}
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center rounded-md border border-slate-200/80 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                          {emp.department}
                        </span>
                      </td>

                      {/* Performance */}
                      <td className="px-4 py-3.5">
                        <PerformanceCell value={emp.performance} />
                      </td>

                      {/* Goal Completion */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="text-xs font-bold tabular-nums"
                            style={{
                              color:
                                emp.goalCompletion >= 85
                                  ? '#16a34a'
                                  : emp.goalCompletion >= 70
                                  ? '#d97706'
                                  : '#dc2626',
                            }}
                          >
                            {emp.goalCompletion}%
                          </span>
                          <div
                            className="h-1.5 w-12 rounded-full overflow-hidden"
                            style={{
                              background:
                                emp.goalCompletion >= 85
                                  ? '#dcfce7'
                                  : emp.goalCompletion >= 70
                                  ? '#fef3c7'
                                  : '#fee2e2',
                            }}
                          >
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${emp.goalCompletion}%`,
                                background:
                                  emp.goalCompletion >= 85
                                    ? '#16a34a'
                                    : emp.goalCompletion >= 70
                                    ? '#d97706'
                                    : '#dc2626',
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Trend */}
                      <td className="px-4 py-3.5">
                        <TrendBadge trend={emp.trend} />
                      </td>

                      {/* AI Signal */}
                      <td className="px-4 py-3.5">
                        <AiSignalBadge signal={emp.aiSignal} severity={emp.aiSignalSeverity} />
                      </td>

                      {/* Action */}
                      <td className="px-4 py-3.5 pr-5 text-right">
                        <Link
                          to={`/employees/${emp.id}`}
                          state={{ employee: emp }}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-[#0078D4]/40 hover:bg-blue-50/40 hover:text-[#0078D4] group-hover:shadow-md"
                        >
                          View
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          {filtered.length > 0 && (
            <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 bg-slate-50/50">
              <p className="text-[11px] text-slate-400">
                Showing <span className="font-semibold text-slate-600">{filtered.length}</span> of{' '}
                <span className="font-semibold text-slate-600">{total}</span> employees
              </p>
              <p className="text-[11px] text-slate-400">
                Sorted by{' '}
                <span className="font-semibold text-slate-600">
                  {sortField ?? 'default'}
                </span>{' '}
                · {sortAsc ? '↑ Ascending' : '↓ Descending'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Bottom Breathing Room ──────────────────────────────────────────── */}
      <div className="h-4" />
    </div>
  );
};
