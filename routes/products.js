
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products (with optional search ?q=)
router.get('/', async (req, res) => {
  try {
    const q = req.query.q ? { title: { $regex: req.query.q, $options: 'i' } } : {};
    const products = await Product.find(q).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Product not found' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
