import CategoryShowcase from './components/CategoryShowcase';
import { useEffect, useMemo, useState } from 'react';
import { getProducts, getCart, addToCart, removeFromCart, checkout } from './api';
import ProductGrid from './components/ProductGrid';
import CartView from './components/CartView';
import CheckoutModal from './components/CheckoutModal';
import Toast from './components/Toast';
import Logo from './components/Logo';
import './styles.css';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [toast, setToast] = useState('');
  const [open, setOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [q, setQ] = useState('');
  const [theme, setTheme] = useState('light');

  async function refresh() {
    const p = await getProducts();
    const c = await getCart();
    setProducts(p.products || []);
    setCart(c.cart || { items: [], total: 0 });
  }

  useEffect(() => { refresh(); }, []);

  // theme persistence
  useEffect(() => {
    const saved = localStorage.getItem('vibe-theme');
    if (saved) setTheme(saved);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('vibe-theme', theme);
  }, [theme]);

  function notify(msg) { setToast(msg); setTimeout(() => setToast(''), 1600); }

  const onAdd = async (id) => {
    const r = await addToCart(id, 1);
    if (r.success) { setCart(r.cart); notify('Added to cart'); }
    else notify(r.message || 'Failed to add');
  };

  const onRemove = async (productId) => {
    const r = await removeFromCart(productId);
    if (r.success) { setCart(r.cart); notify('Removed from cart'); }
    else notify(r.message || 'Failed to remove');
  };

  const onCheckout = async ({ name, email }) => {
    const r = await checkout(cart);
    if (r.success) {
      setReceipt({ ...r.receipt, name, email });
      setCart({ items: [], total: 0 }); // frontend reset
      setOpen(false);
      notify('Payment success (mock)');
      // also re-fetch to reflect backend-cleared cart (safety)
      setTimeout(refresh, 400);
    } else {
      notify('Checkout failed');
    }
  };

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return products;
    return products.filter(p =>
      [p.title, p.brand, p.description, p.category]
        .filter(Boolean)
        .some(s => s.toLowerCase().includes(term))
    );
  }, [q, products]);

  return (
    <>
      <div className="container">
        <header className="header">
          <Logo />
          <div className="header-right">
            <div className="search">
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search brand, product, category…"
                aria-label="Search products"
              />
              <span className="kbd">/</span>
            </div>
            <button
              className="mode"
              onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
            <div className="summary">Items: {cart.items?.length || 0} · ₹{cart.total || 0}</div>
          </div>
        </header>

        <div className="layout">
          <div>
            <h2>Products</h2>
            <ProductGrid products={filtered} onAdd={onAdd} />
<CategoryShowcase products={products} onAdd={onAdd} />
          </div>

          <div>
            <CartView
              cart={cart}
              onRemove={onRemove}
              onCheckout={() => setOpen(true)}
            />
            {receipt && (
              <div className="receipt">
                <b>Receipt</b><br />
                Order: {receipt.orderId} <br />
                Name: {receipt.name} <br />
                Email: {receipt.email} <br />
                Total: ₹{receipt.total} <br />
                Time: {new Date(receipt.timestamp).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>

      <CheckoutModal open={open} onClose={() => setOpen(false)} onSubmit={onCheckout} />
      <Toast message={toast} />

      {/* quick keyboard: press "/" to focus search */}
      <script dangerouslySetInnerHTML={{__html:`
        (function(){
          const onKey=(e)=>{ if(e.key==='/'){ e.preventDefault(); const el=document.querySelector('.search input'); if(el) el.focus(); } };
          window.addEventListener('keydown', onKey);
        })();
      `}}/>
    </>
  );
}
