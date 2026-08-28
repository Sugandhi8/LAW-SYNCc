import { useState, useMemo } from 'react';
import { BookOpen, Filter, Search, RotateCcw, ArrowUpDown } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import TermCard from '../components/TermCard';
import { legalCategories } from '../data/legalTerms';

export default function Dictionary({
  terms,
  onSelectTerm,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  bookmarkedIds,
  onToggleBookmark
}) {
  const [selectedLetter, setSelectedLetter] = useState('ALL');
  const [sortBy, setSortBy] = useState('az'); // az, za, category

  // Alphabetical letters available
  const letters = useMemo(() => {
    const set = new Set();
    terms.forEach(t => {
      if (t.word && t.word.length > 0) {
        set.add(t.word[0].toUpperCase());
      }
    });
    return ['ALL', ...Array.from(set).sort()];
  }, [terms]);

  // Filtered and Sorted Terms
  const filteredTerms = useMemo(() => {
    return terms.filter(term => {
      // Search query filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        term.word.toLowerCase().includes(query) ||
        term.simpleMeaning.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query) ||
        (term.relatedLaws && term.relatedLaws.toLowerCase().includes(query)) ||
        (term.relatedTerms && term.relatedTerms.some(rt => rt.toLowerCase().includes(query)));

      // Category filter
      const matchesCategory = selectedCategory === 'all' || term.categoryId === selectedCategory;

      // Letter filter
      const matchesLetter = selectedLetter === 'ALL' || term.word[0].toUpperCase() === selectedLetter;

      return matchesSearch && matchesCategory && matchesLetter;
    }).sort((a, b) => {
      if (sortBy === 'az') return a.word.localeCompare(b.word);
      if (sortBy === 'za') return b.word.localeCompare(a.word);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return 0;
    });
  }, [terms, searchQuery, selectedCategory, selectedLetter, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLetter('ALL');
    setSortBy('az');
  };

  return (
    <div className="dictionary-page-view">
      {/* Top Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#d4af37', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          <BookOpen size={18} />
          <span>Complete Legal Catalog</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Legal Dictionary
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Search, filter, and inspect definitions, lay meanings, and statutory provisions across various fields of jurisprudence.
        </p>
      </div>

      {/* Main Search Bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search by term, meaning, section or law (e.g., 'CrPC', 'Writ', 'Negligence')..."
          autoFocus={false}
        />
      </div>

      {/* Category Pills Filter */}
      <div className="filter-pills-bar">
        {legalCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`filter-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Letter Bar & Sort Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '1rem 1.25rem',
          background: '#ffffff',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '2rem'
        }}
      >
        {/* Letter Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginRight: '0.25rem' }}>
            A-Z:
          </span>
          {letters.map((letter) => (
            <button
              key={letter}
              type="button"
              style={{
                background: selectedLetter === letter ? '#0b132b' : '#f1f5f9',
                color: selectedLetter === letter ? '#ffffff' : '#334155',
                border: 'none',
                padding: '0.25rem 0.55rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
              onClick={() => setSelectedLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Sort & Count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: 500 }}>
            Showing <strong>{filteredTerms.length}</strong> {filteredTerms.length === 1 ? 'term' : 'terms'}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowUpDown size={14} color="#64748b" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                background: '#f8fafc',
                cursor: 'pointer'
              }}
            >
              <option value="az">Sort: A to Z</option>
              <option value="za">Sort: Z to A</option>
              <option value="category">Sort by Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* Terms Grid or Empty State */}
      {filteredTerms.length > 0 ? (
        <div className="terms-grid">
          {filteredTerms.map((term) => (
            <TermCard
              key={term.id}
              term={term}
              onSelectTerm={onSelectTerm}
              isBookmarked={bookmarkedIds.includes(term.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            border: '1px dashed var(--border-subtle)'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#fef3c7',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}
          >
            <Search size={28} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            No legal terms found
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
            We couldn't find any terms matching "{searchQuery}". Try adjusting your search query, clearing letter filters, or exploring all categories.
          </p>
          <button className="btn-secondary" onClick={handleResetFilters}>
            <RotateCcw size={16} />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
