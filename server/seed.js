import mongoose from 'mongoose';
import Product from './models/Product.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mono-store';

await mongoose.connect(MONGO_URI);

const products = [
  {
    name: "Minimal Watch",
    category: "Accessories",
    price: 189,
    rating: 4.9,
    reviews: 48,
    description: "Swiss-inspired watch with clean lines and durable stainless steel build.",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80"],
    sizes: [],
    colors: ["#101010", "#9a9a9a", "#d8c9a6"]
  },
  {
    name: "City Sneakers",
    category: "Footwear",
    price: 145,
    rating: 4.7,
    reviews: 120,
    description: "Comfort-first daily sneakers with lightweight cushioning and breathable mesh.",
    images: ["https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=900&q=80"],
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["#ffffff", "#1d1d1d", "#7b8894"]
  },
  {
    name: "Merino Overshirt",
    category: "Apparel",
    price: 118,
    rating: 4.6,
    reviews: 64,
    description: "Soft structured overshirt in premium merino blend for year-round layering.",
    images: ["https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&q=80"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#253041", "#8a6f53", "#ece7dc"]
  },
  {
    name: "Leather Tech Pouch",
    category: "Tech",
    price: 79,
    rating: 4.8,
    reviews: 39,
    description: "Compact organizer for cables, adapters, and accessories with zip closure.",
    images: ["https://images.unsplash.com/photo-1498049794561-7780e7231661?w=900&q=80"],
    sizes: [],
    colors: ["#2e2e2e", "#ab8f66"]
  },
  {
    name: "Canvas Weekender",
    category: "Accessories",
    price: 132,
    rating: 4.5,
    reviews: 71,
    description: "Structured carry bag with reinforced handles and water-resistant finish.",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80"],
    sizes: [],
    colors: ["#d4c3a3", "#1d262f"]
  },
  {
    name: "Studio Hoodie",
    category: "Apparel",
    price: 92,
    rating: 4.4,
    reviews: 52,
    description: "Heavyweight brushed fleece hoodie with relaxed fit and clean finish.",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#0f1823", "#f0ede6", "#7f6757"]
  },
  {
    name: "Trail Running Cap",
    category: "Accessories",
    price: 36,
    rating: 4.3,
    reviews: 28,
    description: "Breathable low-profile cap for running sessions and sunny commutes.",
    images: ["https://images.unsplash.com/photo-1521369909029-2afed882baee?w=900&q=80"],
    sizes: ["One Size"],
    colors: ["#171717", "#c7bca8", "#4e657a"]
  },
  {
    name: "Everyday Tee",
    category: "Apparel",
    price: 38,
    rating: 4.5,
    reviews: 87,
    description: "Midweight cotton tee with a tailored cut and soft-washed texture.",
    images: ["https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=900&q=80"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#ffffff", "#222222", "#8f7760"]
  },
  {
    name: "Desk Lamp Mini",
    category: "Home",
    price: 68,
    rating: 4.6,
    reviews: 33,
    description: "Compact aluminum desk lamp with warm dimmable LED glow.",
    images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&q=80"],
    sizes: [],
    colors: ["#f3efe8", "#3b3b3b"]
  },
  {
    name: "Travel Bottle 750ml",
    category: "Lifestyle",
    price: 29,
    rating: 4.7,
    reviews: 102,
    description: "Double-wall insulated bottle that keeps drinks cold or hot for hours.",
    images: ["https://images.unsplash.com/photo-1523362628745-0c100150b504?w=900&q=80"],
    sizes: ["750ml"],
    colors: ["#d9d2c3", "#1d2730", "#7f8d96"]
  }
];

try {
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products`);
} finally {
  await mongoose.disconnect();
}
