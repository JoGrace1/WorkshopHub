export default function Navbar() {
  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          WorkshopHub
        </div>
        <ul className="nav-links">
          <li>
            <button 
              className="nav-button"
              onClick={() => handleNavClick('home')}
            >
              Home
            </button>
          </li>
          <li>
            <button 
              className="nav-button"
              onClick={() => handleNavClick('workshops')}
            >
              Workshops
            </button>
          </li>
          <li>
            <button 
              className="nav-button"
              onClick={() => handleNavClick('about')}
            >
              About
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
