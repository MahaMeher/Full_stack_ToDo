---
id: 1
title: Create Initial Constitution
stage: constitution
date: 2026-01-08
surface: agent
model: Claude Sonnet 4.5
feature: none
branch: master
user: user
command: sp.constitution
labels: [constitution, governance, setup]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
---

## Prompt

 You are an expert in spec-driven agentic software development for hackathons. Your task is to generate a complete "constitution.md" file for Phase II of the hackathon project. This constitution is the foundational guiding document that defines the project's principles, constraints, requirements, development rules, and structure. It will be placed at the root of the monorepo and used by all agents (Claude Code, Spec-Kit Plus) throughout development.

Project Context:
- Project Name: Todo Full-Stack Web Application (Phase II: Basic Level Functionality)
- Evolution: Transforming the Phase I in-memory console TODO app into a modern multi-user web application with persistent storage and authentication.
- Core Features: Retain the 5 basic TODO operations (Add task with title & description, View/List tasks with status, Update task, Delete task, Mark complete/incomplete) but now as a full-stack web app with user isolation.
- Additional Features: User signup/signin, RESTful API, responsive frontend, Neon Serverless PostgreSQL persistence.
- Authentication: Better Auth (frontend) issuing JWT tokens, verified by FastAPI backend using shared BETTER_AUTH_SECRET.

Development Approach:
- Sesponsiveness, error handling, security

## 4. Technology Constraints
Detailed stack with versions and mandatory patterns (App Router, SQLModel, JWT flow, shared secret, etc.)

## 5. Development Rules & Workflow
- How to use Spec-Kit Plus and @specs/ referencing
- Role of multiple CLAUDE.md files
- Agent delegation pattern
- Iteration and review process

## 6. Project Structure
Complete monorepo folder layout with descriptions of key files and directories

## 7. Security & Authentication Mandate
Dedicated section explaining JWT flow, shared secret, ownership enforcement, required middleware and required middleware and headers

## 8. Success Criteria
Clear, verifiable conditions for Phase II completion (e.g., multi-user demo works end-to-end, runs via docker-compose, all features functional and secure)

## Response snapshot

I've successfully created the constitution file based on your requirements, replacing all the placeholder tokens with specific information for the Todo Full-Stack Web Application (Phase II):

The new constitution.md file includes:

- Core Principles (Multi-User Isolation First, Authentication-Driven Architecture, Full-Stack Integration, Persistent Storage Requirement, Responsive Web Application Standard, RESTful API Design)
- Technology Constraints (Frontend Stack, Backend Stack, API Integration Patterns, Infrastructure Requirements)
- Development Rules & Workflow (Spec-Kit Plus Usage, Agent Delegation Pattern, CLAUDE.md Files Role, Iteration and Review Process)
- Project Structure (Monorepo Layout, Key Files and Directories)
- Security & Authentication Mandate (JWT Token Flow, Task Ownership Enforcement, Required Middleware, Security Headers)
- Success Criteria (Multi-User End-to-End Functionality, Authentication and Authorization Validation, Docker Compose Deployment, API and Database Integration, User Interface Requirements, Phase II Completion Declaration)

The constitution is now in place as the foundational governing document for the project.

## Outcome

- ✅ Impact: Created foundational constitution document with comprehensive principles and guidelines
- 🧪 Tests: N/A (documentation creation)
- 📁 Files: Updated .specify/memory/constitution.md with complete constitution
- 🔁 Next prompts: Continue with feature development following constitution guidelines
- 🧠 Reflection: Constitution provides clear governance framework for multi-agent development

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin feature development following constitution principles