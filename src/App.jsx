import { useState } from 'react';
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

  return (
    <div className="app">
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
