const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// GET cart
router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: 'mock-user-001' }).populate('items.product');
    res.json({ success: true, cart: cart || { items: [], total: 0 } });
  } catch (e) { next(e); }
});

// ADD to cart
router.post('/', async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body || {};
    if (!productId || !mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ success: false, message: 'Invalid productId' });
    }
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    let cart = await Cart.findOne({ userId: 'mock-user-001' });
    if (!cart) cart = new Cart({ userId: 'mock-user-001', items: [] });

    const idx = cart.items.findIndex(i => i.product?.toString() === productId);
    if (idx > -1) cart.items[idx].quantity += quantity;
    else cart.items.push({ product: productId, quantity });

    await cart.save();
    cart = await cart.populate('items.product');

    res.json({ success: true, cart });
  } catch (e) { next(e); }
});

// REMOVE from cart (by productId)
router.delete('/:id', async (req, res, next) => {
  try {
    const productId = req.params.id;
    let cart = await Cart.findOne({ userId: 'mock-user-001' });
    if (!cart) return res.json({ success: true, cart: { items: [], total: 0 } });
    cart.items = cart.items.filter(i => i.product.toString() !== productId);
    await cart.save();
    cart = await cart.populate('items.product');
    res.json({ success: true, cart });
  } catch (e) { next(e); }
});

module.exports = router;
