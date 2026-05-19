// Product API routes for serving the store catalog.
// This module exposes endpoints used by the client to load product listings.

import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

export default router;