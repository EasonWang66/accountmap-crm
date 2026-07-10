# AccountMap CRM

AccountMap CRM is a frontend-focused customer relationship management workspace built around an editable organizational chart for account mapping. The project is designed as a portfolio-ready software engineering case study, with React-based UI architecture, production-style documentation, and a light full-stack data model that can be backed by Supabase or a custom API.

## Live Demo

Demo URL: To be added after deployment.

## Project Status

Planning and implementation setup are in progress.

## Why This Project

Sales, recruiting, and account management teams often need more than a flat contact list. They need to understand who reports to whom, who influences decisions, and where relationship gaps exist inside an account. AccountMap CRM turns a company profile into an interactive workspace where users can inspect and edit an account's organizational structure.

## Core Features

- CRM shell with persistent navigation for Home, Accounts, Leads, and Requisitions.
- Account detail page modeled after the Finovatech Figma design.
- Account summary header with company metadata and contact channels.
- Tabbed workspace for overview, organizational chart, activity timeline, contract history, and competitors.
- Editable organizational chart with person cards, hierarchy lines, relationship tags, and search.
- Add, edit, delete, and reposition org chart contacts.
- Mock persistence first, with a documented path to Supabase/Postgres.
- Loading, empty, error, and unsaved-change states.

## Tech Stack

- React
- TypeScript
- Vite
- React Flow
- Zustand
- TanStack Query
- React Hook Form
- Zod
- Tailwind CSS
- Vitest
- React Testing Library
- Playwright
- Storybook, planned after MVP
- Supabase/Postgres, planned as a full-stack milestone

## Documentation

- [Product Requirements](docs/product-requirements.md)
- [Frontend Architecture](docs/frontend-architecture.md)
- [Data Model](docs/data-model.md)
- [Implementation Plan](docs/implementation-plan.md)
- [Testing Strategy](docs/testing-strategy.md)

## Engineering Positioning

This project is intentionally frontend-heavy. The primary hiring signal is the ability to build a polished, complex, data-driven React interface with strong state management, reusable components, graph-based interactions, and realistic testing. The backend scope is included to show full-stack awareness without taking attention away from the core frontend product.

## Planned Local Development

```bash
npm install
npm run dev
npm run test
npm run test:e2e
```

## Planned Deployment

The frontend will be deployed as a static web application and linked from the owner's Framer portfolio. If Supabase is added, the hosted Supabase project will provide authentication and Postgres persistence while the app remains accessible through the Framer project page.

