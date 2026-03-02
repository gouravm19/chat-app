import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { OverviewPage } from './pages/OverviewPage';
import { WorkflowDetailPage } from './pages/WorkflowDetailPage';
import { AnomaliesPage } from './pages/AnomaliesPage';
import { InvoicesPage } from './pages/InvoicesPage';
import { SettingsPage } from './pages/SettingsPage';

export const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<OverviewPage />} />
      <Route path="/workflows/:name" element={<WorkflowDetailPage />} />
      <Route path="/anomalies" element={<AnomaliesPage />} />
      <Route path="/invoices" element={<InvoicesPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  </Layout>
);
