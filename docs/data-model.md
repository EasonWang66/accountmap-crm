# Data Model

## Overview

The MVP starts with typed local seed data. The schema is designed so it can later move to Supabase/Postgres with minimal changes.

## Entities

### Account

```ts
type Account = {
  id: string;
  name: string;
  logoUrl?: string;
  description: string;
  industryTags: string[];
  phone: string;
  email: string;
  website: string;
  address: string;
};
```

### Contact

```ts
type Contact = {
  id: string;
  accountId: string;
  fullName: string;
  title: string;
  department: string;
  location?: string;
  email?: string;
  phone?: string;
  relationshipTags: string[];
  influenceScore?: number;
  notes?: string;
};
```

### OrgChartNode

```ts
type OrgChartNode = {
  id: string;
  accountId: string;
  contactId: string;
  position: {
    x: number;
    y: number;
  };
  status?: "active" | "new" | "at-risk";
};
```

### OrgChartEdge

```ts
type OrgChartEdge = {
  id: string;
  accountId: string;
  sourceNodeId: string;
  targetNodeId: string;
  relationshipType: "reports-to" | "influences" | "partner" | "stakeholder";
};
```

### ActivityEvent

```ts
type ActivityEvent = {
  id: string;
  accountId: string;
  contactId?: string;
  type: "call" | "email" | "meeting" | "note" | "contract";
  title: string;
  body?: string;
  occurredAt: string;
};
```

## Supabase Tables

Planned tables:

- `accounts`
- `contacts`
- `org_chart_nodes`
- `org_chart_edges`
- `activity_events`

## API Contracts

Planned data operations:

- `GET /accounts`
- `GET /accounts/:accountId`
- `GET /accounts/:accountId/org-chart`
- `POST /accounts/:accountId/contacts`
- `PATCH /contacts/:contactId`
- `DELETE /contacts/:contactId`
- `PATCH /accounts/:accountId/org-chart/layout`
- `POST /accounts/:accountId/org-chart/edges`
- `DELETE /org-chart/edges/:edgeId`

## Data Integrity Rules

- A contact belongs to one account.
- An org chart node belongs to one contact.
- An edge must reference two existing nodes in the same account.
- Deleting a contact deletes the related chart node and edges.
- Node positions are saved separately from contact profile data.

