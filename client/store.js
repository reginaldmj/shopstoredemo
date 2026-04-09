const RAW_API_BASE = (
  (typeof window !== 'undefined' && window.STORE_API_URL) ||
  ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
    ? 'http://127.0.0.1:5000'
    : 'https://shopstoredemo.onrender.com')
);
const API_BASE = RAW_API_BASE.replace(/\/+$/, '').replace(/\/api$/i, '');
const API = `${API_BASE}/api`;
const TAX_RATE = 0.08;
const PAGE_SIZE = 8;
const AUTH_TOKEN_KEY = 'mono-auth-token';

const INFO_PAGES = {
  about: {
    eyebrow: 'Company',
    title: 'About MONO',
    intro: 'MONO creates modern essentials designed for daily life. We focus on fewer, better products that pair timeless form with durable function.',
    sections: [
      {
        heading: 'Our Design Philosophy',
        text: 'We build around clarity. Every product starts from a real routine, then we refine materials, proportions, and details until the final piece feels effortless to use.'
      },
      {
        heading: 'How We Build',
        bullets: [
          'Small-batch production with trusted manufacturing partners',
          'Material-first decisions based on longevity and repairability',
          'Quality control on fit, finish, and daily wear performance'
        ]
      },
      {
        heading: 'What Matters To Us',
        text: 'Honest pricing, transparent sourcing, and products you can keep for years. We are not here for fast drops. We are here for lasting value.'
      }
    ]
  },
  journal: {
    eyebrow: 'Stories',
    title: 'MONO Journal',
    intro: 'A running log of our product process, creative references, and practical guides for caring for the things you own.',
    sections: [
      {
        heading: 'Latest Notes',
        bullets: [
          'Field Notes: Building a carry system that scales from weekday to weekend',
          'Material Study: Why we chose brushed cotton twill for outer layers',
          'Studio Log: 5 details we changed before final production'
        ]
      },
      {
        heading: 'Coming Soon',
        text: 'Long-form interviews with makers, behind-the-scenes photo essays, and a monthly look at what we are prototyping next.'
      }
    ]
  },
  faq: {
    eyebrow: 'Help',
    title: 'Frequently Asked Questions',
    intro: 'Answers to common order, product, and payment questions.',
    sections: [
      {
        heading: 'Orders & Payments',
        bullets: [
          'We accept all major credit cards and secure checkout payments.',
          'You can update your order within 1 hour of placing it.',
          'Promo codes can be applied in cart before checkout.'
        ]
      },
      {
        heading: 'Products',
        bullets: [
          'Product measurements are listed on each detail page.',
          'If you are between sizes, we usually recommend sizing up.',
          'Care instructions are included with each item and in product specs.'
        ]
      }
    ]
  },
  'shipping-policy': {
    eyebrow: 'Help',
    title: 'Shipping Policy',
    intro: 'We process orders quickly and provide tracking on every shipment.',
    sections: [
      {
        heading: 'Processing Times',
        bullets: [
          'Orders are processed Monday through Friday.',
          'Most orders ship within 1-2 business days.',
          'During launches and holidays, processing may take up to 3 business days.'
        ]
      },
      {
        heading: 'Delivery Estimates',
        bullets: [
          'Standard shipping: 3-7 business days',
          'Expedited shipping: 2-3 business days',
          'International delivery windows vary by destination and customs'
        ]
      },
      {
        heading: 'Tracking',
        text: 'Once your package ships, you will receive an email with tracking details. If tracking has not updated after 48 hours, contact us and we will investigate.'
      }
    ]
  },
  returns: {
    eyebrow: 'Help',
    title: 'Returns & Exchanges',
    intro: 'If something is not right, we will help make it right.',
    sections: [
      {
        heading: 'Return Window',
        bullets: [
          'Returns are accepted within 30 days of delivery.',
          'Items must be unworn, unwashed, and in original packaging.',
          'Final sale items are not eligible for return.'
        ]
      },
      {
        heading: 'Exchanges',
        text: 'Need a different size or color? Start an exchange request through support and we will reserve replacement stock when available.'
      },
      {
        heading: 'Refund Timing',
        text: 'Approved returns are refunded to your original payment method within 5-10 business days after warehouse inspection.'
      }
    ]
  },
  'contact-us': {
    eyebrow: 'Help',
    title: 'Contact Us',
    intro: 'Our support team replies quickly and can help with orders, sizing, returns, and product questions.',
    sections: [
      {
        heading: 'Customer Support',
        bullets: [
          'Email: support@mono-store.com',
          'Hours: Monday-Friday, 9:00 AM-6:00 PM ET',
          'Average response time: under 24 hours'
        ]
      },
      {
        heading: 'Press & Partnerships',
        text: 'For collaborations, wholesale, or media requests, contact partnerships@mono-store.com with your company details and timeline.'
      }
    ]
  },
  profile: {
    eyebrow: 'Account',
    title: 'Your Profile',
    intro: 'Manage your account details and keep your profile information up to date.',
    sections: [
      {
        heading: 'Account Access',
        bullets: [
          'Sign in to view and update your profile information',
          'Use the same account for orders, checkout, and support',
          'Keep your email current to receive order confirmations'
        ]
      },
      {
        heading: 'Need Help?',
        text: 'If you have trouble accessing your account, contact support@mono-store.com and we will help you recover access.'
      }
    ]
  }
};

