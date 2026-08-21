import { workshops } from '../data/workshops';
import WorkshopCard from './WorkshopCard';
import CategoryFilter from './CategoryFilter';

export default function WorkshopList({ activeCategory, onCategoryChange, onRegister }) {
  const filteredWorkshops = activeCategory === 'All'
    ? workshops
    : workshops.filter(workshop => workshop.category === activeCategory);

  return (
    <section id="workshops" className="workshops-section">
      <h2 className="section-title">Our Workshops</h2>
      <p className="section-subtitle">
        Choose from a variety of workshops designed to help you learn and grow.
      </p>
      
      <CategoryFilter 
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
      />
      
      <div className="workshops-grid">
        {filteredWorkshops.length > 0 ? (
          filteredWorkshops.map(workshop => (
            <WorkshopCard
              key={workshop.id}
              workshop={workshop}
              onRegister={onRegister}
            />
          ))
        ) : (
          <div className="no-workshops">
            <p>No workshops found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
