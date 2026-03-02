import { useParams } from 'react-router-dom';

export const WorkflowDetailPage = () => {
  const { name } = useParams();
  return (
    <div>
      <h2>Workflow: {name}</h2>
      <p>Description, execution history, logs, and trigger controls for this workflow.</p>
      <button>Trigger test run</button>
      <a href="/workflows/01-ai-resume-screener.json" download>Import to n8n</a>
    </div>
  );
};
