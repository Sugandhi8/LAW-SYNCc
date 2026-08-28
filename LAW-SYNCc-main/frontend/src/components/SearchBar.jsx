import { useState } from 'react';
import { Search, Mic, X } from 'lucide-react';
import VoiceSearchModal from './VoiceSearchModal';

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  placeholder = "Search legal terms (e.g. Bail, Affidavit, Mens Rea)...",
  onSubmit,
  autoFocus = false
}) {
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  const handleClear = () => {
    setSearchQuery('');
  };

  const handleVoiceResult = (text) => {
    setSearchQuery(text);
    if (onSubmit) onSubmit(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(searchQuery);
    }
  };

  return (
    <>
      <div className="searchbar-wrapper">
        <div className="search-input-group">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus={autoFocus}
          />
        </div>

        <div className="search-actions">
          {searchQuery && (
            <button
              type="button"
              className="search-btn-icon"
              onClick={handleClear}
              title="Clear search"
            >
              <X size={18} />
            </button>
          )}

          <button
            type="button"
            className="search-btn-icon search-btn-voice"
            onClick={() => setVoiceModalOpen(true)}
            title="Voice search"
          >
            <Mic size={18} />
          </button>

          {onSubmit && (
            <button
              type="button"
              className="search-btn-submit"
              onClick={() => onSubmit(searchQuery)}
            >
              Search
            </button>
          )}
        </div>
      </div>

      <VoiceSearchModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onResult={handleVoiceResult}
      />
    </>
  );
}
