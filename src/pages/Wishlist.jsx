import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { products } from '../data/products.js';

export default function Wishlist() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="container">
      <h1 className="page-title">My Wishlist <small>({items.length})</small></h1>
      {items.length ? (
        <div className="grid" style={{ paddingBottom: 40 }}>
          {items.map((p, i) => <div key={p.id} className="stagger" style={{ animationDelay: `${(i % 8) * 50}ms` }}><ProductCard p={p} /></div>)}
        </div>
      ) : (
        <div className="empty">
          <div className="big float">♡</div><h3>Your wishlist is empty</h3>
          <p>Tap the heart on any product to save it here.</p>
          <Link to="/" className="btn shine">Discover products</Link>
        </div>
      )}
    </div>
  );
}
