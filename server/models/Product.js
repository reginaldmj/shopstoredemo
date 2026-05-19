// Product model definition for catalog items.
// Supports basic product metadata, pricing, images, and variant details.

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  rating: Number,
  reviews: Number,
  description: String,
  images: [String],
  sizes: [String],
  colors: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', productSchema);