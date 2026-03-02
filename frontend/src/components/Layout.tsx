import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="app">
    <aside className="sidebar">
      <h1>n8n AI Hub</h1>
      <nav>
        <Link to="/">Overview</Link>
        <Link to="/anomalies">Anomalies</Link>
        <Link to="/invoices">Invoices</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/workflows/ai-resume-screener">Workflow Detail</Link>
      </nav>
    </aside>
    <main>{children}</main>
  </div>
);
