# Connecting MONO Store to MongoDB

This guide shows how to add a Node.js + Express backend so your store reads
products from MongoDB instead of the hardcoded `PRODUCTS` array.

---

## 1. Project Structure

```
mono-store/
├── server/
│   ├── index.js          ← Express server
│   ├── db.js             ← MongoDB connection
│   └── routes/
│       ├── products.js
│       ├── cart.js
│       └── orders.js
├── public/               ← your store.html, store.css, store.js go here
└── package.json
```

---

## 2. Install Dependencies

```bash
npm init -y
npm install express mongoose dotenv cors
```

---

## 3. Environment Variables

Create a `.env` file (never commit this):

```
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/mono_store
PORT=3000
```

Get your URI from [MongoDB Atlas](https://cloud.mongodb.com) → Connect → Drivers.

---

## 4. Database Connection (`server/db.js`)

```js
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

module.exports = connectDB;
```

---

## 5. Product Schema (`server/models/Product.js`)

```js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  category:    { type: String, required: true },
  price:       { type: Number, required: true },
  rating:      { type: Number, default: 0 },
  reviews:     { type: Number, default: 0 },
  createdAt:   { type: Date,   default: Date.now },
  images:      [String],
  description: String,
  sizes:       [String],
  colors:      [String],
});

module.exports = mongoose.model('Product', productSchema);
```

---

## 6. Products Route (`server/routes/products.js`)

```js
const express = require('express');
const router  = express.Router();
const Product = require('../models/Product');

// GET /api/products  — with optional filters
router.get('/', async (req, res) => {
  try {
    const { category, maxPrice, minRating, sort, page = 1, limit = 6 } = req.query;
    const query = {};

    if (category)  query.category = category;
    if (maxPrice)  query.price    = { $lte: Number(maxPrice) };
    if (minRating) query.rating   = { $gte: Number(minRating) };

    const sortMap = {
      'price-asc':  { price:  1 },
      'price-desc': { price: -1 },
      'newest':     { createdAt: -1 },
      'rating':     { rating: -1 },
    };
    const sortObj = sortMap[sort] || {};

    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit));

    res.json({ products, total, page: Number(page) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
```

---

## 7. Order Schema + Route (`server/models/Order.js`)

```js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name:      String,
    price:     Number,
    qty:       Number,
  }],
  customer: {
    firstName: String,
    lastName:  String,
    email:     String,
    phone:     String,
    address:   String,
    city:      String,
    state:     String,
    zip:       String,
    country:   String,
  },
  subtotal:  Number,
  tax:       Number,
  total:     Number,
  status:    { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
```

```js
// server/routes/orders.js
const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');

// POST /api/orders  — place an order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ orderNumber: order._id, status: order.status });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
```

---

## 8. Express Server (`server/index.js`)

```js
require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const connectDB  = require('./db');
const productRoutes = require('./routes/products');
const orderRoutes   = require('./routes/orders');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));   // serves store.html, store.css, store.js

app.use('/api/products', productRoutes);
app.use('/api/orders',   orderRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT || 3000, () =>
    console.log(`Server running on port ${process.env.PORT || 3000}`)
  );
});
```

---

## 9. Seed Your Products

Create `server/seed.js` and run it once:

```js
require('dotenv').config();
const mongoose = require('mongoose');
const Product  = require('./models/Product');

// Paste your PRODUCTS array from store.js here (without the `id` field —
// MongoDB will create _id automatically)
const PRODUCTS = [ /* ... */ ];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(PRODUCTS);
  console.log('Seeded', PRODUCTS.length, 'products');
  process.exit(0);
}

seed();
```

```bash
node server/seed.js
```

---

## 10. Update `store.js` to Fetch from API

Replace the hardcoded `PRODUCTS` array and rendering logic with API calls.
Add this near the top of `store.js`:

```js
// Replace the static PRODUCTS array with a fetch from the API
const API = '/api/products';

async function fetchProducts(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${API}?${qs}`);
  return res.json(); // returns { products, total, page }
}
```

Then in `renderShop()`, instead of calling `applyFiltersAndSort()` locally,
call `fetchProducts` with the current `shopState` and await the response:

```js
async function renderShop() {
  const { data } = await fetchProducts({
    category:  shopState.categories.join(','),
    maxPrice:  shopState.maxPrice,
    minRating: shopState.minRating,
    sort:      shopState.sort,
    page:      shopState.page,
    limit:     ITEMS_PER_PAGE,
    q:         shopState.query,
  });

  const grid = document.getElementById('shopGrid');
  grid.innerHTML = '';
  data.products.forEach(p => grid.appendChild(renderProductCard(p, shopState.view)));
  renderPagination(Math.ceil(data.total / ITEMS_PER_PAGE));
}
```

---

## 11. Place Orders from Checkout

In `store.js`, replace the `onclick="showPage('confirmation')"` button handler
with a fetch call:

```js
document.querySelector('#checkoutPage .checkout-form .btn-primary')
  .addEventListener('click', async () => {
    const order = {
      items: cart.map(i => {
        const p = PRODUCTS.find(x=>x.id===i.id);
        return { productId: p._id, name: p.name, price: p.price, qty: i.qty };
      }),
      customer: {
        firstName: document.querySelector('input[placeholder="Jane"]').value,
        email:     document.querySelector('input[type="email"]').value,
        // ... collect other fields
      },
      subtotal: cartSubtotal(),
      tax:      cartSubtotal() * 0.08,
      total:    cartSubtotal() * 1.08,
    };

    const res  = await fetch('/api/orders', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(order),
    });
    const data = await res.json();

    if (res.ok) {
      document.getElementById('confirmationPage')
        .querySelector('strong').textContent = `#${data.orderNumber}`;
      cart = [];
      saveCart();
      showPage('confirmation');
    } else {
      alert('Order failed: ' + data.error);
    }
  });
```

---

## 12. Run It

```bash
node server/index.js
# Open http://localhost:3000
```

That's it! Your store now reads products from MongoDB and saves orders to the database.
