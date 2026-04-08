import mongoose from 'mongoose';
import Product from './models/Product.js';

await mongoose.connect('mongodb://127.0.0.1:27017/mono-store');

await Product.deleteMany();

await Product.insertMany([
  {
    name: "Minimal Watch",
    category: "Accessories",
    price: 189,
    rating: 4.9,
    reviews: 48,
    description: "Swiss-inspired watch",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30"]
  },
  {
    name: "Sneakers",
    category: "Footwear",
    price: 145,
    rating: 4.7,
    reviews: 120,
    description: "Lightweight shoes",
    images: ["https://images.unsplash.com/photo-1491553895911-0055eca6402d"]
  }
]);

console.log("Seeded");
process.exit();