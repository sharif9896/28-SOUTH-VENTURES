import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { inr } from '../data/products.js';

const stages = [
  { t: 'Order placed', d: 'We have received your order.' },
  { t: 'Packed', d: 'Your items are packed and ready.' },
  { t: 'Shipped', d: 'Handed over to our courier partner.' },
  { t: 'Out for delivery', d: 'Your order will arrive today.' },
  { t: 'Delivered', d: 'Enjoy your new beauty buys!' },
];

export default function TrackOrder() {
  const { orders } = useStore();
  const [params] = useSearchParams();
  const [id, setId] = useState(params.get('id') || '');
  const [query, setQuery] = useState(params.get('id') || '');
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 3000);
    return () => clearInterval(t);
  }, []);

  const order = query ? orders.find((o) => o.id.toLowerCase() === query.trim().toLowerCase()) : null;
  // Demo progress: advances one stage every 20 seconds so the timeline animation is visible.
  const stage = order ? Math.min(stages.length - 1, Math.floor((now - order.placedAt) / 20000)) : 0;

  return (
    <div className="container narrow">
      <h1 className="page-title">Track Your Order</h1>
      <form className="track-form box box-pad" onSubmit={(e) => { e.preventDefault(); setQuery(id); }}>
        <div className="field">
          <label>Order ID</label>
          <input value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g. S2812345678" />
        </div>
        <button className="btn shine" type="submit">Track</button>
      </form>

      {query && !order && (
        <div className="empty small"><div className="big">📦</div><h3>No order found</h3><p>We could not find an order with ID “{query}” on this device. Check the ID and try again.</p></div>
      )}

      {order && (
        <div className="box box-pad track-card">
          <div className="track-top">
            <div><small>Order ID</small><b>{order.id}</b></div>
            <div><small>Placed on</small><b>{new Date(order.placedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</b></div>
            <div><small>Total</small><b>{inr(order.total)}</b></div>
          </div>
          <ol className="timeline">
            {stages.map((s, i) => (
              <li key={s.t} className={i < stage ? 'done' : i === stage ? 'now' : ''}>
                <span className="dot">{i <= stage ? '✓' : ''}</span>
                <div><b>{s.t}</b><small>{s.d}</small></div>
              </li>
            ))}
          </ol>
          <p className="muted">Demo tracking: status advances automatically to illustrate the experience. A live store would use real courier updates.</p>
        </div>
      )}
    </div>
  );
}
