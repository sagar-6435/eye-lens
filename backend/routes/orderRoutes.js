const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all orders
router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { products, totalAmount, customerEmail } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      products,
      totalAmount,
      customerEmail
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
