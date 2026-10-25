import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { categories, discount, getProduct, inr } from '../data/products.js';
import Img from './Img.jsx';

export default function QuickView() {
  const { quick, closeQuick, addToCart } = useStore();
  const [qty, setQty] = useState(1);
  const p = quick ? getProduct(quick) : null;

  useEffect(() => { setQty(1); }, [quick]);
  useEffect(() => {
    if (!quick) return undefined;
    const onKey = (e) => e.key === 'Escape' && closeQuick();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [quick, closeQuick]);

  if (!p) return null;
  const emoji = categories.find((c) => c.slug === p.category)?.emoji;

  return (
    <div className="modal-bg" onClick={closeQuick}>
      <div className="modal qv" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={p.name}>
        <button className="modal-x" onClick={closeQuick} aria-label="Close">✕</button>
        <div className="qv-img"><Img src={p.image} alt={p.name} emoji={emoji} eager /></div>
        <div className="qv-info">
          <div className="card-brand">{p.brand}</div>
          <h3>{p.name}</h3>
          <div className="rating"><b>{p.rating} ★</b><span>{p.reviews.toLocaleString('en-IN')} ratings</span></div>
          <div className="price-row" style={{ margin: '14px 0' }}>
            <span className="price big">{inr(p.price)}</span><span className="mrp">{inr(p.mrp)}</span><span className="off">{discount(p)}% off</span>
          </div>
          <p className="muted">{p.desc}</p>
          <div className="qv-actions">
            <div className="qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button><span>{qty}</span><button onClick={() => setQty(Math.min(10, qty + 1))}>+</button>
            </div>
            <button className="btn shine" onClick={() => { addToCart(p.id, qty); closeQuick(); }}>Add to Bag</button>
          </div>
          <Link to={`/product/${p.id}`} className="link-btn" onClick={closeQuick}>View full details →</Link>
        </div>
      </div>
    </div>
  );
}
