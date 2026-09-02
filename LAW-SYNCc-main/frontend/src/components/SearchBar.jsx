import React from 'react';
import { Search, X, Mic, Sparkles } from 'lucide-react';

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  totalResults,
  isSearching,
}) {
  const handleClear = () => {
    setSearchQuery('');
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice recognition is not supported in this browser. Please type your search query.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
    };
  };

  return (
    <div className="searchbar-wrapper">
      <div className="searchbar-box">
        <div className="search-icon-box">
          <Search size={22} className="search-icon" />
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Search 18 legal terms, definitions, keywords, or laws (e.g. 'Bail', 'Mens Rea', 'CrPC')..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onSearchSubmit) onSearchSubmit();
          }}
        />

        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={handleClear}
            title="Clear search"
          >
            <X size={18} />
          </button>
        )}

        <button
          type="button"
          className="search-mic-btn"
          onClick={handleVoiceSearch}
          title="Voice Search (Click and speak legal term)"
        >
          <Mic size={18} />
        </button>
      </div>

      <div className="search-meta">
        {searchQuery ? (
          <div className="search-result-count">
            {isSearching ? (
              <span className="searching-spinner">Searching PostgreSQL...</span>
            ) : (
              <span>
                Found <strong>{totalResults}</strong> result{totalResults === 1 ? '' : 's'} for "
                <span className="search-query-text">{searchQuery}</span>"
              </span>
            )}
          </div>
        ) : (
          <div className="search-suggestions">
            <span className="suggestions-label">
              <Sparkles size={14} /> Quick searches:
            </span>
            {['Bail', 'Habeas Corpus', 'Mens Rea', 'Tort', 'Force Majeure'].map((term) => (
              <button
                key={term}
                type="button"
                className="suggestion-tag"
                onClick={() => setSearchQuery(term)}
              >
                {term}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
