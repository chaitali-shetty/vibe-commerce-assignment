const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

async function reseed() {
  await Product.deleteMany({});
  await Product.insertMany([
    {
      title: 'WH-1000XM5 Wireless Headphones',
      brand: 'Sony',
      price: 29990,
      image: 'https://images.unsplash.com/photo-1518441902114-7366f1c1d7c7?q=80&w=1200&auto=format&fit=crop',
      description: 'Industry-leading noise cancellation, 30h battery',
      category: 'Audio'
    },
    {
      title: 'MX Master 3S Mouse',
      brand: 'Logitech',
      price: 9995,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=1200&auto=format&fit=crop',
      description: 'Ergonomic, fast scroll, 8K sensor',
      category: 'Peripherals'
    },
    {
      title: 'K2 Mechanical Keyboard',
      brand: 'Keychron',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
      description: 'Hot-swappable, Gateron switches, RGB',
      category: 'Peripherals'
    },
    {
      title: 'Portable SSD 1TB',
      brand: 'Samsung',
      price: 8799,
      image: 'https://images.unsplash.com/photo-1601935111741-a3c9d3d8cda3?q=80&w=1200&auto=format&fit=crop',
      description: 'USB 3.2 Gen2, 1,050MB/s',
      category: 'Storage'
    },
    {
      title: 'TUF Gaming A15 Headset',
      brand: 'ASUS',
      price: 4499,
      image: 'https://images.unsplash.com/photo-1519139270028-ab664cf42264?q=80&w=1200&auto=format&fit=crop',
      description: '7.1 virtual surround, lightweight',
      category: 'Audio'
    },
    {
      title: 'Series 9 Smartwatch',
      brand: 'Apple',
      price: 41900,
      image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1200&auto=format&fit=crop',
      description: 'Always-on display, GPS',
      category: 'Wearables'
    },
    {
      title: 'USB-C 6-in-1 Hub',
      brand: 'Anker',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1589308078055-1980967c2d0a?q=80&w=1200&auto=format&fit=crop',
      description: 'HDMI, PD 100W, SD/TF',
      category: 'Accessories'
    },
    {
      title: 'LED Light Strip 5m',
      brand: 'Philips',
      price: 1599,
      image: 'https://images.unsplash.com/photo-1604176354204-9268737828a3?q=80&w=1200&auto=format&fit=crop',
      description: 'Music sync, app control',
      category: 'Smart Home'
    }
  ]);
}

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) await reseed();
    const products = await Product.find().lean();
    res.json({ success: true, products });
  } catch (err) { next(err); }
});

module.exports = router;
