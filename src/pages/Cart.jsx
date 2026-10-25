import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { inr, categories, products } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import Img from '../components/Img.jsx';

export default function Cart() {
  const { lines, setQty, removeFromCart, toggleWish, mrpTotal, subtotal, couponOff, shipping, total, coupon, setCoupon, applyCoupon } = useStore();
  const [code, setCode] = useState('');

  if (!lines.length) {
    return (
      <div className="container empty">
        <div className="big float">🛍</div><h3>Your bag is empty</h3>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/" className="btn shine">Start shopping</Link>
      </div>
    );
  }

  const toFree = Math.max(0, 499 - (subtotal - couponOff));
  const pct = Math.min(100, ((subtotal - couponOff) / 499) * 100);
  const inBag = new Set(lines.map((l) => l.product.id));
  const upsell = products.filter((p) => !inBag.has(p.id) && p.badge === 'Bestseller').slice(0, 4);

  return (
    <div className="container">
      <h1 className="page-title">My Bag <small>({lines.length} {lines.length === 1 ? 'item' : 'items'})</small></h1>

      <div className="ship-bar">
        <div className="ship-text">{toFree > 0 ? <>Add <b>{inr(toFree)}</b> more to get <b>FREE shipping</b></> : <>🎉 You have unlocked <b>FREE shipping</b></>}</div>
        <div className="ship-track"><span style={{ width: `${pct}%` }} /></div>
      </div>

      <div className="two-col">
        <div className="box">
          {lines.map(({ product: p, qty }) => (
            <div className="cart-line" key={p.id}>
              <Link to={`/product/${p.id}`}><Img src={p.image} alt={p.name} emoji={categories.find((c) => c.slug === p.category)?.emoji} /></Link>
              <div>
                <div className="card-brand">{p.brand}</div>
                <Link to={`/product/${p.id}`}><h4>{p.name}</h4></Link>
                <div className="card-size">{p.size}</div>
                <div className="price-row" style={{ margin: '6px 0' }}>
                  <span className="price">{inr(p.price)}</span><span className="mrp">{inr(p.mrp)}</span>
                </div>
                <div className="line-actions">
                  <div className="qty">
                    <button onClick={() => setQty(p.id, qty - 1)}>−</button>
                    <span>{qty}</span>
                    <button onClick={() => setQty(p.id, qty + 1)}>+</button>
                  </div>
                  <button className="link-btn" onClick={() => removeFromCart(p.id)}>Remove</button>
                  <button className="link-btn" onClick={() => { toggleWish(p.id); removeFromCart(p.id); }}>Move to wishlist</button>
                </div>
              </div>
              <div className="cart-right"><b>{inr(p.price * qty)}</b></div>
            </div>
          ))}
        </div>

        <aside className="box box-pad summary sticky">
          <h3>Price Details</h3>
          {coupon ? (
            <div className="sum-row green"><span>Coupon <b>{coupon}</b> applied</span><button className="link-btn" onClick={() => setCoupon(null)}>Remove</button></div>
          ) : (
            <form className="coupon" onSubmit={(e) => { e.preventDefault(); if (applyCoupon(code)) setCode(''); }}>
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon code (try SOUTH10)" />
              <button type="submit">Apply</button>
            </form>
          )}
          <div className="sum-row"><span>Bag MRP</span><span>{inr(mrpTotal)}</span></div>
          <div className="sum-row green"><span>Product discount</span><span>− {inr(mrpTotal - subtotal)}</span></div>
          {couponOff > 0 && <div className="sum-row green"><span>Coupon discount</span><span>− {inr(couponOff)}</span></div>}
          <div className="sum-row"><span>Shipping</span><span className={shipping ? '' : 'green'}>{shipping ? inr(shipping) : 'FREE'}</span></div>
          <div className="sum-row total"><span>Amount payable</span><span>{inr(total)}</span></div>
          <p className="save-note">🎉 You save {inr(mrpTotal - subtotal + couponOff)} on this order</p>
          <Link to="/checkout" className="btn block shine">Proceed to Checkout</Link>
        </aside>
      </div>

      {upsell.length > 0 && (
        <section className="section">
          <div className="section-head"><h2>Add a little extra</h2></div>
          <div className="grid">{upsell.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        </section>
      )}
    </div>
  );
}
