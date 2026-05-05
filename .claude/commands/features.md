# Feature Scaffold

When the user requests a new feature, create it inside `src/features/<feature-name>/` following the structure below. This keeps business logic decoupled from the Next.js framework layer.

## Directory structure

```
src/features/<feature-name>/
├── components/       # React components specific to this feature
├── hooks/            # Custom React hooks (if needed)
├── actions/          # Server Actions for this feature (if needed)
└── types.ts          # TypeScript types/interfaces for this feature (if needed)
```

Only create the subdirectories that are actually needed for the feature being built. Don't scaffold empty folders.

## Rules

- **Components** live in `src/features/<feature-name>/components/` — never directly in `src/app/`.
- **Pages** in `src/app/` are thin shells: they import and render feature components. No business logic in page files.
- **Server Actions** that belong to a feature go in `src/features/<feature-name>/actions/` (or `src/actions/` for shared actions).
- **Types** that are specific to the feature stay in `src/features/<feature-name>/types.ts`.
- Shared utilities remain in `src/lib/`.
- Use `"use client"` only in components that require interactivity (event handlers, useState, etc.). Default to Server Components.
- Import using the `@/features/` alias.

## Naming conventions

- Folders: `kebab-case`
- Component files: `kebab-case.tsx`
- Hook files: `use-<name>.ts`
- Type files: `types.ts`

## Example

For a feature called `contracts`:

```
src/features/contracts/
├── components/
│   ├── contracts-table.tsx
│   └── contract-detail.tsx
├── hooks/
│   └── use-contracts.ts
└── types.ts
```

Page at `src/app/(main)/contracts/page.tsx`:
```tsx
import { ContractsTable } from "@/features/contracts/components/contracts-table";

export default function ContractsPage() {
  return <ContractsTable />;
}
```

## When invoked

Ask the user what feature they want to build (if not specified in the prompt `$ARGUMENTS`), then scaffold the necessary files following these rules.
