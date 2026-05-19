import { API, TAX_RATE } from './constants.js';
import { state, getProductById, getCartItems, persistLocalCart, readLocalCart } from './state.js';
import { requestJSON } from './api.js';
import { showToast } from './utils.js';

export async function loadCart() {
  if (state.useLocalCart) {
    state.cart = readLocalCart();
    return state.cart;
  }

  try {
    const data = await requestJSON(`${API}/cart`);
    state.cart = data || { items: [] };
  } catch {
    state.useLocalCart = true;
    state.cart = readLocalCart();
    showToast('Cart API unavailable. Using local cart.');
  }

  return state.cart;
}

export async function addToCart(productId, qty = 1) {
  const normalizedQty = Math.max(1, Number(qty) || 1);

  if (state.useLocalCart) {
    const found = state.cart.items.find(i => String(i.productId) === String(productId));
    if (found) {
      found.qty += normalizedQty;
    } else {
      const productSnapshot = getProductById(String(productId));
      state.cart.items.push({
        productId: String(productId),
        qty: normalizedQty,
        _product: productSnapshot || undefined
      });
    }
    persistLocalCart();
    showToast('Added to cart');
    return state.cart;
  }

  try {
    await requestJSON(`${API}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, qty: normalizedQty })
    });
    await loadCart();
    showToast('Added to cart');
    return state.cart;
  } catch {
    state.useLocalCart = true;
    const found = state.cart.items.find(i => String(i.productId) === String(productId));
    if (found) {
      found.qty += normalizedQty;
    } else {
      const productSnapshot = getProductById(String(productId));
      state.cart.items.push({
        productId: String(productId),
        qty: normalizedQty,
        _product: productSnapshot || undefined
      });
    }
    persistLocalCart();
    showToast('Added to cart (local)');
    return state.cart;
  }
}

export async function removeFromCart(productId) {
  if (state.useLocalCart) {
    state.cart.items = state.cart.items.filter(i => String(i.productId) !== String(productId));
    persistLocalCart();
    return state.cart;
  }

  try {
    await requestJSON(`${API}/cart/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    });
    await loadCart();
    return state.cart;
  } catch {
    showToast('Unable to remove item right now.');
    return state.cart;
  }
}

export async function setCartQty(productId, newQty) {
  const qty = Number(newQty) || 0;
  if (qty <= 0) {
    await removeFromCart(productId);
    return state.cart;
  }

  if (state.useLocalCart) {
    const item = state.cart.items.find(i => String(i.productId) === String(productId));
    if (item) item.qty = qty;
    else state.cart.items.push({ productId: String(productId), qty });
    persistLocalCart();
    return state.cart;
  }

  try {
    await requestJSON(`${API}/cart/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    });

    await requestJSON(`${API}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, qty })
    });

    await loadCart();
    return state.cart;
  } catch {
    showToast('Unable to update quantity right now.');
    return state.cart;
  }
}

export function computeTotals() {
  const subtotal = getCartItems().reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  return { subtotal, tax, total };
}
