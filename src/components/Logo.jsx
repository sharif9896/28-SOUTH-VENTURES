import { Link } from 'react-router-dom';

export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? 'light' : ''}`} aria-label="28 South Ventures LLP, home">
      <span className="logo-n">28</span>
      <span className="logo-t"><b>SOUTH</b><small>VENTURES LLP</small></span>
    </Link>
  );
}
