import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mono-store';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'https://shopstoredemo.netlify.app';
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