# **AccountMap CRM**

## **Description**

This project showcases part of my contribution to a semester-long sponsored project for **Insight Global**, focused on designing and developing a CRM-style account workspace with an editable organizational chart interface. The build highlights a frontend-heavy product experience for account relationship mapping, where users can inspect stakeholder hierarchy, understand relationship metadata, and reposition people directly inside the organizational chart.

This implementation focuses on the **Accounts** section of the CRM experience — account profile summary, tabbed account workspace, and organizational chart view — with an emphasis on **interactive frontend engineering** (React Flow-powered draggable cards, hover-driven card inspection, controlled graph state, and reusable CRM components) and **portfolio-ready engineering workflow** (formal documentation, typed data models, GitHub version control, CI, and Vercel deployment).

## **Link to Live Demo**

[https://igcrm-two.vercel.app/](https://igcrm-two.vercel.app/)

## **Tools and Technologies Used**

**React** — component-based architecture for the CRM shell, account header, tabs, toolbar, and org chart cards  
**TypeScript** — typed account, contact, org chart node, and edge models  
**Vite** — build tooling and dev server  
**React Flow** — draggable organizational chart nodes, hierarchy edges, canvas controls, and graph rendering  
**Zustand** — lightweight UI state for edit mode, search query, hovered person, selected person, and draft edits  
**TanStack Query** — planned server-state layer for future API/Supabase integration  
**React Hook Form + Zod** — planned form management and validation for editable contact workflows  
**CSS3** — custom layout styling, responsive viewport constraints, card variants, hover states, and CRM interface polish  
**Figma** — source of truth for the CRM interface and organizational chart card design  
**Vitest** — unit tests for org chart data integrity  
**Playwright** — planned end-to-end tests for account workspace flows  
**Git & GitHub** — version control and public project documentation  
**Vercel** — hosting and deployment

## **Pages**

`/` — Account workspace: CRM sidebar, account profile header, account tabs, organizational chart toolbar, draggable org chart canvas, hover-driven person detail panel.

The current MVP is implemented as a single-page React application. It uses shared seed data from `src/data/seed.ts` for account metadata, contacts, organizational chart nodes, and hierarchy edges, so the interface behaves like a connected product view rather than a static mockup.

## **Core Interface Features**

**CRM shell** — persistent left navigation, top bar user profile, and account workspace layout.  
**Account profile header** — Coca-Cola account metadata, tags, contact details, and brand imagery.  
**Tabbed workspace** — overview, organizational chart, activity timeline, contract history, and competitors tabs.  
**Organizational chart canvas** — React Flow hierarchy with draggable cards and smooth connector edges.  
**Card variants** — blue and grey org chart cards matching the Figma card system, including C/FTE tags and metric badges for blue cards.  
**Hover inspection** — hovering a person card highlights the card and updates the detail drawer.  
**Editable foundation** — edit mode, draft field state, controlled node positions, and documented path toward full add/edit/delete contact workflows.

## **Responsive and Interaction Strategy**

Built as a desktop-first CRM workspace with controlled viewport behavior:

**Viewport fit** — app shell is constrained to the display height so the CRM interface behaves like a product dashboard rather than a long marketing page.  
**Flexible workspace grid** — account header, tabs, and chart canvas are arranged with fixed dashboard regions and a flexible chart area.  
**Graph interaction** — org chart cards are controlled React Flow nodes, allowing card dragging while preserving hierarchy edges.  
**Hover-first inspection** — card focus is triggered by hover/focus to support fast scanning across the chart.  
**Future responsive work** — tablet and mobile behavior will prioritize a condensed sidebar, stacked account metadata, and horizontal chart navigation.

## **Getting Started**

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Run checks:

```bash
npm run lint
npm run test -- --run
```

## **Project Structure**

```text
accountmap-crm/
  index.html                 Vite entry point
  vite.config.ts             Vite and Vitest configuration
  package.json               scripts and dependencies
  package-lock.json          locked dependency tree
  playwright.config.ts       planned e2e test configuration
  eslint.config.js           lint configuration
  .github/workflows/ci.yml   GitHub Actions verification workflow
  docs/
    product-requirements.md
    frontend-architecture.md
    data-model.md
    implementation-plan.md
    testing-strategy.md
    local-development.md
  src/
    main.tsx                 React root and providers
    styles.css               global layout, CRM styling, org chart card design
    vite-env.d.ts            Vite asset type support
    app/
      App.tsx                account workspace composition
    assets/
      coca-cola-logo.webp    account logo asset
      profile-photo.jpg      top-bar user profile image
    components/
      CrmShell.tsx           sidebar, top bar, and app shell
      AccountHeader.tsx      account profile summary
      AccountTabs.tsx        account workspace tabs
    data/
      types.ts               Account, Contact, ChartNode, ChartEdge types
      seed.ts                shared CRM and org chart dataset
    features/
      org-chart/
        OrgChartWorkspace.tsx  React Flow canvas, toolbar, drawer
        PersonNode.tsx         custom org chart card node
        orgChart.test.ts       seed data integrity tests
    stores/
      orgChartStore.ts       Zustand UI state
    test/
      setup.ts               Vitest setup
  tests/
    e2e/
      account-workspace.spec.ts
```

## **Framer Embed**

```html
<iframe
  src="https://igcrm-two.vercel.app/"
  style="width:100%; height:800px; border:0; border-radius:12px;"
  title="AccountMap CRM live demo"
></iframe>
```
