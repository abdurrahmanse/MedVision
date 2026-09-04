# Project 05 — AI Data Analyst
## Complete Full-Stack Engineering Specification

## 1. Product Goal
Build a production-style AI analytics workspace where users upload datasets, inspect quality, ask questions in natural language, execute validated analysis tools in a sandbox, generate charts and receive explanations based on real computed results.

## 2. Applications

### Public Website
- `/`
- `/features`
- `/how-it-works`
- `/use-cases`
- `/security`
- `/pricing`
- `/docs`
- `/login`
- `/register`
- `/contact`
- `/privacy`
- `/terms`

Sections:
Hero, dataset-to-insight workflow, AI analyst demo, chart examples, data security, features, pricing, FAQ, CTA, footer.

### User App
- `/app`
- `/app/datasets`
- `/app/datasets/new`
- `/app/datasets/[id]`
- `/app/datasets/[id]/profile`
- `/app/analyst`
- `/app/analyst/[sessionId]`
- `/app/analyses`
- `/app/analyses/[id]`
- `/app/usage`
- `/app/settings`

### Admin
- `/admin`
- `/admin/users`
- `/admin/datasets`
- `/admin/analysis-runs`
- `/admin/sandboxes`
- `/admin/usage`
- `/admin/feedback`
- `/admin/audit-logs`
- `/admin/system`

## 3. Stack

### Frontend
Next.js, TypeScript, Tailwind, shadcn/ui, TanStack Query, Zustand, React Hook Form, Zod, TanStack Table, Apache ECharts/Recharts, Sonner.

### FastAPI packages
- fastapi
- uvicorn[standard]
- pydantic
- pydantic-settings
- sqlalchemy
- alembic
- asyncpg/psycopg
- python-multipart
- httpx
- tenacity
- argon2-cffi
- PyJWT
- redis
- celery/RQ
- structlog
- sentry-sdk
- OpenTelemetry
- pytest
- pytest-asyncio
- ruff
- mypy

### Data Science
- pandas
- numpy
- scipy
- scikit-learn
- duckdb

### AI
- OpenAI/Anthropic
- Structured Outputs
- tool/function calling
- optional LangGraph

### Storage/Execution
- R2/S3
- Docker-isolated workers
- resource limits
- network disabled by default

## 4. Database
- users
- sessions
- datasets
- dataset_versions
- dataset_columns
- data_quality_reports
- analysis_sessions
- analysis_messages
- analysis_runs
- generated_artifacts
- charts
- insights
- usage_records
- audit_logs

## 5. Safe Analysis Architecture
```text
Question
 → LLM intent parser
 → structured plan
 → plan validator
 → approved tools
 → sandbox
 → computed results
 → result validator
 → chart spec
 → explanation
 → UI
```

**Non-negotiable:** the LLM never becomes the numeric source of truth.

## 6. Analysis Tools
- profile_dataset
- describe_column
- filter_rows
- group_by
- aggregate
- sort
- join
- correlation
- time_series
- detect_outliers
- forecast
- statistical_test
- generate_chart
- export_analysis

Every tool has:
- Pydantic input schema
- authorization
- dataset version ID
- timeout
- CPU/memory limits
- result schema
- audit record

## 7. Features
- CSV/XLSX upload
- Dataset preview
- Automatic profiling
- Missing-value analysis
- Duplicate analysis
- Column statistics
- Natural-language analysis
- Result tables
- Charts
- Correlation
- Trends
- Outliers
- Forecasting
- Segment comparison
- Statistical tests
- Conversation history
- Saved analyses
- Re-run
- Export
- Usage tracking

## 8. Security
- Never execute arbitrary Python in FastAPI.
- Sandbox analysis workers.
- CPU/memory/disk/time limits.
- Disable outbound network by default.
- Dataset ownership.
- File limits.
- Temporary file cleanup.
- Rate limits.
- Chart schema validation.
- Audit analysis runs.

## 9. API
Auth, datasets, upload URLs, profiles, analysis sessions, messages, runs, cancellation, export, usage, admin, health.

## 10. UI
Dashboard:
- dataset count
- storage
- recent analyses
- usage
- failures

Dataset page:
- preview
- schema
- profile
- quality report

Analyst:
- dataset selector
- question composer
- progress
- generated plan
- result table
- chart
- explanation
- optional code preview
- rerun
- feedback

## 11. Testing
- File parser tests.
- Data profiler tests.
- Tool validation.
- Authorization.
- Sandbox isolation.
- Result validation.
- Chart schema.
- AI structured output.
- API integration.
- E2E upload → profile → analysis → chart → export.

## 12. Evaluation
Benchmark datasets/questions and measure:
- numeric correctness
- chart correctness
- plan correctness
- tool correctness
- hallucination rate
- execution failure rate
- latency
- cost
- reproducibility

## 13. Implementation Order

## Implementation Order

Follow this order and do not skip ahead:
1. Repository/monorepo setup and package boundaries.
2. Environment/configuration management.
3. Database schema and migrations.
4. Authentication and authorization.
5. Backend API foundation and error contract.
6. Storage/background jobs/queues.
7. Core backend domain features.
8. Frontend design system and shared layouts.
9. Public website pages.
10. Authenticated user application.
11. Admin application.
12. AI pipeline/tooling.
13. Observability, rate limits and security hardening.
14. Automated tests.
15. CI/CD.
16. Production deployment.
17. Performance audit and final QA.

At every phase:
- update migrations through Alembic;
- update API schemas;
- add tests;
- handle loading/error/empty states;
- update environment documentation;
- never bypass authorization because the UI hides a feature.

### Phase-specific order
1. Monorepo/tooling.
2. Database/auth.
3. Dataset upload/storage.
4. Parsing and profiling.
5. Data-quality engine.
6. Typed analysis tools.
7. Sandbox runner.
8. AI planner/tool calling.
9. Result validation.
10. Chart system.
11. Analyst UI.
12. Saved analyses/export.
13. Admin.
14. Evaluation benchmark.
15. Security hardening.
16. Tests.
17. CI/CD/deployment.
18. Performance/load testing.

## 14. Definition of Done
A real user can upload CSV/XLSX, inspect its profile, ask analytical questions, have the system execute validated computations safely, receive accurate tables/charts and grounded explanations, save/re-run/export analyses and manage datasets securely.
