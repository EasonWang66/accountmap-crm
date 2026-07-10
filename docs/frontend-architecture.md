# Frontend Architecture

## Overview

AccountMap CRM uses a React and TypeScript frontend with a graph-based organizational chart. The app is structured around a CRM shell, account workspace, reusable UI components, and a data layer that starts with local mock data but can be replaced by Supabase or an API service.

## Proposed Stack

- React for UI composition.
- TypeScript for type safety.
- Vite for local development and production builds.
- React Flow for graph rendering, node positioning, and edge interaction.
- Zustand for client-side workspace state.
- TanStack Query for server-state patterns and future API integration.
- React Hook Form and Zod for edit forms and validation.
- Tailwind CSS for design implementation.
- Vitest and React Testing Library for unit and component tests.
- Playwright for end-to-end user flows.

## App Structure

```text
src/
  app/
    App.tsx
    routes.tsx
  components/
    crm-shell/
    account-header/
    tabs/
    toolbar/
    org-chart/
    person-card/
    forms/
    ui/
  data/
    seed.ts
    mockApi.ts
  features/
    accounts/
    org-chart/
  hooks/
  stores/
  types/
  utils/
```

## Main Screens

- CRM account workspace.
- Organizational chart tab.
- Person edit modal or side panel.
- Empty state for accounts without chart data.
- Error and loading states for future remote data.

## Component Model

- `CrmShell`: Owns top-level layout, sidebar, and workspace frame.
- `SidebarNav`: Renders primary navigation items.
- `AccountHeader`: Renders account metadata and contact channels.
- `AccountTabs`: Controls workspace sections.
- `OrgChartWorkspace`: Owns chart toolbar, search, and React Flow canvas.
- `PersonNode`: Custom React Flow node for a contact card.
- `EditPersonPanel`: Handles add/edit person flows.
- `ChartToolbar`: Provides edit mode, view options, legend, info, and search.

## State Model

Use Zustand for UI state that belongs to the current workspace:

- selected account id
- active tab
- edit mode
- selected person id
- chart search query
- unsaved changes
- local node positions

Use TanStack Query for data that may later come from the backend:

- accounts
- account detail
- contacts
- org chart nodes
- org chart edges

## Interaction Design

The chart supports two modes:

- View mode: users inspect the hierarchy, search, select people, and open details.
- Edit mode: users can add, edit, delete, reposition, and reconnect people.

Destructive actions should use confirmation. Unsaved changes should be visible before leaving the chart.

## Accessibility

- Buttons use accessible names.
- Forms include labels and validation messages.
- Keyboard users can navigate tabs and forms.
- Selected chart nodes expose visible focus states.
- Color is not the only signal for selection or status.

## Performance Notes

- Keep person card rendering lightweight.
- Memoize custom node components where useful.
- Store chart data in normalized structures.
- Use search filtering without mutating source data.

