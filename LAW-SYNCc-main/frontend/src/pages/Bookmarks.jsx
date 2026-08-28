import { useState } from 'react';
import { Bookmark, Trash2, BookOpen, Search } from 'lucide-react';
import TermCard from '../components/TermCard';

export default function Bookmarks({
  terms,
  bookmarkedIds,
  onToggleBookmark,
  onClearBookmarks,
  onSelectTerm,
  onNavigate
}) {
  const [filterQuery, setFilterQuery] = useState('');

  const bookmarkedTerms = terms.filter(t => bookmarkedIds.includes(t.id));
  const filteredBookmarks = bookmarkedTerms.filter(t => 
    !filterQuery || 
    t.word.toLowerCase().includes(filterQuery.toLowerCase()) ||
    t.simpleMeaning.toLowerCase().includes(filterQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="bookmarks-page-view">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#d4af37', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <Bookmark size={18} />
            <span>Personal Study Deck</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Saved Bookmarks ({bookmarkedTerms.length})
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Your curated collection of important legal terms for quick revision and exam preparation.
          </p>
        </div>

        {bookmarkedTerms.length > 0 && (
          <button
            className="btn-secondary"
            style={{ color: '#ef4444', borderColor: '#fecaca' }}
            onClick={onClearBookmarks}
          >
            <Trash2 size={16} />
            <span>Clear All Bookmarks</span>
          </button>
        )}
      </div>

      {bookmarkedTerms.length > 0 ? (
        <>
          {/* Quick Filter Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#ffffff',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.6rem 1rem',
              marginBottom: '2rem',
              gap: '0.75rem',
              maxWidth: '450px'
            }}
          >
            <Search size={18} color="#94a3b8" />
            <input
              type="text"
              placeholder="Filter your saved terms..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-body)'
              }}
            />
          </div>

          {filteredBookmarks.length > 0 ? (
            <div className="terms-grid">
              {filteredBookmarks.map((term) => (
                <TermCard
                  key={term.id}
                  term={term}
                  onSelectTerm={onSelectTerm}
                  isBookmarked={true}
                  onToggleBookmark={onToggleBookmark}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', background: '#ffffff', borderRadius: 'var(--radius-xl)' }}>
              <p style={{ color: '#64748b' }}>No saved bookmarks match "{filterQuery}".</p>
            </div>
          )}
        </>
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
              margin: '0 auto 1.25rem'
            }}
          >
            <Bookmark size={28} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            No bookmarks saved yet
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.96rem', maxWidth: '440px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            Click the bookmark ribbon icon on any legal term in the dictionary to save it here for fast offline reference.
          </p>
          <button className="btn-primary" onClick={() => onNavigate('dictionary')}>
            <BookOpen size={16} />
            <span>Browse Dictionary Now</span>
          </button>
        </div>
      )}
    </div>
  );
}
