# StART Dashboard

Internal dashboard for Street Art Toronto

This repo contains both:
1. a front-end React UI in `src/`, and
2. a backend API server in `server/`

## Tech Stack
- Using React and create-react-app framework
- Auth0 for authentication
- Material UI design framework
- Deployed on Heroku

## Get Started

Install dependencies:

```bash
npm install
```

Copy configuration template and add real credentials:

```bash
npm run setup
open .env
```

See `docs/development.md` for instructions on creating credentials and setting up a secure local domain.

Run the project for local development (with hot reloading):

```bash
npm run start:dev
```

Visit at https://start-dashboard:3000

Run the project for production-like build:

```bash
npm run start:prod
```

Visit at https://start-dashboard:3000

To run linting style checks:

```bash
npm run lint
```

## Component Library

We keep a hosted component library here: https://add-storybook--5f9b7272e5c4a70022388106.chromatic.com

Run these commands from within `react-ui/`.

Run it locally with:

```bash
npm run storybook
```

To push a new release to our hosted library, run:

```bash
npm run chromatic
```
