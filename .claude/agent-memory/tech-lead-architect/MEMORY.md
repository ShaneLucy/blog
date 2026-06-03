# Blog Project - Tech Lead Memory

## Tech Stack (Confirmed)
- **Framework**: SvelteKit 2 with Svelte 5 (runes mode enforced)
- **Language**: TypeScript 6
- **Build**: Vite 8, adapter-auto
- **Package manager**: Bun (bun.lock present, .npmrc engine-strict)
- **Linting/Formatting**: ESLint 10, Prettier with svelte plugin (tabs, single quotes, no trailing commas, 100 printWidth)
- **Testing**: Playwright (e2e only, no unit test framework yet)
- **Adapter**: @sveltejs/adapter-auto (no specific deploy target chosen yet)

## Project Structure
- Fresh SvelteKit scaffold, minimal customization
- Demo routes exist at `/demo` and `/demo/playwright` (scaffolding artifacts)
- `src/lib/` is empty (just index.ts placeholder)
- `static/` contains only robots.txt
- No CSS framework installed yet
- No database or CMS configured

## Key Decisions Made
- Svelte 5 runes mode enforced in svelte.config.js
- Preload data on hover enabled in app.html

## Architecture Decisions (Pending)
- See implementation plan for image storage, EXIF stripping, trip data model
- Adapter choice TBD based on deployment target

## File Paths
- Config: `C:/Users/shane/Documents/projects/blog/svelte.config.js`
- Package: `C:/Users/shane/Documents/projects/blog/package.json`
- Routes: `C:/Users/shane/Documents/projects/blog/src/routes/`
- Lib: `C:/Users/shane/Documents/projects/blog/src/lib/`
- Static: `C:/Users/shane/Documents/projects/blog/static/`
