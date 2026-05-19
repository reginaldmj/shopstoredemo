// Server entrypoint for the ShopStore backend API.
//
// High-value notes:
// - This file bootstraps the Express app, mounts API routes, serves the
//   static client assets, and establishes a Mongoose connection to MongoDB.
// - Environment-driven behavior (CORS origins, debug routes, admin seed) is
//   centralized in `server/utils/config.js`. Keep security-sensitive values
//   (e.g., `JWT_SECRET`, `ADMIN_SEED_KEY`) out of source control and in env.
// - The server serves the contents of `client/` as a static SPA. Route checks
//   ensure API paths are handled by Express while non-API requests return
//   `index.html` so client-side routing operates correctly.
//
// Quick dev tips:
// - Use `npm run dev` in `server/` to run with automatic reload (Node 18+).
// - Use the admin seeding endpoint only in development; protect it with
//   `ADMIN_SEED_KEY` in production environments.

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import Product from './models/Product.js';
import seedProducts from './data/seedProducts.js';
import { ADMIN_SEED_KEY, CORS_ORIGIN, ENABLE_DEBUG_ROUTES, MONGO_URI, PORT } from './utils/config.js';

// Create the application and configure runtime defaults.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, '../client');

const app = express();
// Normalize origin strings for CORS validation, removing extra slashes.
const normalizeOrigin = origin => String(origin || '').trim().replace(/\/+$/, '');
const ALLOWED_ORIGINS = CORS_ORIGIN
  .split(',')
  .map(normalizeOrigin)
  .filter(Boolean);

// Enable CORS only for allowed origin values and parse JSON request payloads.
app.use(cors(
  ALLOWED_ORIGINS.length
    ? {
        origin(origin, callback) {
          if (!origin || ALLOWED_ORIGINS.includes(normalizeOrigin(origin))) {
            callback(null, true);
            return;
          }
          callback(null, false);
        }
      }
    : undefined
));
app.use(express.json());

// Health-check handler for both root API and internal monitoring.
const healthHandler = (req, res) => {
  res.json({
    status: 'ok',
    service: 'shopstore-api',
    timestamp: new Date().toISOString()
  });
};

app.get('/health', healthHandler);
app.get('/api/health', healthHandler);

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Admin-only endpoint used to reset and seed the products collection for development.
app.post('/api/admin/seed-products', async (req, res) => {
  if (!ADMIN_SEED_KEY) {
    return res.status(404).json({ message: 'Not found' });
  }

  const providedKey = req.headers['x-admin-seed-key'];
  if (providedKey !== ADMIN_SEED_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
    return res.json({ ok: true, seeded: seedProducts.length });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Failed to seed products' });
  }
});

if (ENABLE_DEBUG_ROUTES) {
  app.get('/api/debug/products-status', async (req, res) => {
    try {
      const dbName = mongoose.connection?.name || '';
      const productCount = await Product.countDocuments();
      const sample = await Product.find({}, { name: 1, _id: 0 }).limit(8).lean();

      res.json({
        ok: true,
        dbName,
        productCount,
        sampleNames: sample.map(item => item.name)
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: 'Unable to fetch debug product status'
      });
    }
  });
}

app.use(express.static(clientPath));
app.use((req, res, next) => {
  if (req.path.startsWith('/api') || req.path === '/health' || req.path === '/api/health') {
    return next();
  }
  res.sendFile(path.join(clientPath, 'index.html'));
});

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

startServer();