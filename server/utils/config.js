import dotenv from 'dotenv';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';

export const PORT = Number(process.env.PORT) || 5000;
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopstore';
export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5000';
export const ENABLE_DEBUG_ROUTES = String(process.env.ENABLE_DEBUG_ROUTES || '').toLowerCase() === 'true';
export const ADMIN_SEED_KEY = process.env.ADMIN_SEED_KEY || '';
export const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET || JWT_SECRET === 'dev_jwt_secret_change_me') {
  if (NODE_ENV === 'production') {
    throw new Error('JWT_SECRET is required in production.');
  }
  console.warn('WARNING: Using fallback JWT secret. Set JWT_SECRET for production environments.');
}