const FALLBACK_PRODUCTS = [
  {
    _id: 'f1',
    name: 'Minimal Watch',
    category: 'Accessories',
    price: 189,
    rating: 4.9,
    reviews: 48,
    description: 'Swiss-inspired watch with clean lines and durable stainless steel build.',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80'],
    sizes: [],
    colors: ['#101010', '#9a9a9a', '#d8c9a6'],
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    _id: 'f2',
    name: 'City Sneakers',
    category: 'Footwear',
    price: 145,
    rating: 4.7,
    reviews: 120,
    description: 'Comfort-first daily sneakers with lightweight cushioning and breathable mesh.',
    images: ['https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=900&q=80'],
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['#ffffff', '#1d1d1d', '#7b8894'],
    createdAt: '2026-02-18T10:00:00Z'
  },
  {
    _id: 'f3',
    name: 'Merino Overshirt',
    category: 'Apparel',
    price: 118,
    rating: 4.6,
    reviews: 64,
    description: 'Soft structured overshirt in premium merino blend for year-round layering.',
    images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&q=80'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#253041', '#8a6f53', '#ece7dc'],
    createdAt: '2026-03-01T10:00:00Z'
  },
  {
    _id: 'f4',
    name: 'Leather Tech Pouch',
    category: 'Tech',
    price: 79,
    rating: 4.8,
    reviews: 39,
    description: 'Compact organizer for cables, adapters, and accessories with zip closure.',
    images: ['https://images.pexels.com/photos/1050340/pexels-photo-1050340.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    sizes: [],
    colors: ['#2e2e2e', '#ab8f66'],
    createdAt: '2026-01-22T10:00:00Z'
  },
  {
    _id: 'f5',
    name: 'Canvas Weekender',
    category: 'Accessories',
    price: 132,
    rating: 4.5,
    reviews: 71,
    description: 'Structured carry bag with reinforced handles and water-resistant finish.',
    images: ['https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    sizes: [],
    colors: ['#d4c3a3', '#1d262f'],
    createdAt: '2026-03-20T10:00:00Z'
  },
  {
    _id: 'f6',
    name: 'Studio Hoodie',
    category: 'Apparel',
    price: 92,
    rating: 4.4,
    reviews: 52,
    description: 'Heavyweight brushed fleece hoodie with relaxed fit and clean finish.',
    images: ['https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#0f1823', '#f0ede6', '#7f6757'],
    createdAt: '2026-02-09T10:00:00Z'
  },
  {
    _id: 'f7',
    name: 'Trail Running Cap',
    category: 'Accessories',
    price: 36,
    rating: 4.3,
    reviews: 28,
    description: 'Breathable low-profile cap for running sessions and sunny commutes.',
    images: ['https://images.unsplash.com/photo-1521369909029-2afed882baee?w=900&q=80'],
    sizes: ['One Size'],
    colors: ['#171717', '#c7bca8', '#4e657a'],
    createdAt: '2026-03-24T10:00:00Z'
  },
  {
    _id: 'f8',
    name: 'Everyday Tee',
    category: 'Apparel',
    price: 38,
    rating: 4.5,
    reviews: 87,
    description: 'Midweight cotton tee with a tailored cut and soft-washed texture.',
    images: ['https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=900&q=80'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#ffffff', '#222222', '#8f7760'],
    createdAt: '2026-03-26T10:00:00Z'
  },
  {
    _id: 'f9',
    name: 'Desk Lamp Mini',
    category: 'Home',
    price: 68,
    rating: 4.6,
    reviews: 33,
    description: 'Compact aluminum desk lamp with warm dimmable LED glow.',
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&q=80'],
    sizes: [],
    colors: ['#f3efe8', '#3b3b3b'],
    createdAt: '2026-03-29T10:00:00Z'
  },
  {
    _id: 'f10',
    name: 'Travel Bottle 750ml',
    category: 'Lifestyle',
    price: 29,
    rating: 4.7,
    reviews: 102,
    description: 'Double-wall insulated bottle that keeps drinks cold or hot for hours.',
    images: ['https://images.unsplash.com/photo-1523362628745-0c100150b504?w=900&q=80'],
    sizes: ['750ml'],
    colors: ['#d9d2c3', '#1d2730', '#7f8d96'],
    createdAt: '2026-03-31T10:00:00Z'
  }
];

const state = {
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

function fmt(amount) {
  return `$${Number(amount).toFixed(2)}`;
}

function safeText(value) {
  return String(value ?? '').replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[m]));
}

function getStoredAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY) || '';
}

function setStoredAuthToken(token) {
  if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
  else localStorage.removeItem(AUTH_TOKEN_KEY);
}

function setAuthSession(token, user) {
  state.authToken = token || '';
  setStoredAuthToken(state.authToken);
  state.currentUser = user || null;
  updateNavAuthState();
}

function clearAuthSession() {
  state.authToken = '';
  state.currentUser = null;
  state.profile = null;
  setStoredAuthToken('');
  updateNavAuthState();
}

function updateNavAuthState() {
  const authState = document.getElementById('authState');
  if (!authState) return;

  if (state.currentUser?.name) {
    authState.textContent = `Hi, ${state.currentUser.name}`;
    return;
  }

  authState.textContent = 'Guest';
}

function clearFieldError(input) {
  const field = input?.parentElement;
  if (!field) return;
  const msg = field.querySelector('.field-error');
  if (msg) msg.remove();
  input.removeAttribute('aria-invalid');
}

function setFieldError(input, message) {
  const field = input?.parentElement;
  if (!field) return;
  clearFieldError(input);
  const msg = document.createElement('p');
  msg.className = 'field-error';
  msg.textContent = message;
  field.appendChild(msg);
  input.setAttribute('aria-invalid', 'true');
}

function clearFormErrors(form) {
  if (!form) return;
  form.querySelectorAll('input, textarea').forEach(input => clearFieldError(input));
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

function getProductId(product) {
  return String(product?._id || product?.id || '');
}

function getProductById(productId) {
  return state.products.find(p => getProductId(p) === String(productId));
}

function getCartItems() {
  return (state.cart?.items || []).map(item => {
    const fromItem = typeof item.productId === 'object' ? item.productId : null;
    const id = fromItem ? getProductId(fromItem) : String(item.productId);
    // 1) populated product object on the item itself (API response)
    // 2) look up from loaded products list
    // 3) fall back to _product snapshot saved during local cart persist
    const product = fromItem || getProductById(id) || item._product || null;
    return {
      productId: id,
      product,
      qty: Number(item.qty) || 1
    };
  }).filter(item => item.product);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 1800);
}

function persistLocalCart() {
  if (!state.useLocalCart) return;
  // Store product snapshots so cart renders even before /api/products responds
  const itemsWithSnapshots = state.cart.items.map(item => {
    const pid = String(item.productId);
    const product = getProductById(pid) ||
      (typeof item.productId === 'object' ? item.productId : null);
    return { productId: pid, qty: item.qty, _product: product || undefined };
  });
  localStorage.setItem('mono-cart', JSON.stringify({ items: itemsWithSnapshots }));
}

