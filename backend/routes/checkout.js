const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.post('/', async (req, res, next) => {
  try {
    const { cartItems = [] } = req.body || {};
    const total = cartItems.reduce((sum, i) => sum + (i?.product?.price || 0) * (i?.quantity || 0), 0);

    const receipt = {
      orderId: 'VC-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
      total,
      timestamp: new Date().toISOString(),
    };

    // clear the cart for mock user
    const cart = await Cart.findOne({ userId: 'mock-user-001' });
    if (cart) {
      cart.items = [];
      await cart.save(); // pre('save') will set total=0
    }

    res.json({ success: true, receipt });
  } catch (e) { next(e); }
});

module.exports = router;
