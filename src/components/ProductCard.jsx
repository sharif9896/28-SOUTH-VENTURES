import { useState } from 'react';
import { Link } from 'react-router-dom';
import { discount, inr, categories } from '../data/products.js';
import { useStore } from '../context/StoreContext.jsx';
import Img from './Img.jsx';

export default function ProductCard({ p }) {
  const { addToCart, wishlist, toggleWish, openQuick } = useStore();
  const [added, setAdded] = useState(false);
  const wished = wishlist.includes(p.id);
  const emoji = categories.find((c) => c.slug === p.category)?.emoji;

  const add = () => {
    addToCart(p.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="card">
      <div className="card-img">
        {p.badge && <span className={`tag tag-${p.badge.toLowerCase().replace(/\s+/g, '-')}`}>{p.badge}</span>}
        <button className={`wish ${wished ? 'on' : ''}`} onClick={() => toggleWish(p.id)} aria-label="Toggle wishlist">
          {wished ? '♥' : '♡'}
        </button>
        <Link to={`/product/${p.id}`} aria-label={p.name}><Img src={p.image} alt={p.name} emoji={emoji} /></Link>
        <button className="quick" onClick={() => openQuick(p.id)}>Quick View</button>
      </div>
      <div className="card-body">
        <div className="card-brand">{p.brand}</div>
        <Link to={`/product/${p.id}`} className="card-name">{p.name}</Link>
        <div className="card-size">{p.size}</div>
        <div className="rating"><b>{p.rating} ★</b><span>({p.reviews.toLocaleString('en-IN')})</span></div>
        <div className="price-row">
          <span className="price">{inr(p.price)}</span>
          <span className="mrp">{inr(p.mrp)}</span>
          <span className="off">{discount(p)}% off</span>
        </div>
        <button className={`add-btn ${added ? 'done' : ''}`} onClick={add}>{added ? '✓ Added' : 'Add to Bag'}</button>
      </div>
    </article>
  );
}