function readLocalCart() {
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

async function requestJSON(url, options) {
  const headers = {
    ...(options?.headers || {})
  };

  if (state.authToken && !headers.Authorization) {
    headers.Authorization = `Bearer ${state.authToken}`;
  }

  const res = await fetch(url, {
    ...(options || {}),
    headers
  });

  let data = null;
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    data = await res.json();
  }

  if (!res.ok) {
    const message = data?.message || `HTTP ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }
  return data;
}

async function loadCurrentUser() {
  if (!state.authToken) return null;

  const data = await requestJSON(`${API}/auth/me`);
  state.currentUser = data?.user || null;
  return state.currentUser;
}

async function loadProfile() {
  if (!state.authToken) return null;

  const data = await requestJSON(`${API}/profile`);
  state.profile = data?.profile || null;
  return state.profile;
}

async function refreshAuthState() {
  if (!state.authToken) return;

  try {
    await loadCurrentUser();
    await loadProfile();
    updateNavAuthState();
  } catch {
    clearAuthSession();
  }
}

function renderProfilePage() {
  state.currentInfoPage = 'profile';
  const eyebrow = document.getElementById('infoEyebrow');
  const title = document.getElementById('infoTitle');
  const intro = document.getElementById('infoIntro');
  const content = document.getElementById('infoContent');

  if (eyebrow) eyebrow.textContent = 'Account';
  if (title) title.textContent = state.currentUser ? 'Your Profile' : 'Sign In or Create Account';
  if (intro) {
    intro.textContent = state.currentUser
      ? 'Update your account details below. Changes are saved to your profile in real time.'
      : 'Sign in to access your profile, or create a new account in seconds.';
  }

  if (!content) return;

  if (!state.currentUser || !state.authToken) {
    content.innerHTML = `
      <section class="info-block auth-block">
        <h3>Sign In</h3>
        <form id="loginForm" class="auth-form">
          <div class="form-field">
            <label>Email</label>
            <input type="email" name="email" placeholder="jane@example.com" required />
          </div>
          <div class="form-field">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter password" required />
          </div>
          <button class="btn-primary auth-submit" type="submit">Sign In</button>
        </form>
      </section>

      <section class="info-block auth-block">
        <h3>Create Account</h3>
        <form id="registerForm" class="auth-form">
          <div class="form-field">
            <label>Full Name</label>
            <input type="text" name="name" placeholder="Jane Smith" required />
          </div>
          <div class="form-field">
            <label>Email</label>
            <input type="email" name="email" placeholder="jane@example.com" required />
          </div>
          <div class="form-field">
            <label>Password</label>
            <input type="password" name="password" placeholder="At least 8 characters" minlength="8" required />
          </div>
          <button class="btn-outline auth-submit" type="submit">Create Account</button>
        </form>
      </section>
    `;

    const loginForm = document.getElementById('loginForm');
    loginForm?.addEventListener('submit', async e => {
      e.preventDefault();
      clearFormErrors(loginForm);
      const form = new FormData(loginForm);
      const email = String(form.get('email') || '').trim();
      const password = String(form.get('password') || '');
      const emailInput = loginForm.querySelector('input[name="email"]');
      const passwordInput = loginForm.querySelector('input[name="password"]');

      let invalid = false;
      if (!isEmail(email)) {
        setFieldError(emailInput, 'Enter a valid email address.');
        invalid = true;
      }
      if (!password) {
        setFieldError(passwordInput, 'Password is required.');
        invalid = true;
      }
      if (invalid) return;

      try {
        const data = await requestJSON(`${API}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password
          })
        });

        setAuthSession(data?.token, data?.user);
        await loadProfile();
        showToast('Signed in successfully');
        renderProfilePage();
      } catch (error) {
        showToast(error.message || 'Unable to sign in');
      }
    });

    const registerForm = document.getElementById('registerForm');
    registerForm?.addEventListener('submit', async e => {
      e.preventDefault();
      clearFormErrors(registerForm);
      const form = new FormData(registerForm);
      const name = String(form.get('name') || '').trim();
      const email = String(form.get('email') || '').trim();
      const password = String(form.get('password') || '');
      const nameInput = registerForm.querySelector('input[name="name"]');
      const emailInput = registerForm.querySelector('input[name="email"]');
      const passwordInput = registerForm.querySelector('input[name="password"]');

      let invalid = false;
      if (name.length < 2) {
        setFieldError(nameInput, 'Name must be at least 2 characters.');
        invalid = true;
      }
      if (!isEmail(email)) {
        setFieldError(emailInput, 'Enter a valid email address.');
        invalid = true;
      }
      if (password.length < 8) {
        setFieldError(passwordInput, 'Password must be at least 8 characters.');
        invalid = true;
      }
      if (invalid) return;

      try {
        const data = await requestJSON(`${API}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            password
          })
        });

        setAuthSession(data?.token, data?.user);
        await loadProfile();
        showToast('Account created');
        renderProfilePage();
      } catch (error) {
        showToast(error.message || 'Unable to create account');
      }
    });

    return;
  }

  const profileData = state.profile || state.currentUser;
  const profileName = safeText(profileData?.name || state.currentUser?.name || '');
  const profileEmail = safeText(state.currentUser?.email || profileData?.email || '');
  const profileBio = safeText(profileData?.bio || '');
  const profileAvatarUrl = safeText(profileData?.avatarUrl || '');

  content.innerHTML = `
    <section class="info-block auth-block">
      <h3>Profile Details</h3>
      <form id="profileForm" class="auth-form">
        <div class="form-field">
          <label>Full Name</label>
          <input type="text" name="name" value="${profileName}" required />
        </div>
        <div class="form-field">
          <label>Email</label>
          <input type="email" value="${profileEmail}" disabled />
        </div>
        <div class="form-field">
          <label>Bio</label>
          <textarea name="bio" rows="4" placeholder="Tell us a little about yourself">${profileBio}</textarea>
        </div>
        <div class="form-field">
          <label>Avatar URL</label>
          <input type="url" name="avatarUrl" value="${profileAvatarUrl}" placeholder="https://example.com/avatar.jpg" />
        </div>
        <div class="auth-actions">
          <button class="btn-primary auth-submit" type="submit">Save Profile</button>
          <button class="btn-outline auth-submit" type="button" id="logoutBtn">Sign Out</button>
        </div>
      </form>
    </section>
  `;

  const profileForm = document.getElementById('profileForm');
  profileForm?.addEventListener('submit', async e => {
    e.preventDefault();
    clearFormErrors(profileForm);
    const form = new FormData(profileForm);
    const name = String(form.get('name') || '').trim();
    const avatarUrl = String(form.get('avatarUrl') || '').trim();
    const nameInput = profileForm.querySelector('input[name="name"]');
    const avatarInput = profileForm.querySelector('input[name="avatarUrl"]');

    let invalid = false;
    if (name.length < 2) {
      setFieldError(nameInput, 'Name must be at least 2 characters.');
      invalid = true;
    }
    if (avatarUrl && !/^https?:\/\//i.test(avatarUrl)) {
      setFieldError(avatarInput, 'Avatar URL must start with http:// or https://');
      invalid = true;
    }
    if (invalid) return;

    try {
      const data = await requestJSON(`${API}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          bio: String(form.get('bio') || '').trim(),
          avatarUrl
        })
      });

      state.profile = data?.profile || null;
      if (state.profile?.name && state.currentUser) {
        state.currentUser.name = state.profile.name;
      }
      updateNavAuthState();
      showToast('Profile updated');
      renderProfilePage();
    } catch (error) {
      showToast(error.message || 'Unable to update profile');
    }
  });

  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    clearAuthSession();
    showToast('Signed out');
    renderProfilePage();
  });
}

