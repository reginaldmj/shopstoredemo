import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      qty: Number
    }
  ]
});

export default mongoose.model('Cart', cartSchema);