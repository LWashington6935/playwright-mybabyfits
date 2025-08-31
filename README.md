# Playwright E2E Starter

A minimal Playwright setup with:
- Config using `BASE_URL` from `.env`
- 3 example tests (demo smoke, store smoke with stubs, auth negative with stubs)
- Page Objects
- Minimal GitHub Actions workflow

## Quick start

```bash
npm ci || npm install
npx playwright install --with-deps
cp .env.example .env             # keep demo URL to verify setup
npm test                         # headless
npm run test:ui                  # interactive runner
npm run report                   # open HTML report
```

To point at your app, set `BASE_URL` in `.env`:
```env
BASE_URL=https://YOUR-APP-URL
```

## CI (GitHub Actions)
See `.github/workflows/e2e.yml`.