export default function Hero() {
  const handleBrowseClick = () => {
    const element = document.getElementById('workshops');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>Finding Your Next Adventure</h1>
        <p className="hero-subtitle">
          Discover amazing workshops, meet interesting people, and develop new skills.
        </p>
        <button 
          className="btn btn-primary"
          onClick={handleBrowseClick}
        >
          Browse Workshops
        </button>
      </div>
      <div className="hero-background"></div>
    </section>
  );
}
