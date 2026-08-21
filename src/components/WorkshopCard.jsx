export default function WorkshopCard({ workshop, onRegister }) {
  return (
    <div className="workshop-card">
      <div className="workshop-badge">{workshop.category}</div>
      <h3>{workshop.title}</h3>
      <p className="workshop-description">{workshop.description}</p>
      
      <div className="workshop-details">
        <div className="detail">
          <span className="detail-label">📅</span>
          <span>{workshop.date}</span>
        </div>
        <div className="detail">
          <span className="detail-label">📍</span>
          <span>{workshop.location}</span>
        </div>
      </div>
      
      <button
        className="btn btn-secondary"
        onClick={() => onRegister(workshop.id, workshop.title)}
      >
        Register
      </button>
    </div>
  );
}
