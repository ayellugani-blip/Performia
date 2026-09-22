import React, { useState } from 'react';
import {
  User,
  Building2,
  Bell,
  Cpu,
  ShieldCheck,
  Check,
  Sparkles,
  Save,
  Lock,
  Eye,
  Sliders,
  Mail,
  Briefcase,
  Layers,
  Plus,
  X,
  FileText,
  Database,
  CheckCircle2,
  Edit3,
  Sun,
  Moon,
} from 'lucide-react';
import type {
  UserProfileSettings,
  OrganizationSettings,
  NotificationToggles,
  AiPreferenceSettings,
} from '../types/settings';
import { currentUser } from '../data/currentUser';
import { useTheme } from '../context/ThemeContext';

export const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();

  // ─── 1. Profile State (bound to shared currentUser object) ─────────────────
  const [profile, setProfile] = useState<UserProfileSettings>({
    name: currentUser.name,
    role: currentUser.role,
    email: currentUser.email,
    avatarInitials: currentUser.initials,
    avatarColor: currentUser.avatarColor,
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // ─── 2. Organization State ──────────────────────────────────────────────────
  const [organization, setOrganization] = useState<OrganizationSettings>({
    orgName: 'Contoso Global Enterprise',
    industry: 'Enterprise Technology & Software',
    employeeCount: 62,
    departments: [
      'Engineering',
      'AI/ML',
      'Product & Design',
      'Sales & Marketing',
      'Finance',
      'Operations',
      'Quality Assurance',
    ],
  });
  const [newDepartment, setNewDepartment] = useState('');
  const [showAddDeptInput, setShowAddDeptInput] = useState(false);

  // ─── 3. Notifications State ─────────────────────────────────────────────────
  const [notifications, setNotifications] = useState<NotificationToggles>({
    aiInsightAlerts: true,
    performanceAlerts: true,
    skillGapAlerts: true,
    interviewUpdates: false,
    weeklySummary: true,
  });

  // ─── 4. AI Preferences State ────────────────────────────────────────────────
  const [aiPreferences, setAiPreferences] = useState<AiPreferenceSettings>({
    insightFrequency: 'daily',
    recommendationLevel: 'high_medium',
    confidenceThreshold: 85,
  });

  // ─── Save State ─────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<
    'all' | 'profile' | 'organization' | 'notifications' | 'aipref' | 'privacy'
  >('all');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Handle Save
  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 600);
  };

  // Toggle notification helper
  const toggleNotification = (key: keyof NotificationToggles) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Add department handler
  const handleAddDepartment = () => {
    if (newDepartment.trim() && !organization.departments.includes(newDepartment.trim())) {
      setOrganization((prev) => ({
        ...prev,
        departments: [...prev.departments, newDepartment.trim()],
      }));
      setNewDepartment('');
      setShowAddDeptInput(false);
    }
  };

  // Remove department handler
  const handleRemoveDepartment = (deptToRemove: string) => {
    setOrganization((prev) => ({
      ...prev,
      departments: prev.departments.filter((d) => d !== deptToRemove),
    }));
  };

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* ── 1. PAGE HEADER ───────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0078D4] mb-1">
            <span>Performia</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600">Settings</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 tracking-tight sm:text-3xl">
            Settings
          </h1>
          {/* Prompt Subtitle requirement */}
          <p className="mt-1 text-sm text-slate-500 font-normal leading-relaxed">
            Manage your Performia workspace and preferences.
          </p>
        </div>

        {/* Global Save Button in Header */}
        <div className="flex items-center gap-3">
          {saveStatus === 'saved' && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 animate-fadeIn">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Changes saved successfully!
            </span>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="inline-flex items-center gap-2 rounded-lg bg-[#0078D4] px-4 py-2 text-xs font-semibold text-white hover:bg-[#106ebe] transition-all shadow-2xs cursor-pointer active:scale-95 disabled:opacity-75"
          >
            {saveStatus === 'saving' ? (
              <>
                <span className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : saveStatus === 'saved' ? (
              <>
                <Check className="h-4 w-4" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── 2. QUICK NAVIGATION TABS ─────────────────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#EFF6FC] text-[#0078D4] border border-blue-200 shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Sliders className="h-4 w-4" />
          <span>All Settings</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[#EFF6FC] text-[#0078D4] border border-blue-200 shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <User className="h-4 w-4" />
          <span>Profile</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('organization')}
          className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'organization'
              ? 'bg-[#EFF6FC] text-[#0078D4] border border-blue-200 shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Building2 className="h-4 w-4" />
          <span>Organization</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'notifications'
              ? 'bg-[#EFF6FC] text-[#0078D4] border border-blue-200 shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Bell className="h-4 w-4" />
          <span>Notifications</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('aipref')}
          className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'aipref'
              ? 'bg-[#EFF6FC] text-[#0078D4] border border-blue-200 shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Cpu className="h-4 w-4 text-[#0078D4]" />
          <span>AI Preferences</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('privacy')}
          className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'privacy'
              ? 'bg-[#EFF6FC] text-[#0078D4] border border-blue-200 shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>Data & Privacy</span>
        </button>
      </div>

      {/* ── 3. SETTINGS SECTIONS ─────────────────────────────────────────── */}
      <div className="space-y-6">
        
        {/* ── SECTION 1: PROFILE ────────────────────────────────────────── */}
        {(activeTab === 'all' || activeTab === 'profile') && (
          <div className="card-elevated p-6 sm:p-7 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0078D4] border border-blue-100">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                    1. Profile
                  </h2>
                  <p className="text-xs text-slate-500">
                    Personal identity, avatar, and enterprise access credentials.
                  </p>
                </div>
              </div>

              {/* Edit Profile Button */}
              <button
                type="button"
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all border cursor-pointer ${
                  isEditingProfile
                    ? 'bg-blue-50 text-[#0078D4] border-blue-200'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>{isEditingProfile ? 'Done Editing' : 'Edit Profile'}</span>
              </button>
            </div>

            <div className="pt-6 space-y-6">
              {/* Profile Avatar Row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${profile.avatarColor} text-xl font-bold text-white shadow-md ring-4 ring-white`}>
                  {profile.avatarInitials}
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">Profile Avatar</h4>
                  <p className="text-xs text-slate-500">
                    JPG, PNG or GIF. Recommended size 256x256 pixels.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => alert('Avatar upload modal opened')}
                      className="rounded bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 border border-slate-200 hover:bg-slate-100 transition-colors"
                    >
                      Change Avatar
                    </button>
                    <button
                      type="button"
                      onClick={() => setProfile((p) => ({ ...p, avatarInitials: currentUser.initials }))}
                      className="text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-slate-400" /> Name
                  </label>
                  <input
                    type="text"
                    disabled={!isEditingProfile}
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className={`w-full rounded-lg border px-3.5 py-2 text-xs font-semibold text-slate-900 transition-all focus:outline-none ${
                      isEditingProfile
                        ? 'border-[#0078D4] bg-white ring-2 ring-blue-100'
                        : 'border-slate-200 bg-slate-50/70'
                    }`}
                  />
                </div>

                {/* Role */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5 text-slate-400" /> Role
                  </label>
                  <input
                    type="text"
                    disabled={!isEditingProfile}
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className={`w-full rounded-lg border px-3.5 py-2 text-xs font-semibold text-slate-900 transition-all focus:outline-none ${
                      isEditingProfile
                        ? 'border-[#0078D4] bg-white ring-2 ring-blue-100'
                        : 'border-slate-200 bg-slate-50/70'
                    }`}
                  />
                </div>

                {/* Email */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-slate-400" /> Email
                  </label>
                  <input
                    type="email"
                    disabled={!isEditingProfile}
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className={`w-full rounded-lg border px-3.5 py-2 text-xs font-semibold text-slate-900 transition-all focus:outline-none ${
                      isEditingProfile
                        ? 'border-[#0078D4] bg-white ring-2 ring-blue-100'
                        : 'border-slate-200 bg-slate-50/70'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SECTION 2: ORGANIZATION ────────────────────────────────────── */}
        {(activeTab === 'all' || activeTab === 'organization') && (
          <div className="card-elevated p-6 sm:p-7 bg-white">
            <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  2. Organization
                </h2>
                <p className="text-xs text-slate-500">
                  Workspace metadata, industry classification, employee count, and department directory.
                </p>
              </div>
            </div>

            <div className="pt-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Organization Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    value={organization.orgName}
                    onChange={(e) => setOrganization({ ...organization, orgName: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-[#0078D4] focus:outline-none"
                  />
                </div>

                {/* Industry */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Industry
                  </label>
                  <select
                    value={organization.industry}
                    onChange={(e) => setOrganization({ ...organization, industry: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-[#0078D4] focus:outline-none cursor-pointer"
                  >
                    <option value="Enterprise Technology & Software">Enterprise Technology & Software</option>
                    <option value="Financial Services & Banking">Financial Services & Banking</option>
                    <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
                    <option value="Retail & E-commerce">Retail & E-commerce</option>
                    <option value="Manufacturing & Supply Chain">Manufacturing & Supply Chain</option>
                  </select>
                </div>

                {/* Employee Count */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Employee Count
                  </label>
                  <input
                    type="number"
                    value={organization.employeeCount}
                    onChange={(e) => setOrganization({ ...organization, employeeCount: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-[#0078D4] focus:outline-none"
                  />
                </div>
              </div>

              {/* Departments Directory */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-purple-600" /> Departments ({organization.departments.length})
                  </label>

                  {!showAddDeptInput && (
                    <button
                      type="button"
                      onClick={() => setShowAddDeptInput(true)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0078D4] hover:underline cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Department
                    </button>
                  )}
                </div>

                {/* Add Dept Input box */}
                {showAddDeptInput && (
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-50/50 border border-blue-200">
                    <input
                      type="text"
                      placeholder="Department name (e.g. Legal, Security)"
                      value={newDepartment}
                      onChange={(e) => setNewDepartment(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddDepartment()}
                      className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddDepartment}
                      className="rounded-md bg-[#0078D4] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#106ebe]"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddDeptInput(false)}
                      className="rounded-md bg-white border border-slate-200 p-1.5 text-slate-500 hover:text-slate-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* Department Tags Grid */}
                <div className="flex flex-wrap gap-2">
                  {organization.departments.map((dept) => (
                    <span
                      key={dept}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200/80 hover:border-slate-300 transition-colors"
                    >
                      <span>{dept}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDepartment(dept)}
                        className="text-slate-400 hover:text-red-600 transition-colors"
                        title={`Remove ${dept}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SECTION 3: NOTIFICATIONS ────────────────────────────────────── */}
        {(activeTab === 'all' || activeTab === 'notifications') && (
          <div className="card-elevated p-6 sm:p-7 bg-white">
            <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  3. Notifications
                </h2>
                <p className="text-xs text-slate-500">
                  Configure real-time telemetry alerts, performance triggers, and executive email summaries.
                </p>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              {/* 1. AI Insight Alerts */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">AI Insight Alerts</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Receive instant notifications when new high-priority workforce insights are generated.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotification('aiInsightAlerts')}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    notifications.aiInsightAlerts ? 'bg-[#0078D4]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      notifications.aiInsightAlerts ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 2. Performance Alerts */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Performance Alerts</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Get notified when employee performance metrics drop below defined target thresholds.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotification('performanceAlerts')}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    notifications.performanceAlerts ? 'bg-[#0078D4]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      notifications.performanceAlerts ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 3. Skill Gap Alerts */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Skill Gap Alerts</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Alerts for critical skill shortages identified across department goals and project roadmaps.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotification('skillGapAlerts')}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    notifications.skillGapAlerts ? 'bg-[#0078D4]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      notifications.skillGapAlerts ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 4. Interview Updates */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Interview Updates</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Notifications for scheduled 1-on-1 performance review retrospectives and 360 feedback sessions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotification('interviewUpdates')}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    notifications.interviewUpdates ? 'bg-[#0078D4]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      notifications.interviewUpdates ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 5. Weekly Summary */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Weekly Summary</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Automated executive digest delivered every Monday morning summarizing team performance trends.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotification('weeklySummary')}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    notifications.weeklySummary ? 'bg-[#0078D4]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      notifications.weeklySummary ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── SECTION 4: AI PREFERENCES ───────────────────────────────────── */}
        {(activeTab === 'all' || activeTab === 'aipref') && (
          <div className="card-elevated p-6 sm:p-7 bg-white">
            <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0078D4] border border-blue-100">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                    4. AI Preferences
                  </h2>
                  <span className="rounded-full bg-blue-50 px-2 py-0.2 text-[10px] font-bold text-[#0078D4] border border-blue-200">
                    PerformIQ Engine
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Tune synthesis frequency, recommendation filters, and confidence sensitivity cutoffs.
                </p>
              </div>
            </div>

            <div className="pt-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* AI Insight Frequency */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-[#0078D4]" /> AI Insight Frequency
                  </label>
                  <select
                    value={aiPreferences.insightFrequency}
                    onChange={(e) => setAiPreferences({
                      ...aiPreferences,
                      insightFrequency: e.target.value as 'realtime' | 'daily' | 'weekly',
                    })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-[#0078D4] focus:outline-none cursor-pointer"
                  >
                    <option value="realtime">Real-time Synthesis (Continuous)</option>
                    <option value="daily">Daily Summary (Default - 09:00 AM)</option>
                    <option value="weekly">Weekly Batch (Mondays)</option>
                  </select>
                  <p className="text-[11px] text-slate-400">Controls how often PerformIQ scans telemetry for new risk signals.</p>
                </div>

                {/* Recommendation Notifications */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                    <Sliders className="h-3.5 w-3.5 text-purple-600" /> Recommendation Notifications
                  </label>
                  <select
                    value={aiPreferences.recommendationLevel}
                    onChange={(e) => setAiPreferences({
                      ...aiPreferences,
                      recommendationLevel: e.target.value as 'high_only' | 'high_medium' | 'all',
                    })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-[#0078D4] focus:outline-none cursor-pointer"
                  >
                    <option value="high_only">High Priority Only (Urgent Risks)</option>
                    <option value="high_medium">High & Medium Priority (Default)</option>
                    <option value="all">All Recommendations (Include Low Priority)</option>
                  </select>
                  <p className="text-[11px] text-slate-400">Filters action items pushed to managerial dashboard feeds.</p>
                </div>
              </div>

              {/* Workspace Theme & Texture Preferences */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-[#0078D4]" /> Workspace Theme Mode
                  </label>
                  <span className="text-xs font-semibold text-slate-500">
                    Active: <strong className="text-[#0078D4] capitalize">{theme} Theme</strong>
                  </span>
                </div>

                <p className="text-xs text-slate-500">
                  Choose your preferred visual presentation style across Performia (Light, Dark, or Mix Cyber-Enterprise).
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {/* Light Theme Card */}
                  <button
                    type="button"
                    onClick={() => setTheme('light')}
                    className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                      theme === 'light'
                        ? 'border-[#0078D4] bg-white ring-2 ring-blue-100 shadow-sm'
                        : 'border-slate-200 bg-white hover:bg-slate-100/60'
                    }`}
                  >
                    <Sun className={`h-6 w-6 mb-1.5 ${theme === 'light' ? 'text-[#0078D4]' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-slate-900">Light Theme</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">High-contrast tactile canvas</span>
                  </button>

                  {/* Dark Theme Card */}
                  <button
                    type="button"
                    onClick={() => setTheme('dark')}
                    className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                      theme === 'dark'
                        ? 'border-[#0078D4] bg-slate-900 ring-2 ring-blue-100 text-white shadow-sm'
                        : 'border-slate-800 bg-slate-900/90 text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <Moon className={`h-6 w-6 mb-1.5 ${theme === 'dark' ? 'text-sky-400' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-white">Dark Theme</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">Sleek midnight obsidian</span>
                  </button>

                  {/* Mix Theme Card */}
                  <button
                    type="button"
                    onClick={() => setTheme('mix')}
                    className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                      theme === 'mix'
                        ? 'border-[#0078D4] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white ring-2 ring-blue-100 shadow-sm'
                        : 'border-slate-300 bg-slate-800 text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <Layers className={`h-6 w-6 mb-1.5 ${theme === 'mix' ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-white">Mix Theme</span>
                    <span className="text-[10px] text-slate-300 mt-0.5">Cyber-enterprise hybrid</span>
                  </button>
                </div>
              </div>

              {/* Insight Confidence Threshold */}
              <div className="space-y-2.5 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Insight Confidence Threshold
                  </label>
                  <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                    {aiPreferences.confidenceThreshold}% Minimum Certainty
                  </span>
                </div>

                <p className="text-xs text-slate-500">
                  Insights below this statistical confidence score are suppressed to prevent false-positive alerts.
                </p>

                <div className="flex items-center gap-4 pt-1">
                  <span className="text-xs font-bold text-slate-400">70%</span>
                  <input
                    type="range"
                    min="70"
                    max="95"
                    step="5"
                    value={aiPreferences.confidenceThreshold}
                    onChange={(e) => setAiPreferences({
                      ...aiPreferences,
                      confidenceThreshold: Number(e.target.value),
                    })}
                    className="flex-1 accent-[#0078D4] cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-400">95%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SECTION 5: DATA & PRIVACY ───────────────────────────────────── */}
        {(activeTab === 'all' || activeTab === 'privacy') && (
          <div className="card-elevated p-6 sm:p-7 bg-white">
            <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  5. Data & Privacy
                </h2>
                <p className="text-xs text-slate-500">
                  Enterprise security standards, role-based access boundaries, and zero-retention privacy commitments.
                </p>
              </div>
            </div>

            <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Data Processing */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Database className="h-4 w-4 text-[#0078D4]" />
                    Data Processing
                  </h4>
                  <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#0078D4] border border-blue-200">
                    AES-256 Encrypted
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  All telemetry, feedback, and performance data is encrypted in transit (TLS 1.3) and at rest (AES-256) inside your isolated enterprise tenant storage.
                </p>
              </div>

              {/* 2. AI Analysis */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Cpu className="h-4 w-4 text-purple-600" />
                    AI Analysis Policy
                  </h4>
                  <span className="rounded bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700 border border-purple-200">
                    Zero Model Retention
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  PerformIQ processes metrics on ephemeral inference containers. Your private workforce data is strictly isolated and never used to train public models.
                </p>
              </div>

              {/* 3. Workforce Data Access */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Eye className="h-4 w-4 text-amber-600" />
                    Workforce Data Access
                  </h4>
                  <span className="rounded bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
                    RBAC Enforced
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Role-Based Access Control (RBAC) is strictly enforced. Only authorized HR Administrators and designated department leads can inspect individual review files.
                </p>
              </div>

              {/* 4. Privacy Information */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Lock className="h-4 w-4 text-emerald-600" />
                    Privacy Information
                  </h4>
                  <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                    SOC 2 / GDPR Compliant
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fully compliant with SOC 2 Type II, ISO 27001, and GDPR enterprise privacy mandates. Immutable audit logs are maintained for all access requests.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── 4. BOTTOM SAVE ACTION BAR ────────────────────────────────────── */}
      <div className="card-elevated p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-slate-200">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <FileText className="h-4 w-4 text-slate-400" />
          <span>Settings changes apply immediately across your Performia organization workspace.</span>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0078D4] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#106ebe] transition-all shadow-2xs cursor-pointer active:scale-95 disabled:opacity-75"
        >
          {saveStatus === 'saving' ? (
            <>
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Saving Preferences...</span>
            </>
          ) : saveStatus === 'saved' ? (
            <>
              <Check className="h-4 w-4" />
              <span>Saved Successfully</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
