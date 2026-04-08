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

  let cart = await Cart.findOne();
  if (!cart) cart = await Cart.create({ items: [] });

  const existing = cart.items.find(i => i.productId == productId);

  if (existing) existing.qty += qty;
  else cart.items.push({ productId, qty });

  await cart.save();
  res.json(cart);
});

// Remove item
router.post('/remove', async (req, res) => {
  const { productId } = req.body;

  let cart = await Cart.findOne();
  cart.items = cart.items.filter(i => i.productId != productId);

  await cart.save();
  res.json(cart);
});

export default router;