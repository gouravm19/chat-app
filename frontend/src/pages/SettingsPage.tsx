export const SettingsPage = () => (
  <div>
    <h2>Configuration</h2>
    <p>Configure OpenAI API key, Slack webhook URL, SMTP settings, and n8n credentials.</p>
    <form className="settings-form">
      <input placeholder="OpenAI API Key" />
      <input placeholder="Slack Webhook URL" />
      <input placeholder="SMTP Host" />
      <input placeholder="SMTP User" />
      <input placeholder="n8n URL" />
      <button type="button">Test Connection</button>
    </form>
  </div>
);
