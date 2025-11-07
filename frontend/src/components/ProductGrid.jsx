export default function ProductGrid({ products, onAdd }) {
  return (
    <div className="grid">
      {products.map(p => (
        <article key={p._id} className="card">
          <div className="thumb">
            <img src={p.image} alt={p.title} loading="lazy" />
            <span className="brand">{p.brand}</span>
          </div>
          <div className="content">
            <h4 className="title" title={p.title}>{p.title}</h4>
            <p className="desc">{p.description}</p>
            <div className="meta">
              <div className="price">₹{p.price.toLocaleString('en-IN')}</div>
              <button onClick={() => onAdd(p._id)} aria-label={`Add ${p.title} to cart`}>Add to Cart</button>
            </div>
          </div>
        </article>
      ))}
      <style>{`
        .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:18px; }
        .card { background: var(--card); border-radius:16px; overflow:hidden; box-shadow: var(--shadow-1); border:1px solid var(--border);
          transition: transform .2s ease, box-shadow .2s ease; display:flex; flex-direction:column; }
        .card:hover { transform: translateY(-3px); box-shadow: var(--shadow-2); }
        .thumb { position:relative; aspect-ratio:16/11; background:var(--muted); }
        .thumb img { width:100%; height:100%; object-fit:cover; display:block; }
        .brand { position:absolute; top:12px; left:12px; background: var(--badge-bg); color: var(--badge-fg);
          font-size:12px; padding:6px 10px; border-radius:999px; letter-spacing:.3px; }
        .content { padding:14px; display:flex; flex-direction:column; gap:8px; }
        .title { margin:0; font-size:15px; line-height:1.3; color: var(--fg-strong); }
        .desc { margin:0; color: var(--fg-muted); font-size:13px; min-height:34px; }
        .meta { display:flex; align-items:center; justify-content:space-between; margin-top:8px; }
        .price { font-weight:700; color: var(--fg-strong); }
        button { padding:10px 12px; border:none; border-radius:10px; background: var(--btn); color: var(--btn-fg); cursor:pointer; }
        button:hover { filter:brightness(1.08); }
      `}</style>
    </div>
  );
}
