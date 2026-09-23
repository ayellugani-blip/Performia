export interface Employee {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  role: string;
  department: string;
  manager: string;
  performance: number;
  goalCompletion: number;
  trend: 'improving' | 'stable' | 'slight-decline' | 'declining';
  aiSignal: string;
  aiSignalSeverity: 'high' | 'medium' | 'low';
  joinedYear: number;
  tenure: string;
  topSkills: string[];
  primaryGap: string;
  gapSeverity: 'high' | 'medium' | 'low';
  historyPoints?: { quarter: string; score: number; label: string; status: string; color: string; bg: string }[];
}

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'EMP-1001',
    name: 'Anudeep',
    initials: 'AN',
    avatarColor: '#dc2626',
    role: 'Senior Software Engineer',
    department: 'Engineering',
    manager: 'Sarah Connor',
    performance: 69,
    goalCompletion: 64,
    trend: 'declining',
    aiSignal: 'Deadline consistency',
    aiSignalSeverity: 'high',
    joinedYear: 2021,
    tenure: '3.5 Years',
    topSkills: ['Python', 'System Design', 'FastAPI', 'Problem Solving'],
    primaryGap: 'Project Management',
    gapSeverity: 'high',
    historyPoints: [
      { quarter: 'Q1', score: 88, label: '88%', status: 'Strong', color: '#16a34a', bg: 'bg-emerald-500' },
      { quarter: 'Q2', score: 84, label: '84%', status: 'Good', color: '#65a30d', bg: 'bg-lime-600' },
      { quarter: 'Q3', score: 76, label: '76%', status: 'Moderate', color: '#d97706', bg: 'bg-amber-500' },
      { quarter: 'Q4', score: 69, label: '69%', status: 'Declining', color: '#dc2626', bg: 'bg-red-600' },
    ],
  },
  {
    id: 'EMP-1002',
    name: 'Tony Stark',
    initials: 'TS',
    avatarColor: '#0078D4',
    role: 'Chief Technology Officer',
    department: 'Leadership',
    manager: 'Board of Directors',
    performance: 94,
    goalCompletion: 96,
    trend: 'improving',
    aiSignal: 'Top performer',
    aiSignalSeverity: 'low',
    joinedYear: 2018,
    tenure: '6 Years',
    topSkills: ['System Architecture', 'AI Engineering', 'Leadership', 'Cloud Infra'],
    primaryGap: 'Sprint Documentation',
    gapSeverity: 'low',
    historyPoints: [
      { quarter: 'Q1', score: 90, label: '90%', status: 'Excellent', color: '#16a34a', bg: 'bg-emerald-500' },
      { quarter: 'Q2', score: 92, label: '92%', status: 'Excellent', color: '#16a34a', bg: 'bg-emerald-500' },
      { quarter: 'Q3', score: 93, label: '93%', status: 'Top Tier', color: '#0078D4', bg: 'bg-blue-600' },
      { quarter: 'Q4', score: 94, label: '94%', status: 'Peak Output', color: '#0078D4', bg: 'bg-blue-600' },
    ],
  },
  {
    id: 'EMP-1003',
    name: 'Hermione Granger',
    initials: 'HG',
    avatarColor: '#7c3aed',
    role: 'ML Engineer',
    department: 'AI/ML',
    manager: 'Tony Stark',
    performance: 80,
    goalCompletion: 75,
    trend: 'slight-decline',
    aiSignal: 'Due-date consistency',
    aiSignalSeverity: 'medium',
    joinedYear: 2022,
    tenure: '2.5 Years',
    topSkills: ['NLP', 'Model Deployment', 'Python', 'PyTorch'],
    primaryGap: 'Distributed Systems',
    gapSeverity: 'medium',
    historyPoints: [
      { quarter: 'Q1', score: 86, label: '86%', status: 'Strong', color: '#16a34a', bg: 'bg-emerald-500' },
      { quarter: 'Q2', score: 85, label: '85%', status: 'Strong', color: '#16a34a', bg: 'bg-emerald-500' },
      { quarter: 'Q3', score: 82, label: '82%', status: 'Good', color: '#65a30d', bg: 'bg-lime-600' },
      { quarter: 'Q4', score: 80, label: '80%', status: 'Stable', color: '#7c3aed', bg: 'bg-purple-600' },
    ],
  },
  {
    id: 'EMP-1004',
    name: 'Peter Parker',
    initials: 'PP',
    avatarColor: '#db2777',
    role: 'Frontend Engineer',
    department: 'Engineering',
    manager: 'Anudeep',
    performance: 85,
    goalCompletion: 87,
    trend: 'stable',
    aiSignal: 'Consistent delivery',
    aiSignalSeverity: 'low',
    joinedYear: 2023,
    tenure: '1.5 Years',
    topSkills: ['React', 'TypeScript', 'Tailwind CSS', 'UI Testing'],
    primaryGap: 'Backend Architecture',
    gapSeverity: 'low',
    historyPoints: [
      { quarter: 'Q1', score: 81, label: '81%', status: 'Good', color: '#65a30d', bg: 'bg-lime-600' },
      { quarter: 'Q2', score: 83, label: '83%', status: 'Good', color: '#65a30d', bg: 'bg-lime-600' },
      { quarter: 'Q3', score: 85, label: '85%', status: 'Strong', color: '#16a34a', bg: 'bg-emerald-500' },
      { quarter: 'Q4', score: 85, label: '85%', status: 'Strong', color: '#16a34a', bg: 'bg-emerald-500' },
    ],
  },
  {
    id: 'EMP-1005',
    name: 'Bruce Wayne',
    initials: 'BW',
    avatarColor: '#1e293b',
    role: 'Security Architect',
    department: 'Security',
    manager: 'Tony Stark',
    performance: 91,
    goalCompletion: 93,
    trend: 'improving',
    aiSignal: 'High impact contributor',
    aiSignalSeverity: 'low',
    joinedYear: 2019,
    tenure: '5 Years',
    topSkills: ['Cybersecurity', 'Threat Analysis', 'Auditing', 'Risk Assessment'],
    primaryGap: 'Cross-team Coaching',
    gapSeverity: 'low',
    historyPoints: [
      { quarter: 'Q1', score: 87, label: '87%', status: 'Strong', color: '#16a34a', bg: 'bg-emerald-500' },
      { quarter: 'Q2', score: 89, label: '89%', status: 'Strong', color: '#16a34a', bg: 'bg-emerald-500' },
      { quarter: 'Q3', score: 90, label: '90%', status: 'Top Tier', color: '#0078D4', bg: 'bg-blue-600' },
      { quarter: 'Q4', score: 91, label: '91%', status: 'Peak Output', color: '#0078D4', bg: 'bg-blue-600' },
    ],
  },
  {
    id: 'EMP-1006',
    name: 'Wanda Maximoff',
    initials: 'WM',
    avatarColor: '#be123c',
    role: 'Senior Product Designer',
    department: 'Design',
    manager: 'Nick Fury',
    performance: 76,
    goalCompletion: 71,
    trend: 'declining',
    aiSignal: 'Reduced output velocity',
    aiSignalSeverity: 'high',
    joinedYear: 2021,
    tenure: '3 Years',
    topSkills: ['Figma', 'User Research', 'Design Systems', 'Prototyping'],
    primaryGap: 'Design Handoff Docs',
    gapSeverity: 'medium',
    historyPoints: [
      { quarter: 'Q1', score: 86, label: '86%', status: 'Strong', color: '#16a34a', bg: 'bg-emerald-500' },
      { quarter: 'Q2', score: 82, label: '82%', status: 'Good', color: '#65a30d', bg: 'bg-lime-600' },
      { quarter: 'Q3', score: 79, label: '79%', status: 'Moderate', color: '#d97706', bg: 'bg-amber-500' },
      { quarter: 'Q4', score: 76, label: '76%', status: 'Declining', color: '#dc2626', bg: 'bg-red-600' },
    ],
  },
  {
    id: 'EMP-1007',
    name: 'Walter White',
    initials: 'WW',
    avatarColor: '#d97706',
    role: 'Data Scientist',
    department: 'Analytics',
    manager: 'Sarah Connor',
    performance: 76,
    goalCompletion: 71,
    trend: 'declining',
    aiSignal: 'Production delivery',
    aiSignalSeverity: 'high',
    joinedYear: 2020,
    tenure: '4 Years',
    topSkills: ['Python', 'Statistical Modeling', 'SQL / BigQuery', 'PyTorch'],
    primaryGap: 'Data Engineering Pipelines',
    gapSeverity: 'high',
    historyPoints: [
      { quarter: 'Q1', score: 85, label: '85%', status: 'Strong', color: '#16a34a', bg: 'bg-emerald-500' },
      { quarter: 'Q2', score: 81, label: '81%', status: 'Good', color: '#65a30d', bg: 'bg-lime-600' },
      { quarter: 'Q3', score: 78, label: '78%', status: 'Moderate', color: '#d97706', bg: 'bg-amber-500' },
      { quarter: 'Q4', score: 76, label: '76%', status: 'Declining', color: '#dc2626', bg: 'bg-red-600' },
    ],
  },
  {
    id: 'EMP-1008',
    name: 'Eleven',
    initials: 'EL',
    avatarColor: '#ea580c',
    role: 'Software Engineer',
    department: 'Engineering',
    manager: 'Anudeep',
    performance: 72,
    goalCompletion: 68,
    trend: 'declining',
    aiSignal: 'Delivery trend',
    aiSignalSeverity: 'high',
    joinedYear: 2022,
    tenure: '2 Years',
    topSkills: ['JavaScript', 'Node.js', 'PostgreSQL', 'API Integration'],
    primaryGap: 'Sprint Estimation',
    gapSeverity: 'high',
    historyPoints: [
      { quarter: 'Q1', score: 82, label: '82%', status: 'Good', color: '#65a30d', bg: 'bg-lime-600' },
      { quarter: 'Q2', score: 78, label: '78%', status: 'Moderate', color: '#d97706', bg: 'bg-amber-500' },
      { quarter: 'Q3', score: 75, label: '75%', status: 'Moderate', color: '#d97706', bg: 'bg-amber-500' },
      { quarter: 'Q4', score: 72, label: '72%', status: 'Declining', color: '#dc2626', bg: 'bg-red-600' },
    ],
  },
  {
    id: 'EMP-1009',
    name: 'Indiana Jones',
    initials: 'IJ',
    avatarColor: '#ca8a04',
    role: 'Operations Coordinator',
    department: 'Operations',
    manager: 'Bruce Wayne',
    performance: 78,
    goalCompletion: 73,
    trend: 'slight-decline',
    aiSignal: 'Goal execution',
    aiSignalSeverity: 'medium',
    joinedYear: 2021,
    tenure: '3 Years',
    topSkills: ['Logistics', 'Vendor Management', 'Agile Operations', 'Resource Planning'],
    primaryGap: 'Process Automation',
    gapSeverity: 'medium',
    historyPoints: [
      { quarter: 'Q1', score: 84, label: '84%', status: 'Good', color: '#65a30d', bg: 'bg-lime-600' },
      { quarter: 'Q2', score: 82, label: '82%', status: 'Good', color: '#65a30d', bg: 'bg-lime-600' },
      { quarter: 'Q3', score: 80, label: '80%', status: 'Good', color: '#65a30d', bg: 'bg-lime-600' },
      { quarter: 'Q4', score: 78, label: '78%', status: 'Slight Decline', color: '#d97706', bg: 'bg-amber-500' },
    ],
  },
];

