# n8n AI Workflow Automation Hub

![n8n](https://img.shields.io/badge/n8n-Self--Hosted-EA4B71)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991)
![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot%203.2-6DB33F)
![React](https://img.shields.io/badge/Dashboard-React%2018-61DAFB)
![Docker](https://img.shields.io/badge/Deploy-Docker%20Compose-2496ED)

Production-ready automation stack that combines **n8n + OpenAI + Spring Boot + React** for enterprise automation and observability.

- 🤖 8 production-ready AI-powered workflows (importable JSON)
- 🚀 One-command deployment with Docker Compose
- 📊 Live dashboard for executions, anomalies, and invoices
- 🔧 Spring Boot companion API for enterprise integration patterns

---

## The 8 Workflows

| Workflow | Trigger | AI Used For | Business Value |
|---|---|---|---|
| AI Resume Screener | Webhook | Resume-job fit scoring and recommendations | Cuts recruiter screening time |
| GitHub PR AI Review | GitHub webhook | Security/performance quality review | Faster, more consistent reviews |
| Daily Standup Report | Weekday cron | Team activity summarization | Saves PM/manager reporting time |
| Support Ticket Triage | Webhook | Category/priority classification + response suggestion | Speeds support routing and SLA handling |
| API Health Monitor | Every 5 min cron | Incident cause + immediate action recommendations | Reduces MTTR |
| Invoice Processing | Email polling | Structured extraction from invoice text | Automates finance data entry |
| Social Content Generator | Webhook | LinkedIn + X + Dev summary generation | Accelerates content marketing |
| Kafka Metrics Anomaly Detector | Every 10 min cron | Statistical anomaly interpretation | Early risk detection |

---

## Architecture Diagram

```text
┌───────────────┐      ┌─────────────┐      ┌──────────────┐
│   React App   │◄────►│ Spring Boot │◄────►│ PostgreSQL    │
│  (Dashboard)  │      │ Companion   │      │ + Redis       │
└──────▲────────┘      │ API :8080   │      └──────────────┘
       │                └──────▲──────┘
       │                       │
       │                 HTTP/JWT from n8n
       │                       │
┌──────┴────────┐      ┌───────┴───────┐      ┌──────────────┐
│  Browser/User │◄────►│ n8n :5678     │◄────►│ OpenAI GPT-4o │
│  /Integrations│      │ Workflows Hub │      │ + SaaS APIs   │
└───────────────┘      └───────────────┘      └──────────────┘
```

---

## Quick Start (30 minutes)

```bash
# 1) Clone
 git clone https://github.com/gouravm19/n8n-ai-workflow-hub
 cd n8n-ai-workflow-hub

# 2) Configure secrets
 cp .env.example .env
 # Add OPENAI_API_KEY and COMPANION_API_JWT_SECRET

# 3) Start all services
 make start

# 4) Import all 8 workflows automatically
 make import

# 5) Open n8n
 # http://localhost:5678 (admin / Admin@n8n)

# 6) Open dashboard
 # http://localhost:3000
```

---

## Repository Layout

```text
.
├── docker-compose.yml
├── workflows/                       # 8 importable n8n workflow JSONs
├── backend/                         # Spring Boot 3.2 companion API
├── frontend/                        # React 18 dashboard
├── scripts/import-workflows.sh      # Batch import/activate script
├── Makefile
└── .env.example
```

---

## Cost to Run (estimate with GPT-4o-mini)

| Workflow | Typical tokens | Estimated cost/execution |
|---|---:|---:|
| Resume Screener | ~5K | $0.01–$0.03 |
| PR AI Review | ~12K | $0.03–$0.08 |
| Standup Generator | ~8K | $0.02–$0.05 |
| Support Triage | ~4K | $0.01–$0.03 |
| API Incident Analysis | ~3K | <$0.01 |
| Invoice Extraction | ~6K | $0.02–$0.04 |
| Social Generator | ~7K | $0.02–$0.05 |
| Anomaly Detector | ~5K | $0.01–$0.03 |

---

## Customize Each Workflow

1. Open n8n at `http://localhost:5678`.
2. Configure credentials for OpenAI, GitHub, Jira, SMTP, Slack, etc.
3. Open each imported workflow and update endpoint URLs/headers.
4. Enable/disable nodes based on your stack (e.g., Airtable vs Google Sheets).
5. Activate workflow.

---

## Connect Real Services

- **GitHub**: add Personal Access Token, set PR webhook to `/webhook/github-pr-review`.
- **Jira**: set Jira cloud URL and token-based auth headers.
- **Slack**: use incoming webhook URL in workflow HTTP nodes.
- **Gmail/SMTP**: configure SMTP credential in n8n.
- **Stripe/ERP/CRM**: call via HTTP nodes or route through companion API for custom auth.

---

## Why n8n over Zapier/Make?

- ✅ Self-hosted and privacy-friendly.
- ✅ No per-task execution lock-in costs.
- ✅ Full-code escape hatch with JS nodes + companion API.
- ✅ Better fit for enterprise change-control and observability.

---

## Built By

**Gourav Mishra** — Senior Backend Developer @ Emerson, Pune  
GitHub: [@gouravm19](https://github.com/gouravm19)  
Email: gauravmishra19995@gmail.com  
Portfolio: gouravmishra.is-a.dev

> Demonstrating how AI-powered automation can reduce manual processing time by **40%+**, inspired by production improvements delivered with Kafka-based async processing at Emerson.
