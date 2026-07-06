# aidanb.io

Minimal personal site shell built with Vite and React.

## Requirements

- Node.js 20+ (see `.node-version`)

If you use [fnm](https://github.com/Schniz/fnm), run `fnm use` in the project root — it reads `.node-version` automatically. To set Node 20 as your default everywhere:

```bash
fnm install 20
fnm default 20
```

## Stack

- Vite 5
- React 18
- Tailwind CSS v4

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build
npm run deploy   # deploy to GitHub Pages
```

## Theming

Dark/light mode uses Tailwind's `dark` variant with a class on `<html>`. The nav includes a toggle; preference is saved to `localStorage`.
