# ShopStore

ShopStore is a lightweight e-commerce demo combining a static frontend shell with a Node/Express backend API. The frontend uses vanilla JavaScript (ES modules) and `fetch` to interact with products, cart, authentication, and profile endpoints.

## Quick overview

- Frontend: `client/` (static files; modular JS in `client/store/`)
- Backend: `server/` (Express + Mongoose)
- Root: `package.json` defines npm workspaces for `server` and `client` and provides convenience scripts.

## Project structure (important files)

- `client/`
  - `index.html` — SPA shell and markup
  - `style.css` — visual styles
  - `store.js` — module entrypoint that wires `client/store/ui.js`
  - `store/` — modular client code:
    - `constants.js`, `state.js`, `api.js`, `cart.js`, `ui.js`, `utils.js`
- `server/`
  - `server.js` — Express app and MongoDB connection
  - `routes/` — API route handlers (`products`, `cart`, `auth`, `profile`)
  - `models/` — Mongoose models (`Product`, `User`, `Cart`)
  - `data/seedProducts.js` — default product seed data
  - `seed.js` — local seeding helper script

## Prerequisites

- Node.js 18+ (required for `node --watch` and ES module support)
- npm
- MongoDB (local or remote)

## Install

From the repository root, install dependencies for all workspace packages:

```bash
npm install
```

This installs workspace packages and writes a single root `package-lock.json`.

## Useful scripts

At the project root you can run useful, workspace-aware scripts:

```bash
# Start the production server that serves the static client and API
npm start

# Run the backend dev command (workspace alias)
npm run dev

# Run the server start alias from root
npm run server
```

Inside the `server/` folder you can also run:

```bash
# Start backend (production)
npm start

# Start backend for development (auto-reload using Node 18+ --watch)
npm run dev

# Seed the database
npm run seed
```

Inside the `client/` folder you can run the convenience script (it delegates to the workspace/server dev script by default):

```bash
npm run dev
npm start
```

If you prefer a dedicated frontend dev server (hot-reload, asset pipeline), you can install a lightweight server such as `live-server` or use Vite — this project currently serves the static `client/` folder from the Express backend for simplicity.

## Environment variables

The backend supports these variables (set in `.env` or your environment):

- `PORT` — Server port (default: `5000`)
- `MONGO_URI` — MongoDB connection URI (default: `mongodb://127.0.0.1:27017/shopstore`)
- `CORS_ORIGIN` — Comma-separated allowed origins for CORS
- `ENABLE_DEBUG_ROUTES` — Enable debug endpoints when set to `true`
- `ADMIN_SEED_KEY` — Admin seed endpoint key (protects `/api/admin/seed-products`)
- `JWT_SECRET` — Secret used to sign auth tokens

Example `.env`:

```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/shopstore
CORS_ORIGIN=http://localhost:3000
ENABLE_DEBUG_ROUTES=true
JWT_SECRET=your-secret-key
ADMIN_SEED_KEY=my-secret-key
```

## Running locally (recommended)

1. Start MongoDB.
2. Install dependencies: `npm install` (root).
3. Start the backend in dev mode (auto-reload):

```bash
npm run dev
```

4. Open `http://localhost:5000` in your browser.

## Seeding the product catalog

- Local script: `npm run seed` (from `server/` or via root script alias)
- HTTP endpoint (requires `ADMIN_SEED_KEY`): `POST /api/admin/seed-products` with header `x-admin-seed-key: <your-key>`

## API Endpoints

- `GET /health` — Basic health check
- `GET /api/health` — API health check
- `GET /api/products` — Product listing
- `GET /api/cart` — Cart details
- `POST /api/cart/add` — Add an item to the cart (body: `{ productId, qty }`)
- `POST /api/cart/remove` — Remove an item from the cart (body: `{ productId }`)
- `POST /api/auth/register` — Create a new account
- `POST /api/auth/login` — Sign in
- `GET /api/auth/me` — Get current user
- `GET /api/profile` — Retrieve profile data
- `PUT /api/profile` — Update profile data

## Notes for maintainers

- The frontend has been modularized into `client/store/` modules. Prefer adding new UI code there and keep `index.html` markup minimal.
- Inline `onclick` attributes have been replaced with `data-route` / `data-action` attributes and delegated handlers in `client/store/ui.js`.
- Use `client/store/state.js` for application state and persistence helpers.

## Contributing

This repo is intended for learning and portfolio showcase. If you add features, please:

- Keep server secrets out of source control.
- Add tests for backend changes when possible.
- Keep frontend modules small and focused.

---

If you'd like, I can also add a simple `Makefile` or extra dev scripts (Vite, live-server) to improve local frontend development.
