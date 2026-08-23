const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

// Seed admin
router.post('/seed-admin', async (req, res) => {
  try {
    const adminEmail = 'admin@eyelens.com';
    const adminPassword = 'admin@123';

    // Check if admin already exists
    const adminExists = await User.findOne({ email: adminEmail });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin user already exists' });
    }

    const admin = new User({
      email: adminEmail,
      password: adminPassword,
      role: 'admin'
    });

    await admin.save();
    res.status(201).json({ message: 'Admin user seeded successfully', email: admin.email, role: admin.role });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
