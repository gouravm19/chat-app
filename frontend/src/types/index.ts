export type DashboardOverview = {
  totalExecutions: number;
  successRate: number;
  avgDuration: number;
  activeWorkflows: number;
  recentExecutions: Array<{ id: number; workflowName: string; status: string; durationMs: number; createdAt: string }>;
};
