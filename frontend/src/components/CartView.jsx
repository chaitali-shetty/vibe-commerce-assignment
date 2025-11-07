export default function CartView({ cart, onRemove, onCheckout }) {
  const items = cart?.items || [];
  const total = cart?.total || 0;

  return (
    <div className="cart">
      <h3>Your Cart</h3>

      {items.length === 0 && <div className="muted">Cart is empty</div>}

      <div className="list">
        {items.map((i) => {
          const p = i.product || {};
          const thumb = p.image || '';
          const title = p.title || 'Untitled';
          const brand = p.brand ? ` · ${p.brand}` : '';
          const qty = i.quantity || 0;
          const unit = p.price || 0;
          const sub = unit * qty;

          return (
            <div key={p._id} className="item" role="listitem">
              <img className="thumb" src={thumb} alt={title} loading="lazy" />
              <div className="info">
                <div className="name" title={title}>{title}<span className="brand">{brand}</span></div>
                <div className="meta">
                  <span className="unit">₹{unit}</span>
                  <span className="dot">•</span>
                  <span className="qty">Qty: {qty}</span>
                </div>
              </div>
              <div className="right">
                <div className="sub">₹{sub}</div>
                <button className="link" onClick={() => onRemove(p._id)} aria-label={`Remove ${title} from cart`}>
                  remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="total">
        <span>Total</span>
        <b>₹{total}</b>
      </div>

      <button disabled={items.length === 0} onClick={onCheckout} aria-label="Proceed to checkout">
        Checkout
      </button>

      <style>{`
        .cart {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        h3 { margin: 0 0 4px 0; color: var(--fg-strong); }
        .muted { color: var(--fg-muted); }
        .list { display: flex; flex-direction: column; gap: 12px; }
        .item {
          display: grid;
          grid-template-columns: 56px 1fr auto;
          gap: 12px;
          align-items: center;
        }
        .thumb {
          width: 56px; height: 56px; object-fit: cover; border-radius: 8px;
          background: var(--muted); border: 1px solid var(--border);
        }
        .info { display: flex; flex-direction: column; gap: 2px; }
        .name { font-weight: 600; color: var(--fg-strong); line-height: 1.25; }
        .brand { color: var(--fg-muted); font-weight: 500; }
        .meta { color: var(--fg-muted); font-size: 12px; display: flex; align-items: center; gap: 6px; }
        .dot { opacity: .65; }
        .right { display: flex; flex-direction: column; align-items: end; gap: 6px; }
        .sub { font-weight: 700; color: var(--fg-strong); }
        .link { background: transparent; color: #c23; border: none; cursor: pointer; padding: 4px 6px; border-radius: 6px; }
        .link:hover { text-decoration: underline; }
        .total { display: flex; justify-content: space-between; align-items: center; padding-top: 6px; border-top: 1px solid var(--border); }
        button {
          padding: 10px 12px; border: none; border-radius: 10px;
          background: var(--btn); color: var(--btn-fg); cursor: pointer;
        }
        button[disabled] { opacity: 0.55; cursor: not-allowed; }
      `}</style>
    </div>
  );
}
