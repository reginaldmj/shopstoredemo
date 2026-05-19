// Seed script for the ShopStore backend.
// This script connects to MongoDB, clears the products collection,
// and inserts demo product fixtures from data/seedProducts.js.

import mongoose from 'mongoose';
import Product from './models/Product.js';
import seedProducts from './data/seedProducts.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopstore';

await mongoose.connect(MONGO_URI);

try {
  await Product.deleteMany();
  await Product.insertMany(seedProducts);
  console.log(`Seeded ${seedProducts.length} products`);
} finally {
  await mongoose.disconnect();
}
