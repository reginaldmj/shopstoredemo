import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import Product from './models/Product.js';
import seedProducts from './data/seedProducts.js';

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mono-store';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'https://shopstoredemo.netlify.app';
const ENABLE_DEBUG_ROUTES = String(process.env.ENABLE_DEBUG_ROUTES || '').toLowerCase() === 'true' || process.env.NODE_ENV !== 'production';
const ADMIN_SEED_KEY = process.env.ADMIN_SEED_KEY || '';
const normalizeOrigin = origin => String(origin || '').trim().replace(/\/+$/, '');
const ALLOWED_ORIGINS = CORS_ORIGIN
  .split(',')
  .map(normalizeOrigin)
  .filter(Boolean);

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