---
id: 001
title: todo-backend-api-spec
stage: spec
date_iso: 2026-01-09
surface: agent
model: Claude Sonnet 4.5
feature: none
branch: 001-todo-backend-api
user: yates
command: /sp.specify
labels: ["specification", "backend", "api", "todo-application"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - specs/001-todo-backend-api/spec.md
  - specs/001-todo-backend-api/checklists/requirements.md
tests_yaml: []
---

# Todo Backend API Specification

## Prompt Text

Backend for Todo Full-Stack Web Application (Phase II)

Objective:
Design and implement a secure, production-ready FastAPI backend that provides a RESTful API for a multi-user todo application and integrates seamlessly with the Next.js frontend.1~
Target consumers:
- Authenticated frontend clients (Next.js App Router)
- Internal agents following spec-driven boundaries
Core responsibilities:
- Provide secure CRUD APIs for task management
- Enforce strict user-based data isolation
- Verify and authorize users via JWT issued by Better Auth
- Persist all data in Neon Serverless PostgreSQL
Authentication & security:
- All API endpoints MUST require JWT authentication
- JWT must be verified using BETTER_AUTH_SECRET
- JWT is received via `Authorization: Bearer <token>` header
- Extract authenticated user identity from JWT
- Backend must NEVER trust frontend-provided user IDs
- All task queries MUST be filtered by authenticated user
- Unauthorized requests return 401 Unauthorized
- Cross-user access attempts return 403 Forbidden or 404 Not Found
API design:
- Base path: /api/tasks
- Endpoints to implement:
  - GET    /api/tasks              → List user tasks
  - POST   /api/tasks              → Create task
- GET    /api/tasks/{id}          → Get task details
  - PUT    /api/tasks/{id}          → Update task
  - DELETE /api/tasks/{id}          → Delete task
  - PATCH  /api/tasks/{id}/complete → Toggle completion
- Use JSON request/response format
- Return proper HTTP status codes
- Use FastAPI dependency injection for auth and DB sessions
Data & persistence:
- Use SQLModel as ORM
- Database: Neon Serverless PostgreSQL
- Connection via environment variable:
  - Neon_db_url
- Task fields:
  - id (primary key)
  - user_id (string, from JWT)
  - title (required, 1–200 chars)
  - description (optional)
  - completed (boolean)
  - created_at
  - updated_at
- Index tasks by user_id for performance
Integration requirements:
- Fully compatible with frontend API client (/lib/api.ts)
- CORS configured for frontend origin (BETTER_AUTH_URL)
- Stateless backend (JWT-only, no sessions)
- Works correctly in docker-compose setup
Environment configuration:
- Neon_db_url
- BETTER_AUTH_SECRET
- BETTER_AUTH_URL
Success criteria:
- Backend rejects unauthenticated requests
- Each user can only access their own tasks
- All CRUD operations work correctly
- JWT verification works reliably
- Frontend can fully operate using this backend
- API is stable, predictable, and demo-ready
Constraints:
- Backend-only implementation
- No frontend UI changes
- No authentication provider implementation (Better Auth is external)
- No advanced features (recurrence, reminders, AI)
- Follow clean architecture and single-responsibility principles

## Response Text

Created a comprehensive specification for the Todo Backend API feature. The specification includes:

- User Stories with priorities (P1-P2) covering secure task management, authentication/authorization, and CRUD operations
- Detailed acceptance scenarios for each user story
- Edge cases including boundary conditions and error scenarios
- 16 functional requirements covering authentication, data isolation, API endpoints, data persistence, and integration
- Key entities (Task and User) with their attributes and relationships
- 8 measurable success criteria focusing on security, functionality, and performance

The specification follows the template structure and is ready for the planning phase. A quality checklist was also created to validate the specification completeness.

## Outcome

Specification created successfully in specs/001-todo-backend-api/spec.md with accompanying checklist in specs/001-todo-backend-api/checklists/requirements.md. The branch 001-todo-backend-api has been created for this feature.