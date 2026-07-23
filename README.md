# aidanb.io

Personal site for Aidan Bell — full-stack engineer with a focus on dashboards and form-heavy UIs.

## Stack

- **Vite 5** + **React 18**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **React Router** — `/` and `/playground`
- **React Hook Form** + **Zod** — schema-driven form playground
- **CodeMirror** — JSON schema editor
- **Lucide** — UI icons

## Requirements

- Node.js **20+** (see `.node-version`)

With [fnm](https://github.com/Schniz/fnm):

```bash
fnm use          # reads .node-version
fnm default 20   # optional: set global default
```

## Scripts

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # preview production build
npm run deploy    # build + publish dist/ to GitHub Pages
```

## Site map

| Route | Content |
|-------|---------|
| `/` | Home, About, Approach, Work |
| `/playground` | Live schema → form demo |

## Theming

Class-based dark mode on `<html>`. Toggle in the nav; preference is stored in `localStorage`. Theme changes use the View Transitions API for a diagonal wipe when supported (respects `prefers-reduced-motion`).

## Playground

Edit a JSON form schema on the left; a validated React form renders on the right.

Supported field types: `string`, `email`, `number`, `boolean`, `select`, `textarea`.

Sample schemas are available from the dropdown (signup, feedback, event registration).

## Deploy notes

- Custom domain via `public/CNAME`
- `public/404.html` restores SPA routes on GitHub Pages refreshes
