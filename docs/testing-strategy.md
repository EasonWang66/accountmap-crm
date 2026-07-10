# Testing Strategy

## Goals

Testing should prove that the app is not only visually complete, but also reliable across the core CRM and org chart workflows. The test suite should be focused, readable, and useful for resume reviewers.

## Unit Tests

Use Vitest for:

- data normalization
- search filtering
- node and edge transforms
- validation schemas
- reducer/store actions where applicable

## Component Tests

Use React Testing Library for:

- sidebar navigation rendering
- account header metadata
- tab switching
- chart toolbar behavior
- person card states
- form validation messages

## End-to-End Tests

Use Playwright for:

- loading the Coca-Cola account page
- switching tabs
- searching for a person in the org chart
- entering edit mode
- adding a person
- editing a person
- deleting a person
- moving a node and saving changes

## Manual QA Checklist

- Desktop layout matches the Figma default page.
- Sidebar active state is clear.
- Account header content is readable at common screen widths.
- Chart cards do not overlap in the default layout.
- Search results are obvious.
- Edit mode is visually distinct.
- Forms are usable with keyboard navigation.
- Empty, loading, and error states are present.

## CI Plan

The GitHub workflow should run:

- type check
- lint
- unit and component tests
- production build
- Playwright smoke test after the UI is stable

