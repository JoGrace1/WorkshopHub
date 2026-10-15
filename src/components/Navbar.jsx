import { useAuth } from 'react-oidc-context';
import { cognitoDomain, oidcConfig } from '../authConfig';

export default function Navbar() {
  const auth = useAuth();

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    const logoutUrl =
      `${cognitoDomain}/logout` +
      `?client_id=${oidcConfig.client_id}` +
      `&logout_uri=${encodeURIComponent(oidcConfig.redirect_uri)}`;

    await auth.removeUser();
    window.location.href = logoutUrl;
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
          <li className="nav-auth">
            {auth.isAuthenticated ? (
              <>
                <span className="nav-user">
                  Logged in as: {auth.user?.profile?.email}
                </span>
                <button className="nav-button" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <button
                className="nav-button"
                onClick={() => auth.signinRedirect()}
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
