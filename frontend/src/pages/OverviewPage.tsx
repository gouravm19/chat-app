import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import { api } from '../api/client';
import { DashboardOverview } from '../types';

const colors = ['#00e5ff', '#ff6d00'];

export const OverviewPage = () => {
  const [data, setData] = useState<DashboardOverview | null>(null);

  useEffect(() => {
    api.get('/api/dashboard/overview').then((res) => setData(res.data.data));
  }, []);

  if (!data) return <p>Loading dashboard...</p>;

  const pie = [
    { name: 'Success', value: data.successRate },
    { name: 'Failed', value: 100 - data.successRate },
  ];

  const bars = [
    { name: 'Resume', ms: 1200 }, { name: 'PR Review', ms: 2400 }, { name: 'Standup', ms: 1800 },
    { name: 'Support', ms: 900 }, { name: 'Health', ms: 700 }, { name: 'Invoice', ms: 3600 }, { name: 'Social', ms: 1400 }, { name: 'Anomaly', ms: 1600 }
  ];

  return (
    <div>
      <h2>Overview Dashboard</h2>
      <div className="stats-grid">
        <div className="card">Total Executions: {data.totalExecutions}</div>
        <div className="card">Success Rate: {data.successRate.toFixed(1)}%</div>
        <div className="card">Avg Duration: {data.avgDuration.toFixed(1)} ms</div>
        <div className="card">Active Workflows: {data.activeWorkflows}</div>
      </div>
      <div className="charts">
        <LineChart width={320} height={200} data={bars}><XAxis dataKey="name"/><YAxis/><Tooltip/><Line dataKey="ms" stroke="#00e5ff"/></LineChart>
        <BarChart width={320} height={200} data={bars}><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="ms" fill="#ff6d00"/></BarChart>
        <PieChart width={320} height={200}><Pie data={pie} dataKey="value" cx="50%" cy="50%" outerRadius={70}>{pie.map((_, i) => <Cell key={i} fill={colors[i]} />)}</Pie></PieChart>
      </div>
      <h3>Recent Activity Feed</h3>
      <ul>
        {data.recentExecutions.slice(0, 20).map((e) => (
          <li key={e.id}>{e.workflowName} — {e.status} — {new Date(e.createdAt).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
};
