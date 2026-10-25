import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { getProduct } from '../data/products.js';
import { coupons as couponList } from '../data/content.js';

const StoreContext = createContext(null);
export const useStore = () => useContext(StoreContext);

const load = (key, fallback) => {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
};
const save = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load('s28_cart', []));          // [{id, qty}]
  const [wishlist, setWishlist] = useState(() => load('s28_wish', []));   // [id]
  const [coupon, setCoupon] = useState(() => load('s28_coupon', null));   // code
  const [user, setUser] = useState(() => load('s28_user', null));         // {phone,name,email,addresses}
  const [users, setUsers] = useState(() => load('s28_users', {}));        // phone -> profile (demo, local only)
  const [orders, setOrders] = useState(() => load('s28_orders', []));
  const [recent, setRecent] = useState(() => load('s28_recent', []));
  const [toast, setToast] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authRedirect, setAuthRedirect] = useState(null);
  const [quick, setQuick] = useState(null);

  useEffect(() => save('s28_cart', cart), [cart]);
  useEffect(() => save('s28_wish', wishlist), [wishlist]);
  useEffect(() => save('s28_coupon', coupon), [coupon]);
  useEffect(() => save('s28_user', user), [user]);
  useEffect(() => save('s28_users', users), [users]);
  useEffect(() => save('s28_orders', orders), [orders]);
  useEffect(() => save('s28_recent', recent), [recent]);

  const notify = useCallback((msg) => {
    setToast({ msg, key: Date.now() });
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => setToast(null), 2300);
  }, []);

  // ---- bag ----
  const addToCart = (id, qty = 1) => {
    setCart((c) => {
      const found = c.find((i) => i.id === id);
      if (found) return c.map((i) => (i.id === id ? { ...i, qty: Math.min(10, i.qty + qty) } : i));
      return [...c, { id, qty }];
    });
    notify('Added to bag');
  };
  const setQty = (id, qty) =>
    setCart((c) => (qty <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty: Math.min(10, qty) } : i))));
  const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id));
  const clearCart = () => { setCart([]); setCoupon(null); };

  // ---- wishlist ----
  const toggleWish = (id) => {
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
    notify(wishlist.includes(id) ? 'Removed from wishlist' : 'Added to wishlist');
  };

  // ---- totals ----
  const lines = useMemo(
    () => cart.map((i) => ({ ...i, product: getProduct(i.id) })).filter((l) => l.product),
    [cart]
  );
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const mrpTotal = lines.reduce((s, l) => s + l.product.mrp * l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const active = couponList.find((c) => c.code === coupon);
  const couponOff = active && subtotal >= active.min
    ? Math.min(subtotal, active.type === 'pct' ? Math.round((subtotal * active.value) / 100) : active.value)
    : 0;
  const shipping = subtotal - couponOff >= 499 || subtotal === 0 ? 0 : 49;
  const total = subtotal - couponOff + shipping;

  const applyCoupon = (code) => {
    const c = couponList.find((x) => x.code === code.trim().toUpperCase());
    if (!c) { notify('Invalid coupon code'); return false; }
    if (subtotal < c.min) { notify(`Add items worth ₹${c.min.toLocaleString('en-IN')} to use ${c.code}`); return false; }
    setCoupon(c.code);
    notify(`Coupon applied: ${c.title}`);
    return true;
  };

  // ---- auth (demo, stored in this browser only) ----
  const openAuth = (redirect = null) => { setAuthRedirect(redirect); setAuthOpen(true); };
  const closeAuth = () => setAuthOpen(false);
  const login = (phone, name) => {
    const existing = users[phone];
    if (existing) { setUser(existing); return 'ok'; }
    if (!name) return 'need-name';
    const profile = { phone, name, email: '', addresses: [] };
    setUsers((u) => ({ ...u, [phone]: profile }));
    setUser(profile);
    return 'ok';
  };
  const logout = () => { setUser(null); notify('Signed out'); };
  const updateUser = (patch) => {
    setUser((u) => {
      if (!u) return u;
      const next = { ...u, ...patch };
      setUsers((all) => ({ ...all, [next.phone]: next }));
      return next;
    });
  };

  // ---- orders ----
  const addOrder = (order) => setOrders((o) => [order, ...o]);

  // ---- recently viewed & quick view ----
  const pushRecent = useCallback((id) => {
    setRecent((r) => (r[0] === id ? r : [id, ...r.filter((x) => x !== id)].slice(0, 10)));
  }, []);
  const openQuick = (id) => setQuick(id);
  const closeQuick = () => setQuick(null);

  const value = {
    lines, count, mrpTotal, subtotal, couponOff, shipping, total, coupon,
    addToCart, setQty, removeFromCart, clearCart, applyCoupon, setCoupon,
    wishlist, toggleWish, toast, notify,
    user, login, logout, updateUser, authOpen, authRedirect, openAuth, closeAuth,
    orders, addOrder, recent, pushRecent, quick, openQuick, closeQuick,
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
