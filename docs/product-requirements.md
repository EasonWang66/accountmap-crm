# Product Requirements: AccountMap CRM

## Summary

AccountMap CRM is a CRM account workspace centered on an editable organizational chart. The first release recreates the provided Figma default page as a polished React application and makes the organizational chart the main interactive feature.

## Target Users

- Account managers who need to understand decision-makers inside customer accounts.
- Recruiters or client-facing teams who map relationships across companies.
- Sales operations users who maintain account contact data.
- Engineering recruiters and resume reviewers evaluating frontend and full-stack capability.

## Problem Statement

Traditional CRM account pages often separate contact records from relationship context. Users can see who exists in an account, but they cannot easily understand hierarchy, influence, or reporting structure. AccountMap CRM gives users a visual, editable model of an account's organization directly inside the account detail page.

## Goals

- Build a Figma-faithful CRM account page using React and TypeScript.
- Implement an editable organizational chart with realistic graph interactions.
- Demonstrate component architecture, state management, and frontend testing.
- Document a practical backend path for persistence and full-stack credibility.
- Produce a project that can be hosted, linked from a Framer portfolio, and reviewed on GitHub.

## Non-Goals

- Full production CRM replacement.
- Multi-tenant billing, permissions, or analytics dashboards in the MVP.
- Real-time collaboration in the first release.
- Large backend implementation before the frontend experience is complete.

## MVP Scope

The MVP includes:

- Left CRM navigation.
- Account header for Coca-Cola.
- Account metadata including tags, description, phone, email, website, and address.
- Tab bar with Overview, Organizational Chart, Activity Timeline, Contract History, and Competitors.
- Organizational Chart as the active default tab.
- Toolbar with edit mode, view options, search, legend, and info controls.
- Person cards with title, name, location, relationship tags, and quick actions.
- Hierarchy connectors between people.
- Search and filter by person name, title, or team.
- Add/edit/delete person data.
- Move nodes and save chart layout.
- Local mock data persistence.

## Future Scope

- Supabase authentication.
- Postgres-backed accounts, contacts, nodes, and edges.
- Activity timeline data.
- Competitor comparison view.
- Role-based access control.
- Real-time collaboration and presence.
- Import/export org chart data.

## Success Criteria

- The app visually matches the Figma default page at desktop size.
- A user can edit org chart data without page reloads.
- A user can search the chart and clearly see matching contacts.
- Data state is typed, predictable, and documented.
- Core UI flows are covered by automated tests.
- The repo has clear setup, architecture, and deployment documentation.

