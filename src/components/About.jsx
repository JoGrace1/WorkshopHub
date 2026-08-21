export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2>About WorkshopHub</h2>
        <div className="about-content">
          <p>
            WorkshopHub is a modern platform designed to connect learners with expert instructors 
            and high-quality educational experiences. We believe that continuous learning is the 
            key to personal and professional growth.
          </p>
          <p>
            Whether you're interested in technology, creative skills, or business knowledge, 
            our workshops bring together passionate people who want to learn something new.
          </p>
          <div className="about-features">
            <div className="feature">
              <span className="feature-icon">🎯</span>
              <h3>Expert Instructors</h3>
              <p>Learn from industry professionals with real-world experience.</p>
            </div>
            <div className="feature">
              <span className="feature-icon">👥</span>
              <h3>Community</h3>
              <p>Connect with like-minded learners and build lasting relationships.</p>
            </div>
            <div className="feature">
              <span className="feature-icon">📈</span>
              <h3>Growth</h3>
              <p>Develop new skills and advance your career with our curated workshops.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
