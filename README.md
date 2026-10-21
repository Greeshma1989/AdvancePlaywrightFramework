# Advance Playwright Framework

A TypeScript end-to-end testing framework built with Playwright Test. Tests use Chromium by default, with page objects and utilities for working with test data and reports.

## Requirements

- Node.js and npm
- Chromium for Playwright

## Setup

From the project root, install dependencies and the browser:

```powershell
npm install
npx playwright install chromium
```

## Running tests

Run the suite:

```powershell
npx playwright test --reporter=line
```

Run a specific test file:

```powershell
npx playwright test src/tests/login.spec.ts --reporter=line
```

The `--reporter=line` option is currently needed because the configured custom reporter imports agent files that are not present in this checkout. Passing a reporter on the command line bypasses the reporters in `playwright.config.ts`.

To open Playwright's HTML report after a run:

```powershell
npx playwright show-report
```

## Configuration

`playwright.config.ts` loads environment variables from a root `.env` file. The base URL is selected in this order:

1. `BASE_URL`, if set.
2. The URL corresponding to `TTA_ENV`:

| `TTA_ENV` value | Environment variable override | Default URL |
| --- | --- | --- |
| `qa` (default) | `QA_BASE_URL` | `https://app.thetestingacademy.com` |
| `dev` or `local` | `DEV_BASE_URL` | `http://localhost:3000` |
| `stg`, `stage`, or `staging` | `STG_BASE_URL` | `https://stage.thetestingacademy.com` |
| `prod` or `production` | `PROD_BASE_URL` | `https://app.thetestingacademy.com` |
| `api` | `API_BASE_URL` | `https://restful-booker.herokuapp.com` |

For example, a `.env` file can contain:

```dotenv
TTA_ENV=qa
# BASE_URL=https://your-test-environment.example
```

Do not commit credentials or other secrets in `.env`. The login page object currently navigates directly to the TTACart URL, so changing the configured base URL does not change that page object's destination.

The configuration runs headed locally and headless when `CI` is set. It captures screenshots, videos, and traces for tests.

## Project structure

```text
src/
  api/        API helpers
  config/     Framework configuration
  fixtures/   Shared Playwright fixtures
  pages/      Page objects
  testdata/   Test data
  tests/      Playwright test specifications
  utils/      Reporting, data readers, and test utilities
playwright.config.ts
tsconfig.json
```

TypeScript is configured in `tsconfig.json` with strict type checking and path aliases for the `src` directories.
