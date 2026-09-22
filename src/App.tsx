import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { OverviewPage } from './pages/OverviewPage';
import { EmployeesPage } from './pages/EmployeesPage';
import { EmployeeDetailPage } from './pages/EmployeeDetailPage';
import { PerformancePage } from './pages/PerformancePage';
import { SkillsPage } from './pages/SkillsPage';
import { InterviewsPage } from './pages/InterviewsPage';
import { InsightsPage } from './pages/InsightsPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Defined Routes */}
          <Route index element={<OverviewPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="employees/:id" element={<EmployeeDetailPage />} />
          <Route path="performance" element={<PerformancePage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="interviews" element={<InterviewsPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          
          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
