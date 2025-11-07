export default function CategoryShowcase({ products, onAdd }) {
  // Map visible cards -> which product.category to show inside
  const cards = [
    {
      key: 'college',
      title: 'College Fests',
      blurb: 'Bulk merch that makes your fest unforgettable.',
      icon: '🎪',
      // show products where category === 'Accessories'
      match: (p) => p.category === 'Accessories',
    },
    {
      key: 'section',
      title: 'Section Merch',
      blurb: 'Build unity, wear your batch pride.',
      icon: '🎓',
      match: (p) => p.category === 'Peripherals',
    },
    {
      key: 'sports',
      title: 'Sports Teams',
      blurb: 'One jersey, one spirit—on & off the field.',
      icon: '⚽',
      match: (p) => p.category === 'Audio',
    },
    {
      key: 'club',
      title: 'Club Identity',
      blurb: 'Your vibe, your brand, your nexora.',
      icon: '🚀',
      match: (p) => p.category === 'Smart Home',
    },
    {
      key: 'events',
      title: 'Events & Giveaways',
      blurb: 'Gifts that carry your brand everywhere.',
      icon: '🎁',
      match: (p) => p.category === 'Accessories',
    },
    {
      key: 'alumni',
      title: 'Corporate & Alumni',
      blurb: 'Professional yet personal—for teams & memories.',
      icon: '📘',
      match: (p) => p.category === 'Wearables' || p.category === 'Storage',
    },
  ];

  const byCard = (card) =>
    products.filter(card.match).slice(0, 3); // top 3 per card

  return (
    <section className="pf">
      <h2>Perfect for…</h2>
      <p className="sub">Made for every moment that matters</p>

      <div className="pf-grid">
        {cards.map((c) => (
          <article key={c.key} className="pf-card">
            <div className="pf-top">
              <div className="pf-icon" aria-hidden="true">{c.icon}</div>
              <div>
                <h3 className="pf-title">{c.title}</h3>
                <p className="pf-blurb">{c.blurb}</p>
              </div>
            </div>

            {/* related products */}
            <div className="pf-rel">
              {byCard(c).map((p) => (
                <div key={p._id} className="pf-item">
                  <img className="pf-thumb" src={p.image} alt={p.title} loading="lazy" />
                  <div className="pf-info">
                    <div className="pf-name" title={p.title}>
                      {p.title}
                    </div>
                    <div className="pf-meta">
                      {p.brand ? <span className="pf-brand">{p.brand}</span> : null}
                      <span className="pf-dot">•</span>
                      <span className="pf-price">₹{p.price}</span>
                    </div>
                  </div>
                  <button className="pf-add" onClick={() => onAdd(p._id)} aria-label={`Add ${p.title}`}>
                    +
                  </button>
                </div>
              ))}

              {byCard(c).length === 0 && (
                <div className="pf-empty">We’ll add items here soon.</div>
              )}
            </div>

            <button className="pf-cta" type="button">Get a Quote →</button>
          </article>
        ))}
      </div>

      <style>{`
        .pf { display: grid; gap: 10px; margin-top: 26px; }
        .pf h2 { margin: 0; }
        .pf .sub { margin: 0 0 6px 0; color: var(--fg-muted); }
        .pf-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        @media (max-width: 1100px) {
          .pf-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 680px) {
          .pf-grid { grid-template-columns: 1fr; }
        }
        .pf-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 16px;
          box-shadow: var(--shadow-1);
          display: grid;
          gap: 12px;
        }
        .pf-top { display: grid; grid-template-columns: auto 1fr; gap: 12px; align-items: center; }
        .pf-icon {
          width: 42px; height: 42px; display: grid; place-items: center;
          font-size: 20px; background: var(--muted); border-radius: 12px;
          border: 1px solid var(--border);
        }
        .pf-title { margin: 0; font-size: 18px; color: var(--fg-strong); }
        .pf-blurb { margin: 2px 0 0 0; color: var(--fg-muted); font-size: 14px; }

        .pf-rel { display: grid; gap: 10px; }
        .pf-item {
          display: grid;
          grid-template-columns: 48px 1fr auto;
          gap: 10px; align-items: center;
          border: 1px solid var(--border);
          border-radius: 12px; padding: 8px;
          background: var(--bg);
        }
        .pf-thumb {
          width: 48px; height: 48px; object-fit: cover; border-radius: 8px;
          background: var(--muted); border: 1px solid var(--border);
        }
        .pf-info { display: grid; gap: 2px; }
        .pf-name { font-weight: 600; color: var(--fg-strong); line-height: 1.2; }
        .pf-meta { font-size: 12px; color: var(--fg-muted); display: flex; gap: 6px; align-items: center; }
        .pf-dot { opacity: .65; }
        .pf-add {
          width: 32px; height: 32px; border: none; border-radius: 8px;
          background: var(--btn); color: var(--btn-fg); cursor: pointer;
          display: grid; place-items: center; font-size: 18px; line-height: 0;
        }
        .pf-empty { color: var(--fg-muted); font-size: 13px; padding: 8px; text-align: center; }
        .pf-cta {
          margin-top: 4px;
          background: transparent; color: var(--fg-strong);
          border: 1px solid var(--border);
          border-radius: 10px; padding: 10px 12px; cursor: pointer;
          text-align: left;
        }
        .pf-cta:hover { background: var(--muted); }
      `}</style>
    </section>
  );
}
