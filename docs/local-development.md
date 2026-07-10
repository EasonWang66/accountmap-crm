# Local Development

## Prerequisites

- Node.js 20 or newer.
- npm 10 or newer.
- Internet access to the npm registry for the first dependency install.

## Setup

```bash
cd accountmap-crm
npm install
npm run dev
```

Vite will print a local preview URL, usually:

```text
http://localhost:5173
```

## Verification Commands

```bash
npm run build
npm run test -- --run
npm run lint
```

## Notes

The project uses React, TypeScript, Vite, React Flow, Zustand, TanStack Query, Tailwind CSS, Vitest, and Playwright. Package installation requires access to `https://registry.npmjs.org`.

