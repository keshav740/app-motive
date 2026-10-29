export default function Footer() {
  return (
    <footer>
      <div className="footer-brand">
        <img src="/web-logo.webp" alt="AppMotive Technologies" className="footer-logo" />
        <span>App<span style={{ color: 'var(--blue)' }}>Motive</span> Technologies</span>
      </div>
      <div className="footer-links">
        <a href="mailto:info@appmotivetechnologies.com">info@appmotivetechnologies.com</a>
        <a href="tel:+919837033948">+91 9837033948</a>
        <a href="tel:+919953286867">+91 9953286867</a>
      </div>
      <div className="copyright">© 2026 AppMotive Technologies. All rights reserved.</div>
    </footer>
  );
}
