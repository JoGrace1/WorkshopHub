export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <h3>WorkshopHub</h3>
          <p>Discover and register for amazing workshops.</p>
        </div>
        <div className="footer-meta">
          <p>&copy; {currentYear} WorkshopHub. All rights reserved.</p>
          <p>Built with React</p>
        </div>
      </div>
    </footer>
  );
}
