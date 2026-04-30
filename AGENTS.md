# Repository Guidelines

## Project Structure & Module Organization

This is a TypeScript React app built with Vite and TanStack tooling. Route files live in `src/routes/`; `src/routeTree.gen.ts` is generated and should not be edited by hand. Shared UI primitives are in `src/components/ui/`, while interactive system-design modules are in `src/components/system-design/`. Reusable hooks and utilities live under `src/hooks/` and `src/lib/`. Supabase clients and types are in `src/integrations/supabase/`. Static assets, status data, SEO files, and the resume PDF live in `public/`. Agent prompts and project notes are kept in `agents/` and `project-memory/`.

## Build, Test, and Development Commands

- `npm run dev`: start the local Vite development server.
- `npm run build`: create a production build and update `public/status.json` through `scripts/generate-status.mjs`.
- `npm run build:dev`: build using development mode.
- `npm run preview`: serve the built app locally for inspection.
- `npm run lint`: run ESLint and Prettier checks across the repository.
- `npm run format`: format files with Prettier.

The repo includes Bun lockfiles, but scripts are npm-compatible. Use one package manager consistently.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Keep component filenames in PascalCase, such as `RateLimiterLab.tsx`; hooks should start with `use`, such as `useBuildStatus.ts`. Prefer helpers from `src/lib/` and UI primitives from `src/components/ui/` before adding abstractions. Formatting is enforced through Prettier via ESLint; run `npm run format` before broad edits and `npm run lint` before handoff. The Vite config already provides the `@` alias and core plugins, so do not duplicate them in `vite.config.ts`.

## Testing Guidelines

No dedicated test runner is currently configured. For now, verify changes with `npm run lint` and `npm run build`. When adding tests, colocate them near covered code using `*.test.ts` or `*.test.tsx`, and add the matching `test` script to `package.json`. Cover route loaders/actions, state stores, and interactive lab logic when behavior changes.

## Commit & Pull Request Guidelines

Recent history is mixed, with one conventional commit (`feat: ...`) and several generic `Changes` commits. Prefer concise conventional messages such as `feat: add lab progress store` or `fix: handle contact form errors`. Pull requests should include a summary, verification commands, linked issues when applicable, and screenshots or recordings for UI changes.

## Security & Configuration Tips

Keep secrets out of source control. Supabase configuration belongs in environment variables or platform settings. Update generated files and lockfiles only with related source or dependency changes.
