import React from 'react';
import { Layers, Shield, FileText, Briefcase, Users, Cpu, BookmarkCheck } from 'lucide-react';

const categoryIcons = {
  all: Layers,
  criminal: Shield,
  'Criminal Law': Shield,
  constitutional: FileText,
  'Constitutional Law': FileText,
  civil: FileText,
  'Civil & Tort Law': FileText,
  corporate: Briefcase,
  'Corporate & Contract': Briefcase,
  family: Users,
  'Family Law': Users,
  cyber: Cpu,
  'Cyber Law & Tech': Cpu,
};

export default function CategoryFilter({
  categories = [],
  selectedCategory,
  onSelectCategory,
  activeFilterCount,
}) {
  return (
    <div className="category-filter-container">
      <div className="category-filter-header">
        <span className="filter-title">Filter by Legal Domain</span>
        {selectedCategory !== 'all' && (
          <button
            type="button"
            className="reset-filter-btn"
            onClick={() => onSelectCategory('all')}
          >
            Reset to All
          </button>
        )}
      </div>

      <div className="category-chips-list">
        {categories.map((cat) => {
          const isSelected =
            selectedCategory === cat.id ||
            selectedCategory === cat.name ||
            (selectedCategory === 'all' && cat.id === 'all');

          const IconComponent = categoryIcons[cat.id] || categoryIcons[cat.name] || Layers;

          return (
            <button
              key={cat.id || cat.name}
              type="button"
              className={`category-chip ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectCategory(cat.id || cat.name)}
            >
              <IconComponent size={15} className="chip-icon" />
              <span className="chip-name">{cat.name}</span>
              {typeof cat.count !== 'undefined' && (
                <span className="chip-count">{cat.count}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
