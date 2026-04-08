import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongoose.connect(process.env.MONGO_URI)')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));