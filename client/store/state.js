import { AUTH_TOKEN_KEY } from './constants.js';

export const state = {
  products: [],
  cart: { items: [] },
  authToken: '',
  currentUser: null,
  profile: null,
  useLocalCart: false,
  productsLoaded: false,
  isLoadingProducts: false,
  selectedProductId: null,
  currentInfoPage: 'about',
  selectedSize: null,
  selectedColor: null,
  currentShopPage: 1,
  filters: {
    query: '',
    categories: new Set(),
    maxPrice: 500,
    minRating: 0
  },
  sortMode: 'featured',
  viewMode: 'grid'
};

export function getProductId(product) {
  return String(product?._id || product?.id || '');
}

export function getProductById(productId) {
  return state.products.find(p => getProductId(p) === String(productId));
}

export function getCartItems() {
  return (state.cart?.items || []).map(item => {
    const fromItem = typeof item.productId === 'object' ? item.productId : null;
    const id = fromItem ? getProductId(fromItem) : String(item.productId);
    const product = fromItem || getProductById(id) || item._product || null;
    return {
      productId: id,
      product,
      qty: Number(item.qty) || 1
    };
  }).filter(item => item.product);
}

export function getStoredAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY) || '';
}

export function setStoredAuthToken(token) {
  if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
  else localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function setAuthSession(token, user) {
  state.authToken = token || '';
  setStoredAuthToken(state.authToken);
  state.currentUser = user || null;
}

export function clearAuthSession() {
  state.authToken = '';
  state.currentUser = null;
  state.profile = null;
  setStoredAuthToken('');
}

export function persistLocalCart() {
  if (!state.useLocalCart) return;
  const itemsWithSnapshots = state.cart.items.map(item => {
    const pid = String(item.productId);
    const product = getProductById(pid) || (typeof item.productId === 'object' ? item.productId : null);
    return { productId: pid, qty: item.qty, _product: product || undefined };
  });
  localStorage.setItem('mono-cart', JSON.stringify({ items: itemsWithSnapshots }));
}

export function readLocalCart() {
  const raw = localStorage.getItem('mono-cart');
  if (!raw) return { items: [] };
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed.items)) return parsed;
  } catch {
    return { items: [] };
  }
  return { items: [] };
}
