# Implementation Plan

## Milestone 1: Project Foundation

- Create repo structure.
- Add formal documentation.
- Scaffold React, TypeScript, Vite, Tailwind, and testing tools.
- Add linting and formatting.
- Add seed data for the Coca-Cola account.

## Milestone 2: Static CRM Interface

- Build CRM shell and sidebar.
- Build account header.
- Build account tabs.
- Implement the Organizational Chart tab layout.
- Match the Figma default page at desktop size.

## Milestone 3: Org Chart Rendering

- Install and configure React Flow.
- Create custom person node component.
- Render Coca-Cola hierarchy from typed seed data.
- Add chart controls for zoom, legend, info, and search.

## Milestone 4: Editing Workflows

- Add edit mode.
- Add person create/edit form with React Hook Form and Zod.
- Support deleting people with confirmation.
- Support moving nodes and saving layout.
- Track unsaved changes.

## Milestone 5: Testing

- Add unit tests for data transforms.
- Add component tests for account header, tabs, toolbar, and person cards.
- Add integration tests for edit flows.
- Add Playwright tests for the main CRM workflow.

## Milestone 6: Full-Stack Extension

- Add Supabase schema.
- Replace mock API with Supabase data access.
- Add seed script or migration notes.
- Document auth and row-level security decisions.

## Milestone 7: Portfolio Polish

- Add final screenshots to README.
- Add deployment URL.
- Add Framer portfolio integration notes.
- Add resume bullets and interview talking points.

