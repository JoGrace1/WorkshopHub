import { useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { cognitoDomain, oidcConfig } from './authConfig';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WorkshopList from './components/WorkshopList';
import About from './components/About';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [registeredWorkshops, setRegisteredWorkshops] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const auth = useAuth();
  console.log("AUTH USER:", auth.user);
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleRegister = (workshopId, workshopTitle) => {
    if (registeredWorkshops[workshopId]) {
      setConfirmationMessage(`You are already registered for ${workshopTitle}!`);
    } else {
      setRegisteredWorkshops(prev => ({
        ...prev,
        [workshopId]: true
      }));
      setConfirmationMessage(`✓ You are registered for ${workshopTitle}!`);
    }
    
    setShowConfirmation(true);
    
    // Hide confirmation after 3 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  const handleLogout = () => {
  const logoutUrl =
    `${cognitoDomain}/logout` +
    `?client_id=${oidcConfig.client_id}` +
    `&logout_uri=${encodeURIComponent(oidcConfig.redirect_uri)}`;

  auth.removeUser();
  window.location.href = logoutUrl;
};

  return (
    <div className="app">
      <div>
        {auth.isAuthenticated ? (
          <div>
            <p>Logged in as: {auth.user?.profile?.email}</p>
            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button onClick={() => auth.signinRedirect()}>
            Login
          </button>
        )}
      </div>
      <Navbar />
      <Hero />
      <WorkshopList 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        onRegister={handleRegister}
      />
      <About />
      <Footer />
      
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            {confirmationMessage}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
