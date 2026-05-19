// Simple cart model used as a single demo cart container.
// Each item stores a reference to a Product and a quantity.

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