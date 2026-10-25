import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { inr } from '../data/products.js';

export default function Account() {
  const { user, openAuth, logout, updateUser, orders, wishlist, notify } = useStore();
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') || 'profile';
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [open, setOpen] = useState(null);

  useEffect(() => { setName(user?.name || ''); setEmail(user?.email || ''); }, [user]);

  if (!user) {
    return (
      <div className="container empty">
        <div className="big float">☺</div><h3>Sign in to view your account</h3>
        <p>Track orders, save addresses and keep your wishlist.</p>
        <button className="btn shine" onClick={() => openAuth('/account')}>Sign in / Sign up</button>
      </div>
    );
  }

  const myOrders = orders;
  const save = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) { notify('Please enter your name'); return; }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) { notify('Please enter a valid email'); return; }
    updateUser({ name: name.trim(), email: email.trim() });
    notify('Profile updated');
  };
  const removeAddr = (id) => updateUser({ addresses: user.addresses.filter((a) => a.id !== id) });
  const tabs = [['profile', 'Profile'], ['orders', `Orders (${myOrders.length})`], ['addresses', 'Addresses']];

  return (
    <div className="container">
      <h1 className="page-title">My Account</h1>
      <div className="acct-layout">
        <aside className="acct-side box">
          <div className="avatar">{user.name.slice(0, 1).toUpperCase()}</div>
          <b>{user.name}</b><small>+91 {user.phone}</small>
          {tabs.map(([k, l]) => (
            <button key={k} className={tab === k ? 'on' : ''} onClick={() => setParams({ tab: k })}>{l}</button>
          ))}
          <Link to="/wishlist">Wishlist ({wishlist.length})</Link>
          <button className="out" onClick={logout}>Sign out</button>
        </aside>

        <section className="box box-pad acct-main" key={tab}>
          {tab === 'profile' && (
            <form onSubmit={save} className="form-grid">
              <h3 className="box-title full">Profile details</h3>
              <div className="field"><label>Full name</label><input value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div className="field"><label>Mobile</label><input value={`+91 ${user.phone}`} disabled /></div>
              <div className="field full"><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></div>
              <div className="full"><button className="btn shine" type="submit">Save changes</button></div>
            </form>
          )}

          {tab === 'orders' && (
            <>
              <h3 className="box-title">My orders</h3>
              {!myOrders.length && <div className="empty small"><p>No orders yet.</p><Link to="/" className="btn">Start shopping</Link></div>}
              {myOrders.map((o) => (
                <div className="order" key={o.id}>
                  <button className="order-head" onClick={() => setOpen(open === o.id ? null : o.id)}>
                    <span><b>{o.id}</b><small>{new Date(o.placedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</small></span>
                    <span>{o.items.length} item{o.items.length > 1 ? 's' : ''} · <b>{inr(o.total)}</b></span>
                    <span className="chev">{open === o.id ? '−' : '+'}</span>
                  </button>
                  {open === o.id && (
                    <div className="order-body">
                      {o.items.map((i) => <div className="sum-row" key={i.id}><span>{i.name} × {i.qty}</span><span>{inr(i.price * i.qty)}</span></div>)}
                      <div className="order-actions"><Link to={`/track-order?id=${o.id}`} className="btn outline">Track order</Link></div>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {tab === 'addresses' && (
            <>
              <h3 className="box-title">Saved addresses</h3>
              {!user.addresses?.length && <div className="empty small"><p>No saved addresses yet. Your address is saved at checkout when you tick "Save this address".</p></div>}
              <div className="addr-grid">
                {user.addresses?.map((a) => (
                  <div className="addr" key={a.id}>
                    <b>{a.name}</b>
                    <p>{a.address}<br />{a.city}, {a.state} - {a.pin}<br />+91 {a.phone}</p>
                    <button className="link-btn" onClick={() => removeAddr(a.id)}>Remove</button>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
