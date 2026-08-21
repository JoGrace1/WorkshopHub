import { categories } from '../data/workshops';

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      <h2>Filter by Category</h2>
      <div className="filter-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
