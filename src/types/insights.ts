export type PriorityLevel = 'High' | 'Medium' | 'Low';

export type InsightStatus = 'Active' | 'In Review' | 'Actioned' | 'Resolved';

export interface AffectedEmployee {
  id: string;
  name: string;
  role: string;
  department: string;
  avatarUrl?: string;
  initials: string;
  color: string;
}

export interface AiInsight {
  id: string;
  title: string;
  department: string;
  category: 'Performance' | 'Retention Risk' | 'Leadership Gap' | 'Skills Alignment' | 'Operational Risk';
  priority: PriorityLevel;
  status: InsightStatus;
  date: string;
  timestamp: string;
  
  // Core 5-stage insight schema requested by specification
  insight: string;             // Main AI Insight statement
  evidence: string;            // Supporting Evidence
  reason: string;              // Root cause / Reason analysis
  impact: string;              // Business & operational Impact
  recommendedAction: string;   // Recommended Action for manager/HR
  
  affectedEmployees: AffectedEmployee[];
  affectedCount: number;
  confidenceScore: number;    // e.g. 94% confidence
  modelSource?: string;        // e.g. "PerformIQ-v2.4-fastapi"
}

export interface KpiCardData {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  changeLabel: string;
  changeType: 'up' | 'down' | 'neutral' | 'alert';
  iconName: 'BrainCircuit' | 'AlertTriangle' | 'Users' | 'CheckCircle2' | 'Sparkles';
  iconBgClass: string;
  iconColorClass: string;
  badgeText?: string;
}

export interface TimelineInsightItem {
  id: string;
  date: string;
  insightTitle: string;
  department: string;
  affectedCount: number;
  priority: PriorityLevel;
  status: InsightStatus;
  rawInsightRefId: string;
}

export interface PipelineStageNode {
  id: string;
  title: string;
  subtitle: string;
  type: 'input' | 'process' | 'output';
  items?: string[];
  iconName: string;
  colorClass: string;
}
