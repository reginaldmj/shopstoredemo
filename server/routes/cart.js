// Shopping cart API routes for retrieving and mutating the server-side cart.
// Supports simple cart CRUD using a single cart document for demo purposes.

import express from 'express';
import Cart from '../models/Cart.js';

const router = express.Router();

// Get cart
router.get('/', async (req, res) => {
  let cart = await Cart.findOne().populate('items.productId');
  if (!cart) cart = await Cart.create({ items: [] });
  res.json(cart);
});

// Add item
router.post('/add', async (req, res) => {
  const { productId, qty } = req.body;
  const quantity = Number(qty) || 1;

  if (!productId) {
    return res.status(400).json({ message: 'productId is required' });
  }
  if (quantity < 1) {
    return res.status(400).json({ message: 'qty must be at least 1' });
  }

  let cart = await Cart.findOne();
  if (!cart) cart = await Cart.create({ items: [] });

  const existing = cart.items.find(i => String(i.productId) === String(productId));

  if (existing) {
    existing.qty = Number(existing.qty || 0) + quantity;
  } else {
    cart.items.push({ productId, qty: quantity });
  }

  await cart.save();
  res.json(cart);
});

// Remove item
router.post('/remove', async (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ message: 'productId is required' });
  }

  let cart = await Cart.findOne();
  if (!cart) cart = await Cart.create({ items: [] });

  cart.items = cart.items.filter(i => String(i.productId) !== String(productId));

  await cart.save();
  res.json(cart);
});

export default router;