const DB_EMPLOYEE_NAMES: Record<string, string> = {
  EMP001: 'Anudeep',
  EMP002: 'Tony Stark',
  EMP003: 'Hermione Granger',
  EMP004: 'Peter Parker',
  EMP005: 'Bruce Wayne',
  EMP006: 'Wanda Maximoff',
  EMP007: 'Diana Prince',
  EMP008: 'Steve Rogers',
  EMP009: 'Natasha Romanoff',
  EMP010: 'Sherlock Holmes',
  EMP011: 'Eleven',
  EMP012: 'Thomas Anderson',
  EMP013: 'Katniss Everdeen',
  EMP014: 'Jack Sparrow',
  EMP015: 'Mia Wallace',
  EMP016: 'Harry Potter',
  EMP017: 'Wednesday Addams',
  EMP018: 'Peter Venkman',
  EMP019: 'Lara Croft',
  EMP020: 'Neo',
  EMP021: 'Tony Montana',
  EMP022: 'Amélie Poulain',
  EMP023: 'Walter White',
  EMP024: 'Daenerys Targaryen',
  EMP025: 'Indiana Jones',
};

export function getEmployeeById(id?: string): Employee {
  if (!id) return MOCK_EMPLOYEES[0];

  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const stored = sessionStorage.getItem('performia_employees');
      if (stored) {
        const list = JSON.parse(stored);
        const match = list.find((e: any) => e.id === id || e.id?.toUpperCase() === id?.toUpperCase());
        if (match) return match;
      }
    }
  } catch (_) {}

  const normalizedKey = id.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const dbName = DB_EMPLOYEE_NAMES[normalizedKey];

  const cleanedId = id.toUpperCase().replace(/^EMP/, 'EMP-');
  const num = parseInt(id.replace(/\D/g, ''), 10);
  const normalizedEmpId = !isNaN(num) ? `EMP-${1000 + (num % 1000)}` : '';

  const found = MOCK_EMPLOYEES.find(
    (e) =>
      e.id.toUpperCase() === id.toUpperCase() ||
      e.id.toUpperCase() === cleanedId ||
      (normalizedEmpId && e.id.toUpperCase() === normalizedEmpId) ||
      (dbName && e.name.toLowerCase() === dbName.toLowerCase()) ||
      e.name.toLowerCase() === id.toLowerCase()
  );

  const base = found || MOCK_EMPLOYEES[0];
  if (dbName && base.name !== dbName) {
    return { ...base, id, name: dbName };
  }
  return base;
}
