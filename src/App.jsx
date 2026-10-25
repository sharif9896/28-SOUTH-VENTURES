import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AuthModal from './components/AuthModal.jsx';
import QuickView from './components/QuickView.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Checkout from './pages/Checkout.jsx';
import Account from './pages/Account.jsx';
import TrackOrder from './pages/TrackOrder.jsx';
import Brands from './pages/Brands.jsx';
import Offers from './pages/Offers.jsx';
import { Blog, BlogPost } from './pages/Blog.jsx';
import { About, Contact, Careers, Faq, Policy, Stores } from './pages/Static.jsx';
import { useStore } from './context/StoreContext.jsx';

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <button className={`to-top ${show ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑</button>
  );
}

export default function App() {
  const { toast } = useStore();
  const location = useLocation();
  return (
    <>
      <ScrollTop />
      <Header />
      <main key={location.pathname} className="page-anim">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<Products mode="category" />} />
          <Route path="/brand/:name" element={<Products mode="brand" />} />
          <Route path="/search" element={<Products mode="search" />} />
          <Route path="/sale" element={<Products mode="sale" />} />
          <Route path="/new" element={<Products mode="new" />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/shipping-policy" element={<Policy kind="shipping" />} />
          <Route path="/return-policy" element={<Policy kind="returns" />} />
          <Route path="/privacy-policy" element={<Policy kind="privacy" />} />
          <Route path="/terms" element={<Policy kind="terms" />} />
          <Route path="*" element={
            <div className="container empty">
              <div className="big float">🔍</div><h3>Page not found</h3>
              <p>The page you are looking for does not exist.</p>
              <Link className="btn shine" to="/">Back to home</Link>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
      <AuthModal />
      <QuickView />
      <BackToTop />
      {toast && <div className="toast" key={toast.key}>{toast.msg}</div>}
    </>
  );
}
