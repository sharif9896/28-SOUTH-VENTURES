import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { categories, discount, getProduct, inr, products } from '../data/products.js';
import { reviewsFor } from '../data/content.js';
import { useStore } from '../context/StoreContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Reveal from '../components/Reveal.jsx';
import Img from '../components/Img.jsx';

const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

export default function ProductDetail() {
  const { id } = useParams();
  const p = getProduct(id);
  const { addToCart, wishlist, toggleWish, pushRecent, recent } = useStore();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const [tab, setTab] = useState('desc');
  const [zoom, setZoom] = useState({ on: false, x: 50, y: 50 });
  const [pin, setPin] = useState('');
  const [delivery, setDelivery] = useState('');
  const [pinErr, setPinErr] = useState('');

  useEffect(() => {
    setQty(1); setImg(0); setTab('desc'); setDelivery(''); setPin(''); setPinErr('');
    if (p) pushRecent(p.id);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!p) {
    return (
      <div className="container empty">
        <div className="big">😕</div><h3>Product not found</h3>
        <Link className="btn" to="/">Back to home</Link>
      </div>
    );
  }

  const cat = categories.find((c) => c.slug === p.category);
  const related = products.filter((x) => x.sub === p.sub && x.id !== p.id).concat(products.filter((x) => x.category === p.category && x.sub !== p.sub)).slice(0, 4);
  const viewed = recent.filter((r) => r !== p.id).map((r) => products.find((x) => x.id === r)).filter(Boolean).slice(0, 4);
  const wished = wishlist.includes(p.id);
  const reviews = reviewsFor(p);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ on: true, x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };
  const checkPin = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pin)) { setPinErr('Enter a valid 6-digit pincode'); setDelivery(''); return; }
    setPinErr('');
    const d = new Date(); d.setDate(d.getDate() + 4);
    setDelivery(d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }));
  };

  return (
    <div className="container">
      <div className="crumbs">
        <Link to="/">Home</Link> / <Link to={`/category/${cat.slug}`}>{cat.name}</Link> / <Link to={`/category/${cat.slug}?sub=${encodeURIComponent(p.sub)}`}>{p.sub}</Link>
      </div>

      <div className="pd">
        <div className="pd-gallery">
          <div className="thumbs">
            {p.images.map((src, i) => (
              <button key={i} className={i === img ? 'on' : ''} onClick={() => setImg(i)} aria-label={`Image ${i + 1}`}>
                <Img src={src} alt="" emoji={cat.emoji} />
              </button>
            ))}
          </div>
          <div
            className="pd-img"
            onMouseMove={onMove}
            onMouseLeave={() => setZoom({ on: false, x: 50, y: 50 })}
            style={{ '--zx': `${zoom.x}%`, '--zy': `${zoom.y}%` }}
          >
            <div className={`zoom ${zoom.on ? 'on' : ''}`}><Img key={img} src={p.images[img]} alt={p.name} emoji={cat.emoji} eager /></div>
            {p.badge && <span className={`tag tag-${p.badge.toLowerCase().replace(/\s+/g, '-')}`}>{p.badge}</span>}
          </div>
        </div>

        <div className="pd-info">
          <Link to={`/brand/${encodeURIComponent(p.brand)}`} className="card-brand link">{p.brand}</Link>
          <h1>{p.name}</h1>
          <div className="card-size">{p.size}</div>
          <div className="rating"><b>{p.rating} ★</b><span>{p.reviews.toLocaleString('en-IN')} ratings</span></div>
          <div className="price-row" style={{ marginTop: 16 }}>
            <span className="price big">{inr(p.price)}</span>
            <span className="mrp">MRP {inr(p.mrp)}</span>
            <span className="off">{discount(p)}% off</span>
          </div>
          <div className="pd-tax">Inclusive of all taxes</div>

          <div className="qty-row">
            <b>Qty</b>
            <div className="qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(Math.min(10, qty + 1))}>+</button>
            </div>
          </div>

          <div className="pd-actions">
            <button className="btn outline" onClick={() => addToCart(p.id, qty)}>Add to Bag</button>
            <button className="btn shine" onClick={() => { addToCart(p.id, qty); navigate('/cart'); }}>Buy Now</button>
            <button className={`wish static ${wished ? 'on' : ''}`} onClick={() => toggleWish(p.id)} aria-label="Toggle wishlist">{wished ? '♥' : '♡'}</button>
          </div>

          <form className="pin-check" onSubmit={checkPin}>
            <label>Check delivery</label>
            <div>
              <input value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} maxLength={6} inputMode="numeric" placeholder="Enter pincode" />
              <button type="submit">Check</button>
            </div>
            {pinErr && <div className="err">{pinErr}</div>}
            {delivery && <div className="ok">🚚 Delivery by <b>{delivery}</b>{p.price >= 499 ? ' · Free shipping' : ''}</div>}
          </form>

          <div className="pd-perks">
            <div>🎁 Use code <b>SOUTH10</b> for 10% off at checkout</div>
            <div>🚚 Free delivery on orders above ₹499</div>
            <div>↩️ 15-day easy returns · ✅ 100% authentic</div>
          </div>
        </div>
      </div>

      <section className="pd-tabs">
        <div className="tab-head">
          {[['desc', 'Description'], ['how', 'How to use'], ['ing', 'Ingredients'], ['rev', `Reviews (${reviews.length})`]].map(([k, l]) => (
            <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>
          ))}
        </div>
        <div className="tab-body" key={tab}>
          {tab === 'desc' && <><p>{p.desc}</p><p className="muted">Category: {cat.name} › {p.sub} · Brand: {p.brand} · Size: {p.size}<br />Marketed by 28 SOUTH VENTURES LLP.</p></>}
          {tab === 'how' && <p>{p.how}</p>}
          {tab === 'ing' && <p>{p.ingredients}</p>}
          {tab === 'rev' && (
            <div className="reviews">
              <div className="rev-sum">
                <div className="rev-score">{p.rating}<small>/ 5</small></div>
                <div className="stars">{stars(Math.round(p.rating))}</div>
                <small>{p.reviews.toLocaleString('en-IN')} ratings</small>
              </div>
              <div className="rev-list">
                {reviews.map((r, i) => (
                  <div className="rev" key={i}>
                    <div className="stars">{stars(r.rating)} <b>{r.title}</b></div>
                    <p>{r.text}</p>
                    <small>{r.name} · {r.date}</small>
                  </div>
                ))}
                <small className="muted">Sample reviews shown for demonstration.</small>
              </div>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <Reveal className="section-head"><h2>You May Also Like</h2></Reveal>
          <div className="grid">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
        </section>
      )}
      {viewed.length > 0 && (
        <section className="section">
          <Reveal className="section-head"><h2>Recently Viewed</h2></Reveal>
          <div className="grid">{viewed.map((r) => <ProductCard key={r.id} p={r} />)}</div>
        </section>
      )}
    </div>
  );
}
