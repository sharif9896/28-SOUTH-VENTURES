import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { inr } from '../data/products.js';

const initial = { name: '', phone: '', email: '', pin: '', address: '', city: '', state: '' };

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Enter your full name';
  if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = 'Enter a valid 10-digit mobile number';
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email';
  if (!/^\d{6}$/.test(f.pin)) e.pin = 'Enter a 6-digit pincode';
  if (f.address.trim().length < 6) e.address = 'Enter your full address';
  if (!f.city.trim()) e.city = 'Enter your city';
  if (!f.state.trim()) e.state = 'Enter your state';
  return e;
}

const Steps = ({ at }) => (
  <ol className="steps">
    {['Bag', 'Address & Payment', 'Confirmation'].map((s, i) => (
      <li key={s} className={i < at ? 'done' : i === at ? 'now' : ''}><span>{i < at ? '✓' : i + 1}</span>{s}</li>
    ))}
  </ol>
);

export default function Checkout() {
  const { lines, subtotal, couponOff, shipping, total, coupon, clearCart, user, openAuth, updateUser, addOrder } = useStore();
  const saved = user?.addresses?.[0];
  const [f, setF] = useState(initial);
  const [errors, setErrors] = useState({});
  const [pay, setPay] = useState('cod');
  const [saveAddr, setSaveAddr] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (user && !f.name) setF((x) => ({ ...x, name: user.name || '', phone: user.phone || '', email: user.email || '', ...(saved || {}) }));
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const place = (e) => {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const o = {
      id: 'S28' + Date.now().toString().slice(-8),
      placedAt: Date.now(),
      items: lines.map((l) => ({ id: l.product.id, name: l.product.name, brand: l.product.brand, price: l.product.price, qty: l.qty })),
      subtotal, couponOff, coupon, shipping, total, pay, address: f,
    };
    addOrder(o);
    if (user && saveAddr) {
      const exists = user.addresses?.some((a) => a.address === f.address && a.pin === f.pin);
      if (!exists) updateUser({ addresses: [{ ...f, id: Date.now() }, ...(user.addresses || [])].slice(0, 5), email: user.email || f.email });
    }
    setOrder(o);
    clearCart();
  };

  if (order) {
    return (
      <div className="container">
        <Steps at={3} />
        <div className="success">
          <div className="tick"><svg viewBox="0 0 52 52"><path d="M14 27l8 8 16-17" /></svg></div>
          <h2>Order placed successfully!</h2>
          <p>Order ID: <b>{order.id}</b></p>
          <p>Amount: <b>{inr(order.total)}</b> · {order.pay === 'cod' ? 'Pay on delivery' : 'Paid (demo)'}</p>
          <p className="muted">A confirmation would be sent to {order.address.email} in a live store. This demo sends no real email.</p>
          <div className="success-actions">
            <Link to={`/track-order?id=${order.id}`} className="btn shine">Track order</Link>
            <Link to="/" className="btn outline">Continue shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!lines.length) {
    return (
      <div className="container empty">
        <div className="big float">🛍</div><h3>Your bag is empty</h3>
        <Link to="/" className="btn shine">Start shopping</Link>
      </div>
    );
  }

  // Plain render helper (not a component) so inputs keep focus while typing.
  const field = (k, label, full, rest = {}) => (
    <div className={`field ${full ? 'full' : ''}`} key={k}>
      <label>{label}</label>
      <input value={f[k]} onChange={set(k)} {...rest} />
      {errors[k] && <div className="err">{errors[k]}</div>}
    </div>
  );

  return (
    <div className="container">
      <h1 className="page-title">Checkout</h1>
      <Steps at={1} />
      <form className="two-col" onSubmit={place} noValidate>
        <div>
          {!user && (
            <div className="signin-nudge">
              Have an account? <button type="button" className="link-btn" onClick={() => openAuth('/checkout')}>Sign in</button> for faster checkout, or continue as guest.
            </div>
          )}
          <div className="box box-pad" style={{ marginBottom: 20 }}>
            <h3 className="box-title">Delivery address</h3>
            <div className="form-grid">
              {field('name', 'Full name')}
              {field('phone', 'Mobile number', false, { inputMode: 'numeric', maxLength: 10 })}
              {field('email', 'Email', true, { type: 'email' })}
              {field('address', 'Address (house no, street, area)', true)}
              {field('pin', 'Pincode', false, { inputMode: 'numeric', maxLength: 6 })}
              {field('city', 'City')}
              {field('state', 'State', true)}
            </div>
            {user && <label className="check"><input type="checkbox" checked={saveAddr} onChange={(e) => setSaveAddr(e.target.checked)} /> Save this address to my account</label>}
          </div>
          <div className="box box-pad">
            <h3 className="box-title">Payment method</h3>
            {[['cod', 'Cash on Delivery'], ['upi', 'UPI (demo)'], ['card', 'Credit / Debit Card (demo)'], ['nb', 'Net Banking (demo)']].map(([v, l]) => (
              <label key={v} className={`pay-opt ${pay === v ? 'on' : ''}`}>
                <input type="radio" name="pay" checked={pay === v} onChange={() => setPay(v)} />{l}
              </label>
            ))}
            <p className="muted">This is a demo store. No real payment is processed.</p>
          </div>
        </div>

        <aside className="box box-pad summary sticky">
          <h3>Order Summary</h3>
          {lines.map(({ product: p, qty }) => (
            <div className="sum-row" key={p.id}><span>{p.name} × {qty}</span><span>{inr(p.price * qty)}</span></div>
          ))}
          <div className="sum-row top"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
          {couponOff > 0 && <div className="sum-row green"><span>Coupon {coupon}</span><span>− {inr(couponOff)}</span></div>}
          <div className="sum-row"><span>Shipping</span><span className={shipping ? '' : 'green'}>{shipping ? inr(shipping) : 'FREE'}</span></div>
          <div className="sum-row total"><span>Total</span><span>{inr(total)}</span></div>
          <button type="submit" className="btn block shine" style={{ marginTop: 16 }}>Place Order</button>
        </aside>
      </form>
    </div>
  );
}
