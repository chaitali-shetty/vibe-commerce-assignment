require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

(async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vibe-commerce1';
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // wipe and reinsert
    await Product.deleteMany({});

    await Product.insertMany([
      {
        title: 'WH-1000XM5 Wireless Headphones',
        brand: 'Sony',
        price: 29990,
        image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTyFm71laD-cd0hBBRL_u3QSj_uDIa3QhHTm8Qyu1cJX71t9AfNcTilu04FWySnxzJ-UUdjfPata1GtcIDXhe_YNpcD_7syG_IIuARyDMtaa6MN9WR_N8l-6A',
        description: 'Industry-leading noise cancellation, 30h battery',
        category: 'Audio'
      },
      {
        title: 'MX Master 3S Mouse',
        brand: 'Logitech',
        price: 9995,
        image: 'https://m.media-amazon.com/images/I/61ni3t1ryQL._SX679_.jpg',
        description: 'Ergonomic, fast scroll, 8K sensor',
        category: 'Peripherals'
      },
      {
        title: 'K2 Mechanical Keyboard',
        brand: 'Keychron',
        price: 8999,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
        description: 'Hot-swappable Gateron switches, RGB',
        category: 'Peripherals'
      },
      {
        title: 'Portable SSD 1TB',
        brand: 'Samsung',
        price: 8799,
        image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQEugTpCneWs10bnp5aElg9bmJEPQOM283NFH-clWpJfnKT4DB8hUj7RyQQInmBdn6hM-DmtGW7jIcLwUYWrjGy-1XWJIc_TMhTrphD0XHm9CJgR1YemH7Jlg',
        description: 'USB 3.2 Gen2, 1,050MB/s',
        category: 'Storage'
      },
      {
        title: 'TUF Gaming A15 Headset',
        brand: 'ASUS',
        price: 4499,
        image: 'https://www.google.com/imgres?q=TUF%20Gaming%20A15%20Headset%207.1%20virtual%20surround%2C%20lightweight&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F71nJ3nVylYL._AC_UF1000%2C1000_QL80_.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.in%2FHeadset-Certified-Surround-Lightweight-Black-Over%2Fdp%2FB07XS9HX5P&docid=PB3C97uar2_rHM&tbnid=I5YTxuPLEhzAhM&vet=12ahUKEwi-3tTOrOCQAxWrbPUHHUH2Ct8QM3oECCYQAA..i&w=700&h=1000&hcb=2&ved=2ahUKEwi-3tTOrOCQAxWrbPUHHUH2Ct8QM3oECCYQAA',
        description: '7.1 virtual surround, lightweight',
        category: 'Audio'
      },
      {
        title: 'Series 9 Smartwatch',
        brand: 'Apple',
        price: 41900,
        image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTYD-xfFbLBO6lGF4DDtt8XaXNYt7gzfjeEPxNawm71W3gXL67qtghU2oUwCgKWoPbor0YslBasTt_Q_vqUZpOyOpycZ4w6DRBX3s178Zj4BfX9DnU08SCQtw',
        description: 'Always-on display, GPS',
        category: 'Wearables'
      },
      {
        title: 'USB-C 6-in-1 Hub',
        brand: 'Croma',
        price: 3499,
        image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTKn2cQBvJrIGGM6Daye1DFYmWEpFpS1N0JA6asL0UXXBWalrfFNzOjbTEXoHcAp5DyaYjOF7QUvRJ2O8hx8zDQbwNX58tj_WQhHqMNvcJ6SWXZJuWH2rEX',
        description: 'HDMI, PD 100W, SD/TF',
        category: 'Accessories'
      },
      {
        title: 'LED Light Strip 5m',
        brand: 'Philips',
        price: 1599,
        image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRrgli_MLIJP1kMJnzgiBMRlcj2puFaYKWwkpepgGAHqFLHQBu0jVW2Pm8JiXYviZCa0ySlvxC6ArGPu71aaQ85YJiJtZgOwiC_wDVN8Y2G9aFnwltlkjf-9w',
        description: 'Music sync, app control',
        category: 'Smart Home'
      }
    ]);

    const count = await Product.countDocuments();
    console.log(`Seeded ${count} products `);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
