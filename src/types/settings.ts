export interface UserProfileSettings {
  name: string;
  role: string;
  email: string;
  avatarInitials: string;
  avatarColor: string;
}

export interface OrganizationSettings {
  orgName: string;
  industry: string;
  employeeCount: number;
  departments: string[];
}

export interface NotificationToggles {
  aiInsightAlerts: boolean;
  performanceAlerts: boolean;
  skillGapAlerts: boolean;
  interviewUpdates: boolean;
  weeklySummary: boolean;
}

export interface AiPreferenceSettings {
  insightFrequency: 'realtime' | 'daily' | 'weekly';
  recommendationLevel: 'high_only' | 'high_medium' | 'all';
  confidenceThreshold: number; // e.g. 85%
}

export interface DataPrivacyItem {
  id: string;
  title: string;
  badgeText: string;
  badgeColor: string;
  description: string;
  iconName: string;
}
