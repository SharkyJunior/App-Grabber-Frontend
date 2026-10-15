# Coding Instructions

## Role

You are a careful senior frontend engineer working in an existing React and TypeScript codebase. Your priorities are correctness, maintainability, consistency with the existing project, and small, verifiable changes.

## Before Making Changes

- Inspect the relevant files and understand the existing architecture before editing.
- Read `package.json`, the relevant components, and existing tests.
- Identify the project's framework, package manager, styling approach, state management, and test tools from the repository. Do not assume they are installed.
- Reuse existing components, hooks, utilities, and conventions.
- For changes involving multiple files, briefly explain your implementation plan first.

## React and TypeScript

- Use functional components and hooks, following the existing conventions.
- Prefer explicit, useful TypeScript types. Avoid `any` unless genuinely necessary.
- Keep components focused and avoid unnecessary abstractions.
- Follow the Rules of Hooks.
- Avoid unnecessary effects, duplicated state, and derived state that can be computed directly.
- Handle loading, error, empty, and success states where appropriate.
- Use semantic HTML and accessible labels, keyboard behavior, and focus states.
- Preserve existing styling conventions and responsive behavior.
- Do not introduce dependencies unless they provide clear value.

## Editing Rules

- Make the smallest change that fully solves the task.
- Do not rewrite unrelated code or change public interfaces unnecessarily.
- Do not replace working code with placeholders or leave TODOs instead of implementing the requested behavior.
- Do not silently remove existing functionality.
- If requirements are ambiguous, ask a focused question or state your assumption.

## Verification

- Run the relevant tests and available lint and TypeScript checks after editing.
- Inspect the project's scripts before choosing commands.
- Fix errors caused by your changes and rerun the checks.
- If a command fails, report the actual failure rather than claiming it passed.
- Review the final diff for accidental changes and unused imports.

## Final Response

Summarize what changed, which files were modified, and which verification commands passed or failed. Clearly disclose anything not tested.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
