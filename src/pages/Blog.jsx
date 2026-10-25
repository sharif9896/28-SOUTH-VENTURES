import { Link, useParams } from 'react-router-dom';
import { blogPosts } from '../data/content.js';
import Img from '../components/Img.jsx';
import Reveal from '../components/Reveal.jsx';

const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export function Blog() {
  return (
    <div className="container">
      <div className="crumbs"><Link to="/">Home</Link> / Beauty Book</div>
      <div className="cat-banner">
        <div><h1>Beauty Book</h1><p>Tips, how-tos and trends from the 28 South team.</p></div>
        <span className="cat-emoji" aria-hidden="true">📖</span>
      </div>
      <div className="blog-grid two">
        {blogPosts.map((b, i) => (
          <Reveal key={b.slug} delay={(i % 2) * 90}>
            <Link to={`/blog/${b.slug}`} className="blog-card">
              <div className="blog-img"><Img src={b.image} alt={b.title} emoji="📖" /></div>
              <span className="blog-tag">{b.tag} · {b.read} read</span>
              <h3>{b.title}</h3>
              <p>{b.excerpt}</p>
              <small>{fmt(b.date)}</small>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((b) => b.slug === slug);
  if (!post) return <div className="container empty"><div className="big">📖</div><h3>Article not found</h3><Link to="/blog" className="btn">Back to Beauty Book</Link></div>;
  const more = blogPosts.filter((b) => b.slug !== slug).slice(0, 2);

  return (
    <div className="container narrow">
      <div className="crumbs"><Link to="/">Home</Link> / <Link to="/blog">Beauty Book</Link> / {post.tag}</div>
      <article className="post">
        <span className="blog-tag">{post.tag} · {post.read} read</span>
        <h1>{post.title}</h1>
        <small>By the 28 South team · {fmt(post.date)}</small>
        <div className="post-img"><Img src={post.image} alt={post.title} emoji="📖" eager /></div>
        {post.body.map((para, i) => <p key={i}>{para}</p>)}
        <Link to={`/category/${post.tag === 'Skin' ? 'skin' : post.tag.toLowerCase()}`} className="btn shine">Shop {post.tag}</Link>
      </article>
      <h3 className="more-h">Keep reading</h3>
      <div className="blog-grid two">
        {more.map((b) => (
          <Link key={b.slug} to={`/blog/${b.slug}`} className="blog-card">
            <div className="blog-img"><Img src={b.image} alt={b.title} emoji="📖" /></div>
            <span className="blog-tag">{b.tag}</span><h3>{b.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
