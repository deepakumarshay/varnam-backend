
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Multer - save uploads to public/assets (demo)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'public', 'assets')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Create product
router.post('/product', upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    let image = req.body.image || '';
    if (req.file) image = '/assets/' + req.file.filename;
    const product = new Product({ title, description, price, category, image });
    await product.save();
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product
router.put('/product/:id', upload.single('image'), async (req, res) => {
  try {
    const updates = req.body;
    if (req.file) updates.image = '/assets/' + req.file.filename;
    const updated = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json({ success: true, updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete product
router.delete('/product/:id', async (req, res) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, removed: p });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
