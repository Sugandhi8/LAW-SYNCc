import React from 'react';

export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="terms-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="term-card skeleton-card">
          <div className="skeleton-line skeleton-title"></div>
          <div className="skeleton-line skeleton-badge"></div>
          <div className="skeleton-block skeleton-meaning"></div>
          <div className="skeleton-block skeleton-def"></div>
          <div className="skeleton-line skeleton-footer"></div>
        </div>
      ))}
    </div>
  );
}
