const API = 'http://localhost:5000/api';

let products = [];
let cart = null;

// LOAD PRODUCTS
async function loadProducts() {
  const res = await fetch(`${API}/products`);
  products = await res.json();
  renderProducts(products);
}

// LOAD CART
async function loadCart() {
  const res = await fetch(`${API}/cart`);
  cart = await res.json();
  renderCart();
}

// RENDER PRODUCTS
function renderProducts(list) {
  const container = document.getElementById('products');
  container.innerHTML = '';

  list.forEach(p => {
    const div = document.createElement('div');
    div.className = 'card';

    div.innerHTML = `
      <img src="${p.images[0]}" width="100%" />
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart('${p._id}')">Add to Cart</button>
    `;

    container.appendChild(div);
  });
}

// SEARCH
document.getElementById('search').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(q)
  );
  renderProducts(filtered);
});

// ADD TO CART
async function addToCart(id) {
  await fetch(`${API}/cart/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId: id, qty: 1 })
  });

  loadCart();
}

// REMOVE FROM CART
async function removeFromCart(id) {
  await fetch(`${API}/cart/remove`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId: id })
  });

  loadCart();
}

// RENDER CART
function renderCart() {
  const container = document.getElementById('cart');
  container.innerHTML = '';

  cart.items.forEach(item => {
    const p = item.productId;

    const div = document.createElement('div');
    div.innerHTML = `
      ${p.name} x ${item.qty}
      <button onclick="removeFromCart('${p._id}')">Remove</button>
    `;

    container.appendChild(div);
  });
}

// INIT
loadProducts();
loadCart();