async function openProfilePage(options = {}) {
  renderProfilePage();
  showPage('info', options);

  if (!state.authToken) return;

  await refreshAuthState();
  if (state.currentInfoPage === 'profile') {
    renderProfilePage();
  }
}

async function loadProducts() {
  state.isLoadingProducts = true;
  renderLoadingProducts();

  try {
    const data = await requestJSON(`${API}/products`);
    const apiProducts = Array.isArray(data) ? data : [];
    if (apiProducts.length === 0) {
      state.products = FALLBACK_PRODUCTS;
      showToast('API returned no products. Showing demo catalog.');
    } else if (apiProducts.length < 8) {
      state.products = FALLBACK_PRODUCTS;
    } else {
      state.products = apiProducts;
    }
  } catch {
    state.products = FALLBACK_PRODUCTS;
    showToast('API unavailable. Showing demo products.');
  }

  const maxPrice = Math.max(500, ...state.products.map(p => Number(p.price) || 0));
  state.filters.maxPrice = maxPrice;

  const priceRange = document.getElementById('priceRange');
  if (priceRange) {
    priceRange.max = String(maxPrice);
    priceRange.value = String(maxPrice);
  }

  updatePrice(maxPrice);
  state.isLoadingProducts = false;
  state.productsLoaded = true;
  updateCategoryCounts();
  renderFeatured();
  renderShop();

  // If the cart was already loaded (local fallback or API) before products
  // finished, re-render now so product lookups succeed and the badge is correct.
  if (state.cart.items.length > 0) {
    renderCartViews();
  }
}

function renderLoadingProducts() {
  const skeletonCard = `
    <article class="product-card skeleton">
      <div class="product-card-img"></div>
      <div class="product-card-body">
        <div class="skeleton-line sm"></div>
        <div class="skeleton-line lg"></div>
        <div class="skeleton-line md"></div>
      </div>
    </article>
  `;

  const featured = document.getElementById('featuredGrid');
  if (featured) {
    featured.innerHTML = skeletonCard.repeat(4);
  }

  const shop = document.getElementById('shopGrid');
  if (shop) {
    shop.innerHTML = skeletonCard.repeat(8);
  }
}

async function loadCart() {
  if (state.useLocalCart) {
    state.cart = readLocalCart();
    renderCartViews();
    return;
  }

  try {
    const data = await requestJSON(`${API}/cart`);
    state.cart = data || { items: [] };
  } catch {
    state.useLocalCart = true;
    state.cart = readLocalCart();
    showToast('Cart API unavailable. Using local cart.');
  }

  // Always re-render after products are confirmed loaded so local cart
  // item lookup (getProductById) succeeds and the badge/drawer are correct.
  renderCartViews();
}

async function addToCart(productId, qty = 1) {
  const normalizedQty = Math.max(1, Number(qty) || 1);

  if (state.useLocalCart) {
    const found = state.cart.items.find(i => String(i.productId) === String(productId));
    if (found) {
      found.qty += normalizedQty;
    } else {
      // Store a _product snapshot so the item renders on next page load even
      // before /api/products has responded (fixes the local-cart race condition).
      const productSnapshot = getProductById(String(productId));
      state.cart.items.push({
        productId: String(productId),
        qty: normalizedQty,
        _product: productSnapshot || undefined
      });
    }
    persistLocalCart();
    renderCartViews();
    showToast('Added to cart');
    return;
  }

  try {
    await requestJSON(`${API}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, qty: normalizedQty })
    });
    await loadCart();
    showToast('Added to cart');
  } catch {
    showToast('Unable to add item right now.');
  }
}

async function removeFromCart(productId) {
  if (state.useLocalCart) {
    state.cart.items = state.cart.items.filter(i => String(i.productId) !== String(productId));
    persistLocalCart();
    renderCartViews();
    return;
  }

  try {
    await requestJSON(`${API}/cart/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    });
    await loadCart();
  } catch {
    showToast('Unable to remove item right now.');
  }
}

async function setCartQty(productId, newQty) {
  const qty = Number(newQty) || 0;

  if (qty <= 0) {
    await removeFromCart(productId);
    return;
  }

  if (state.useLocalCart) {
    const item = state.cart.items.find(i => String(i.productId) === String(productId));
    if (item) item.qty = qty;
    else state.cart.items.push({ productId: String(productId), qty });
    persistLocalCart();
    renderCartViews();
    return;
  }

  // API has add/remove only, so re-create quantity in two steps.
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
  } catch {
    showToast('Unable to update quantity right now.');
  }
}

function computeTotals() {
  const subtotal = getCartItems().reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  return { subtotal, tax, total };
}

function renderFeatured() {
  const featured = [...state.products]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);
  renderProductGrid(featured, document.getElementById('featuredGrid'), false);
}

function productMatchesFilters(product) {
  const nameMatches = product.name.toLowerCase().includes(state.filters.query.toLowerCase());
  const categoryMatches = state.filters.categories.size === 0 || state.filters.categories.has(product.category);
  const priceMatches = (Number(product.price) || 0) <= state.filters.maxPrice;
  const ratingMatches = (Number(product.rating) || 0) >= state.filters.minRating;
  return nameMatches && categoryMatches && priceMatches && ratingMatches;
}

function sortedProducts(list) {
  const sorted = [...list];
  if (state.sortMode === 'price-asc') sorted.sort((a, b) => a.price - b.price);
  else if (state.sortMode === 'price-desc') sorted.sort((a, b) => b.price - a.price);
  else if (state.sortMode === 'newest') sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  else if (state.sortMode === 'rating') sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  return sorted;
}

