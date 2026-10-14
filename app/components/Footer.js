import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-brand">
        <img src="/web-logo.webp" alt="AppMotive Technologies" className="footer-logo" />
        <span>App<span style={{ color: 'var(--blue)' }}>Motive</span> Technologies</span>
      </div>
      <div className="footer-links">
        <Link href="/services">Services</Link>
        <Link href="/why-us">Why Us</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div className="copyright">© 2026 AppMotive Technologies. All rights reserved.</div>
    </footer>
  );
}
