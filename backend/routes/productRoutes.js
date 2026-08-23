const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Create a product
router.post('/', protect, admin, async (req, res) => {
  try {
    const { name, category, price, originalPrice, adminId, image, images } = req.body;
    
    if (!name || !category || !price || !image) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const product = new Product({
      name,
      category,
      price,
      originalPrice,
      adminId,
      image,
      images
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Update a product
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { name, category, price, originalPrice, adminId, image, images } = req.body;
    
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name || product.name;
    product.category = category || product.category;
    product.price = price || product.price;
    if (originalPrice !== undefined) product.originalPrice = originalPrice;
    if (adminId !== undefined) product.adminId = adminId;
    if (image !== undefined) product.image = image;
    if (images !== undefined) product.images = images;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Delete a product
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Seed some initial products for convenience
router.post('/seed', async (req, res) => {
  try {
    const defaultProducts = [
      {
        name: "Classic Aviator",
        category: "Sunglasses",
        price: "$129",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Minimalist Clear",
        category: "Spectacles",
        price: "$95",
        image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Retro Tortoise",
        category: "Spectacles",
        price: "$110",
        image: "https://images.unsplash.com/photo-1572631382901-ce11f4410651?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Modern Geo",
        category: "Sunglasses",
        price: "$145",
        image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=600&q=80"
      }
    ];
    
    // Clear existing to avoid duplicates if seeded multiple times
    await Product.deleteMany({});
    
    const createdProducts = await Product.insertMany(defaultProducts);
    res.status(201).json({ message: 'Products seeded successfully', products: createdProducts });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