function renderProductGrid(list, container, useListView) {
  if (!container) return;

  container.classList.toggle('product-grid--list', Boolean(useListView));
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">⌕</div>
        <h3>No products found</h3>
        <p>Try changing your filters or search terms.</p>
        <button class="btn-outline" onclick="clearFilters()">Clear filters</button>
      </div>
    `;
    return;
  }

  list.forEach(product => {
    const card = document.createElement('article');
    card.className = `product-card ${useListView ? 'product-card--list' : ''}`;
    card.onclick = () => openDetail(getProductId(product));

    const stars = '★'.repeat(Math.round(product.rating || 0)).padEnd(5, '☆');
    const description = safeText(product.description || 'Designed with intention and made to last.');
    const image = (product.images && product.images[0]) || 'https://via.placeholder.com/600';

    card.innerHTML = `
      <div class="product-card-img">
        <img src="${safeText(image)}" alt="${safeText(product.name)}" />
        <button class="quick-add" data-id="${safeText(getProductId(product))}">Quick Add</button>
      </div>
      <div class="product-card-body">
        <div>
          <p class="product-card-cat">${safeText(product.category || 'General')}</p>
          <h3 class="product-card-name">${safeText(product.name)}</h3>
          ${useListView ? `<p class="product-card-desc">${description}</p>` : ''}
        </div>
        <div class="product-card-footer">
          <p class="product-card-price">${fmt(product.price || 0)}</p>
          <p class="product-card-rating">${stars}</p>
          ${useListView ? `<span class="review-count">${Number(product.reviews) || 0} reviews</span>` : ''}
          ${useListView ? '<button class="btn-outline btn-outline--sm">View Details</button>' : ''}
        </div>
      </div>
    `;

    const addBtn = card.querySelector('.quick-add');
    addBtn?.addEventListener('click', e => {
      e.stopPropagation();
      addToCart(getProductId(product), 1);
    });

    container.appendChild(card);
  });
}

function renderShop() {
  const filtered = state.products.filter(productMatchesFilters);
  const sorted = sortedProducts(filtered);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  state.currentShopPage = Math.min(state.currentShopPage, totalPages);
  const start = (state.currentShopPage - 1) * PAGE_SIZE;
  const pageList = sorted.slice(start, start + PAGE_SIZE);

  const resultsCount = document.querySelector('.results-count span');
  if (resultsCount) resultsCount.textContent = String(filtered.length);

  renderProductGrid(pageList, document.getElementById('shopGrid'), state.viewMode === 'list');
  renderPagination(totalPages);
  renderActiveChips();
}

function renderPagination(totalPages) {
  const pagination = document.querySelector('.pagination');
  if (!pagination) return;

  pagination.innerHTML = '';

  const prev = document.createElement('button');
  prev.className = `page-btn page-next ${state.currentShopPage === 1 ? 'disabled' : ''}`;
  prev.textContent = '← Prev';
  prev.onclick = () => {
    if (state.currentShopPage > 1) {
      state.currentShopPage -= 1;
      renderShop();
    }
  };
  pagination.appendChild(prev);

  for (let page = 1; page <= totalPages; page += 1) {
    if (totalPages > 7 && page > 2 && page < totalPages - 1 && Math.abs(page - state.currentShopPage) > 1) {
      if (!pagination.querySelector('.page-dots:last-child')) {
        const dots = document.createElement('span');
        dots.className = 'page-dots';
        dots.textContent = '...';
        pagination.appendChild(dots);
      }
      continue;
    }

    const btn = document.createElement('button');
    btn.className = `page-btn ${page === state.currentShopPage ? 'active' : ''}`;
    btn.textContent = String(page);
    btn.onclick = () => {
      state.currentShopPage = page;
      renderShop();
    };
    pagination.appendChild(btn);
  }

  const next = document.createElement('button');
  next.className = `page-btn page-next ${state.currentShopPage === totalPages ? 'disabled' : ''}`;
  next.textContent = 'Next →';
  next.onclick = () => {
    if (state.currentShopPage < totalPages) {
      state.currentShopPage += 1;
      renderShop();
    }
  };
  pagination.appendChild(next);
}

function renderActiveChips() {
  const chips = document.getElementById('activeChips');
  if (!chips) return;

  const items = [];
  if (state.filters.query) items.push({ label: `Search: ${state.filters.query}`, action: () => setSearch('') });
  if (state.filters.categories.size > 0) {
    [...state.filters.categories].forEach(cat => {
      items.push({ label: cat, action: () => toggleCategory(cat, false) });
    });
  }
  if (state.filters.minRating > 0) items.push({ label: `${state.filters.minRating}+ stars`, action: () => setRating(0) });
  if (state.filters.maxPrice < Number(document.getElementById('priceRange')?.max || 500)) {
    items.push({ label: `Under ${fmt(state.filters.maxPrice)}`, action: () => resetPrice() });
  }

  chips.innerHTML = '';
  items.forEach(item => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.innerHTML = `${safeText(item.label)} <button class="chip-remove" aria-label="Remove filter">×</button>`;
    chip.querySelector('button')?.addEventListener('click', item.action);
    chips.appendChild(chip);
  });
}

function updateCategoryCounts() {
  const total = state.products.length;
  const counts = state.products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const map = {
    '.filter-count-all': total,
    '.filter-count-accessories': counts.Accessories || 0,
    '.filter-count-footwear': counts.Footwear || 0,
    '.filter-count-apparel': counts.Apparel || 0,
    '.filter-count-tech': counts.Tech || 0
  };

  Object.entries(map).forEach(([selector, value]) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = String(value);
  });
}

function setSearch(value) {
  state.filters.query = value.trim();
  const input = document.getElementById('searchInput');
  if (input && input.value !== value) input.value = value;
  state.currentShopPage = 1;
  renderShop();
}

function updatePrice(value) {
  const amount = Number(value) || 0;
  state.filters.maxPrice = amount;
  const priceMax = document.getElementById('priceMax');
  if (priceMax) priceMax.textContent = fmt(amount);
  state.currentShopPage = 1;
  renderShop();
}

function resetPrice() {
  const range = document.getElementById('priceRange');
  if (!range) return;
  range.value = range.max;
  updatePrice(range.max);
}

function setRating(minRating) {
  state.filters.minRating = Number(minRating) || 0;
  document.querySelectorAll('input[name="rating"]').forEach(input => {
    input.checked = Number(input.dataset.minRating || 0) === state.filters.minRating;
  });
  if (state.filters.minRating === 0) {
    document.querySelectorAll('input[name="rating"]').forEach(input => {
      input.checked = false;
    });
  }
  state.currentShopPage = 1;
  renderShop();
}

function toggleCategory(category, enabled) {
  if (enabled) state.filters.categories.add(category);
  else state.filters.categories.delete(category);

  const allBox = document.getElementById('categoryAll');
  if (allBox) allBox.checked = state.filters.categories.size === 0;

  document.querySelectorAll('input[data-category]').forEach(input => {
    input.checked = state.filters.categories.has(input.dataset.category);
  });

  state.currentShopPage = 1;
  renderShop();
}

function clearFilters() {
  state.filters.categories.clear();
  state.filters.query = '';
  state.filters.minRating = 0;
  state.currentShopPage = 1;

  const allBox = document.getElementById('categoryAll');
  if (allBox) allBox.checked = true;

  document.querySelectorAll('input[data-category]').forEach(input => {
    input.checked = false;
  });
  document.querySelectorAll('input[name="rating"]').forEach(input => {
    input.checked = false;
  });

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';

  resetPrice();
  renderShop();
}

function openDetail(productId, options = {}) {
  const product = getProductById(productId);
  if (!product) return;

  state.selectedProductId = getProductId(product);
  state.selectedSize = (product.sizes && product.sizes[0]) || null;
  state.selectedColor = (product.colors && product.colors[0]) || null;

  const title = document.getElementById('detailTitle');
  const category = document.getElementById('detailCategory');
  const price = document.getElementById('detailPrice');
  const desc = document.getElementById('detailDesc');
  const breadcrumb = document.getElementById('detailBreadcrumb');
  const mainImg = document.getElementById('mainImg');
  const thumbs = document.getElementById('galleryThumbs');

  if (title) title.textContent = product.name;
  if (category) category.textContent = product.category || 'General';
  if (price) price.textContent = fmt(product.price || 0);
  if (desc) desc.textContent = product.description || 'Designed with intention and made to last.';
  if (breadcrumb) breadcrumb.textContent = product.name;

  const images = (product.images && product.images.length > 0) ? product.images : ['https://via.placeholder.com/800'];
  if (mainImg) {
    mainImg.src = images[0];
    mainImg.alt = product.name;
  }

  if (thumbs) {
    thumbs.innerHTML = '';
    images.forEach((src, idx) => {
      const btn = document.createElement('button');
      btn.className = `gallery-thumb ${idx === 0 ? 'active' : ''}`;
      btn.innerHTML = `<img src="${safeText(src)}" alt="${safeText(product.name)} view ${idx + 1}" />`;
      btn.onclick = () => {
        document.querySelectorAll('.gallery-thumb').forEach(el => el.classList.remove('active'));
        btn.classList.add('active');
        if (mainImg) mainImg.src = src;
      };
      thumbs.appendChild(btn);
    });
  }

  renderDetailOptions(product);

  const qty = document.querySelector('.detail-actions .qty-stepper span');
  if (qty) qty.textContent = '1';

  showPage('detail', options);
}

function renderDetailOptions(product) {
  const sizeGroup = document.getElementById('sizeGroup');
  const sizeButtons = document.getElementById('sizeButtons');
  const colorGroup = document.getElementById('colorGroup');
  const colorSwatches = document.getElementById('colorSwatches');

  if (sizeButtons) {
    sizeButtons.innerHTML = '';
    (product.sizes || []).forEach((size, idx) => {
      const btn = document.createElement('button');
      btn.className = `option-btn ${idx === 0 ? 'active' : ''}`;
      btn.textContent = size;
      btn.onclick = () => {
        state.selectedSize = size;
        sizeButtons.querySelectorAll('button').forEach(node => node.classList.remove('active'));
        btn.classList.add('active');
      };
      sizeButtons.appendChild(btn);
    });
  }

  if (sizeGroup) {
    sizeGroup.classList.toggle('is-hidden', !(product.sizes && product.sizes.length));
  }

  if (colorSwatches) {
    colorSwatches.innerHTML = '';
    (product.colors || []).forEach((color, idx) => {
      const btn = document.createElement('button');
      btn.className = `color-swatch ${idx === 0 ? 'active' : ''}`;
      btn.style.background = color;
      btn.title = color;
      btn.onclick = () => {
        state.selectedColor = color;
        colorSwatches.querySelectorAll('button').forEach(node => node.classList.remove('active'));
        btn.classList.add('active');
      };
      colorSwatches.appendChild(btn);
    });
  }

  if (colorGroup) {
    colorGroup.classList.toggle('is-hidden', !(product.colors && product.colors.length));
  }
}

async function addToCartFromDetail() {
  if (!state.selectedProductId) return;
  const qtyNode = document.querySelector('.detail-actions .qty-stepper span');
  const qty = qtyNode ? Number(qtyNode.textContent) || 1 : 1;
  await addToCart(state.selectedProductId, qty);
}

function changeQty(button, delta) {
  const valueNode = button?.parentElement?.querySelector('span');
  if (!valueNode) return;
  const current = Number(valueNode.textContent) || 1;
  const next = Math.max(1, current + Number(delta));
  valueNode.textContent = String(next);
}

async function changeCartQty(productId, delta) {
  const item = getCartItems().find(i => i.productId === String(productId));
  if (!item) return;
  await setCartQty(productId, item.qty + Number(delta));
}

function renderCartDrawer() {
  const itemsWrap = document.querySelector('.drawer-items');
  const title = document.getElementById('drawerTitle');
  const subtotalEl = document.getElementById('drawerSubtotal');
  const totalEl = document.getElementById('drawerTotal');
  const items = getCartItems();

  if (!itemsWrap) return;

  if (items.length === 0) {
    itemsWrap.innerHTML = '<div class="empty-state"><h3>Your cart is empty</h3><p>Add a product to get started.</p></div>';
  } else {
    itemsWrap.innerHTML = '';
    items.forEach(item => {
      const line = document.createElement('article');
      line.className = 'cart-item';
      line.innerHTML = `
        <div class="cart-item-img"><img src="${safeText(item.product.images?.[0] || '')}" alt="${safeText(item.product.name)}" /></div>
        <div class="cart-item-info">
          <p class="cart-item-name">${safeText(item.product.name)}</p>
          <p class="cart-item-variant">${safeText(item.product.category || 'General')}</p>
          <div class="cart-item-row">
            <div class="qty-stepper">
              <button data-action="minus">−</button>
              <span>${item.qty}</span>
              <button data-action="plus">+</button>
            </div>
            <p class="cart-item-price">${fmt(item.product.price * item.qty)}</p>
          </div>
        </div>
        <button class="cart-remove">Remove</button>
      `;

      line.querySelector('[data-action="minus"]')?.addEventListener('click', () => changeCartQty(item.productId, -1));
      line.querySelector('[data-action="plus"]')?.addEventListener('click', () => changeCartQty(item.productId, 1));
      line.querySelector('.cart-remove')?.addEventListener('click', () => removeFromCart(item.productId));
      itemsWrap.appendChild(line);
    });
  }

  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);
  const totals = computeTotals();
  if (title) title.textContent = `Your Cart (${totalQty})`;
  if (subtotalEl) subtotalEl.textContent = fmt(totals.subtotal);
  if (totalEl) totalEl.textContent = fmt(totals.total);
}

function renderCartPage() {
  const itemsWrap = document.getElementById('cartPageItems');
  const couponRow = document.querySelector('.coupon-row');
  const items = getCartItems();

  if (itemsWrap) {
    itemsWrap.querySelectorAll('.cart-full-item, .empty-state').forEach(node => node.remove());

    if (items.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.innerHTML = '<h3>Your cart is empty</h3><p>Browse products and add your first item.</p><button class="btn-outline" onclick="showPage(\'shop\')">Go to Shop</button>';
      itemsWrap.insertBefore(empty, couponRow || null);
    } else {
      items.forEach(item => {
        const row = document.createElement('article');
        row.className = 'cart-full-item';
        row.innerHTML = `
          <img src="${safeText(item.product.images?.[0] || '')}" alt="${safeText(item.product.name)}" />
          <div class="cart-full-info">
            <p class="cart-full-name">${safeText(item.product.name)}</p>
            <p class="cart-full-variant">${safeText(item.product.category || 'General')}</p>
            <div class="cart-full-row">
              <div class="qty-stepper">
                <button data-action="minus">−</button>
                <span>${item.qty}</span>
                <button data-action="plus">+</button>
              </div>
              <p class="cart-full-price">${fmt(item.product.price * item.qty)}</p>
              <button class="remove-link">Remove</button>
            </div>
          </div>
        `;
        row.querySelector('[data-action="minus"]')?.addEventListener('click', () => changeCartQty(item.productId, -1));
        row.querySelector('[data-action="plus"]')?.addEventListener('click', () => changeCartQty(item.productId, 1));
        row.querySelector('.remove-link')?.addEventListener('click', () => removeFromCart(item.productId));
        itemsWrap.insertBefore(row, couponRow || null);
      });
    }
  }

  const totals = computeTotals();
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartTax = document.getElementById('cartTax');
  const cartTotal = document.getElementById('cartTotal');
  if (cartSubtotal) cartSubtotal.textContent = fmt(totals.subtotal);
  if (cartTax) cartTax.textContent = fmt(totals.tax);
  if (cartTotal) cartTotal.textContent = fmt(totals.total);
}

function renderCheckoutSummary() {
  const mini = document.querySelector('.mini-cart-items');
  const items = getCartItems();

  if (mini) {
    mini.innerHTML = '';
    items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'mini-cart-item';
      row.innerHTML = `
        <img src="${safeText(item.product.images?.[0] || '')}" alt="${safeText(item.product.name)}" />
        <div>
          <p>${safeText(item.product.name)}</p>
          <span class="meta">Qty ${item.qty}</span>
        </div>
        <span>${fmt(item.product.price * item.qty)}</span>
      `;
      mini.appendChild(row);
    });
  }

  const totals = computeTotals();
  const checkoutSubtotal = document.getElementById('checkoutSubtotal');
  const checkoutTax = document.getElementById('checkoutTax');
  const checkoutTotal = document.getElementById('checkoutTotal');
  if (checkoutSubtotal) checkoutSubtotal.textContent = fmt(totals.subtotal);
  if (checkoutTax) checkoutTax.textContent = fmt(totals.tax);
  if (checkoutTotal) checkoutTotal.textContent = fmt(totals.total);

  const placeOrderBtn = document.querySelector('#checkoutPage .btn-primary.full-width');
  if (placeOrderBtn) placeOrderBtn.textContent = `Place Order - ${fmt(totals.total)}`;

  const confirmTotal = document.getElementById('confirmTotal');
  if (confirmTotal) confirmTotal.textContent = fmt(totals.total);
}

function renderCartBadge() {
  const badge = document.getElementById('cartCount');
  if (!badge) return;
  const totalQty = getCartItems().reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = String(totalQty);
}

function renderCartViews() {
  renderCartBadge();
  renderCartDrawer();
  renderCartPage();
  renderCheckoutSummary();
}

function openCart() {
  document.getElementById('cartDrawer')?.classList.add('open');
  document.getElementById('overlay')?.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.getElementById('overlay')?.classList.remove('show');
  document.body.style.overflow = '';
}

function renderInfoPage(pageKey) {
  if (pageKey === 'profile') {
    renderProfilePage();
    return;
  }

  const page = INFO_PAGES[pageKey] || INFO_PAGES.about;
  state.currentInfoPage = INFO_PAGES[pageKey] ? pageKey : 'about';
  const eyebrow = document.getElementById('infoEyebrow');
  const title = document.getElementById('infoTitle');
  const intro = document.getElementById('infoIntro');
  const content = document.getElementById('infoContent');

  if (eyebrow) eyebrow.textContent = page.eyebrow;
  if (title) title.textContent = page.title;
  if (intro) intro.textContent = page.intro;

  if (!content) return;
  content.innerHTML = '';

  page.sections.forEach(section => {
    const block = document.createElement('section');
    block.className = 'info-block';

    const heading = document.createElement('h3');
    heading.textContent = section.heading;
    block.appendChild(heading);

    if (Array.isArray(section.bullets) && section.bullets.length) {
      const list = document.createElement('ul');
      list.className = 'info-list';
      section.bullets.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
      });
      block.appendChild(list);
    }

    if (section.text) {
      const text = document.createElement('p');
      text.textContent = section.text;
      block.appendChild(text);
    }

    content.appendChild(block);
  });
}

function normalizePath(path) {
  const clean = String(path || '').trim();
  if (!clean || clean === '/') return '/';
  return clean.replace(/\/+$/, '') || '/';
}

function getPathForPage(pageName) {
  if (pageName === 'home') return '/';
  if (pageName === 'shop') return '/shop';
  if (pageName === 'cart') return '/cart';
  if (pageName === 'checkout') return '/checkout';
  if (pageName === 'confirmation') return '/confirmation';
  if (pageName === 'detail') {
    return state.selectedProductId ? `/product/${encodeURIComponent(state.selectedProductId)}` : '/product';
  }
  if (pageName === 'info') {
    return `/${state.currentInfoPage || 'about'}`;
  }
  return '/';
}

function showPage(pageName, options = {}) {
  const { skipHistory = false, replaceHistory = false } = options;
  const map = {
    home: 'homePage',
    shop: 'shopPage',
    detail: 'detailPage',
    cart: 'cartPage',
    checkout: 'checkoutPage',
    confirmation: 'confirmationPage',
    info: 'infoPage'
  };

  Object.values(map).forEach(id => {
    document.getElementById(id)?.classList.remove('active');
  });

  const target = map[pageName] || map.home;
  document.getElementById(target)?.classList.add('active');

  if (pageName === 'shop') renderShop();
  if (pageName === 'checkout' || pageName === 'cart') renderCartViews();
  if (pageName === 'confirmation') renderCheckoutSummary();

  if (!skipHistory && typeof window !== 'undefined' && window.history) {
    const targetPath = getPathForPage(pageName);
    const currentPath = normalizePath(window.location.pathname);
    if (targetPath !== currentPath) {
      if (replaceHistory) window.history.replaceState({}, '', targetPath);
      else window.history.pushState({}, '', targetPath);
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resolveRoute(pathname) {
  const path = normalizePath(pathname).toLowerCase();

  if (path === '/') {
    showPage('home', { skipHistory: true });
    return;
  }

  if (path === '/shop') {
    showPage('shop', { skipHistory: true });
    return;
  }

  if (path === '/cart') {
    showPage('cart', { skipHistory: true });
    return;
  }

  if (path === '/checkout') {
    showPage('checkout', { skipHistory: true });
    return;
  }

  if (path === '/confirmation') {
    showPage('confirmation', { skipHistory: true });
    return;
  }

  if (path === '/profile') {
    openProfilePage({ skipHistory: true });
    return;
  }

  if (path.startsWith('/product/')) {
    const productId = decodeURIComponent(path.split('/')[2] || '');
    if (productId) {
      openDetail(productId, { skipHistory: true });
      return;
    }
    showPage('shop', { skipHistory: true });
    return;
  }

  const infoKey = path.slice(1);
  if (INFO_PAGES[infoKey]) {
    renderInfoPage(infoKey);
    showPage('info', { skipHistory: true });
    return;
  }

  showPage('home', { skipHistory: false, replaceHistory: true });
}

function bindGlobalUI() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 6);
  });

  document.getElementById('menuBtn')?.addEventListener('click', () => {
    document.getElementById('mobileMenu')?.classList.toggle('open');
  });

  document.getElementById('searchToggle')?.addEventListener('click', () => {
    document.getElementById('searchBar')?.classList.add('open');
    document.getElementById('searchInput')?.focus();
  });

  document.getElementById('searchClose')?.addEventListener('click', () => {
    document.getElementById('searchBar')?.classList.remove('open');
  });

  document.getElementById('searchInput')?.addEventListener('input', e => {
    setSearch(e.target.value);
  });

  document.getElementById('accountToggle')?.addEventListener('click', () => {
    openProfilePage();
  });

  document.getElementById('cartToggle')?.addEventListener('click', openCart);
  document.getElementById('cartClose')?.addEventListener('click', closeCart);
  document.getElementById('overlay')?.addEventListener('click', closeCart);

  document.querySelector('.nav-logo')?.addEventListener('click', e => {
    e.preventDefault();
    showPage('home');
  });

  window.addEventListener('popstate', () => {
    resolveRoute(window.location.pathname);
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const route = link.dataset.page || link.textContent.trim().toLowerCase();
      document.querySelectorAll('.nav-link').forEach(node => node.classList.remove('active'));
      link.classList.add('active');

      if (route === 'shop') {
        showPage('shop');
        return;
      }

      if (route === 'about' || route === 'journal') {
        renderInfoPage(route);
        showPage('info');
        return;
      }

      showPage('home');
    });
  });

  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const route = link.dataset.page || link.textContent.trim().toLowerCase();
      document.getElementById('mobileMenu')?.classList.remove('open');

      if (route === 'shop') {
        showPage('shop');
        return;
      }

      if (route === 'about' || route === 'journal') {
        renderInfoPage(route);
        showPage('info');
        return;
      }

      showPage('home');
    });
  });

  document.querySelectorAll('.footer a[data-page]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const route = link.dataset.page;
      if (!route) return;
      renderInfoPage(route);
      showPage('info');
    });
  });

  document.querySelector('.sort-select')?.addEventListener('change', e => {
    const selected = e.target.value.toLowerCase();
    if (selected.includes('low to high')) state.sortMode = 'price-asc';
    else if (selected.includes('high to low')) state.sortMode = 'price-desc';
    else if (selected.includes('newest')) state.sortMode = 'newest';
    else if (selected.includes('best rating')) state.sortMode = 'rating';
    else state.sortMode = 'featured';
    state.currentShopPage = 1;
    renderShop();
  });

  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(node => node.classList.remove('active'));
      btn.classList.add('active');
      state.viewMode = btn.dataset.view === 'list' ? 'list' : 'grid';
      renderShop();
    });
  });

  document.getElementById('categoryAll')?.addEventListener('change', e => {
    if (e.target.checked) {
      state.filters.categories.clear();
      document.querySelectorAll('input[data-category]').forEach(input => {
        input.checked = false;
      });
      renderShop();
    }
  });

  document.querySelectorAll('input[data-category]').forEach(input => {
    input.addEventListener('change', e => {
      const cat = e.target.dataset.category;
      toggleCategory(cat, e.target.checked);
    });
  });

  document.querySelectorAll('input[name="rating"]').forEach(input => {
    input.addEventListener('change', e => {
      setRating(e.target.checked ? e.target.dataset.minRating : 0);
    });
  });

  document.querySelector('.filter-clear')?.addEventListener('click', clearFilters);

  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(node => node.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(panel => {
        panel.classList.toggle('active', panel.id === `tab-${target}`);
      });
    });
  });
}

async function initialize() {
  state.authToken = getStoredAuthToken();
  bindGlobalUI();
  updateNavAuthState();

  if (state.authToken) {
    await refreshAuthState();
  }

  // Load products FIRST so that when loadCart runs, getProductById() works.
  // This eliminates the race condition where local cart items couldn't be
  // resolved to products because state.products was still empty.
  await loadProducts();
  await loadCart();
  renderCheckoutSummary();
  resolveRoute(window.location.pathname);
}

window.showPage = showPage;
window.closeCart = closeCart;
window.updatePrice = updatePrice;
window.changeQty = changeQty;
window.addToCartFromDetail = addToCartFromDetail;
window.clearFilters = clearFilters;

initialize();