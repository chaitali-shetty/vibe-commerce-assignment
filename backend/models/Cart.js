const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
});

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, default: 'mock-user-001' },
    items: [cartItemSchema],
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Recompute total when items change
cartSchema.pre('save', async function (next) {
  if (!this.isModified('items')) return next();
  if (this.items.length) {
    await this.populate('items.product');
    this.total = this.items.reduce((sum, i) => sum + (i.product?.price || 0) * i.quantity, 0);
  } else {
    this.total = 0;
  }
  next();
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
module.exports = Cart;
