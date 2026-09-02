import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import AlphabetFilter from './components/AlphabetFilter';
import TermCard from './components/TermCard';
import TermModal from './components/TermModal';
import TermOfTheDay from './components/TermOfTheDay';
import CategoriesView from './components/CategoriesView';
import CompareView from './components/CompareView';
import QuizView from './components/QuizView';
import LoadingSkeleton from './components/LoadingSkeleton';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import { api } from './services/api';
import {
  Scale,
  Sparkles,
  BookOpen,
  Filter,
  ArrowUpDown,
  AlertCircle,
  RotateCcw,
  Layers,
  Bookmark,
} from 'lucide-react';
import './App.css';

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const token = localStorage.getItem('lawsync_token');
      const user = localStorage.getItem('lawsync_user');
      return Boolean(token && user);
    } catch {
      return false;
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('lawsync_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (user, token) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('lawsync_token');
    localStorage.removeItem('lawsync_user');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setBookmarkedIds([]);
    setActiveTab('dictionary');
  };

  // Navigation State
  const [activeTab, setActiveTab] = useState('dictionary'); // 'dictionary' | 'termofday' | 'categories' | 'compare' | 'quiz' | 'bookmarks'

  // Backend Health & Metadata
  const [backendStatus, setBackendStatus] = useState({ online: false, error: null });

  // Data States (Fetched dynamically from PostgreSQL)
  const [terms, setTerms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalTermsCount, setTotalTermsCount] = useState(0);

  // Filter & Query States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLetter, setSelectedLetter] = useState('');
  const [sortOption, setSortOption] = useState('word'); // 'word' | 'popular' | '-createdAt'

  // UI / Interactive States
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedTermForModal, setSelectedTermForModal] = useState(null);
  const [compareSelection, setCompareSelection] = useState({ term1: '', term2: '' });

  // Bookmarks State (Per-user isolation and DB sync)
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const user = localStorage.getItem('lawsync_user');
      const userId = user ? JSON.parse(user)?.id : null;
      if (!userId) return [];
      const saved = localStorage.getItem(`lawsync_bookmarks_${userId}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Fetch bookmarks from backend on user session
  useEffect(() => {
    async function loadUserBookmarks() {
      const token = localStorage.getItem('lawsync_token');
      if (token && currentUser?.id) {
        try {
          const res = await api.getBookmarks(token);
          if (res.success && Array.isArray(res.data)) {
            const dbIds = res.data.map((b) => b.term?.id || b.termId).filter(Boolean);
            setBookmarkedIds(dbIds);
            localStorage.setItem(`lawsync_bookmarks_${currentUser.id}`, JSON.stringify(dbIds));
          }
        } catch (e) {
          console.warn('Failed to sync bookmarks from database', e);
        }
      }
    }
    loadUserBookmarks();
  }, [currentUser]);

  const toggleBookmark = async (termId) => {
    const isCurrently = bookmarkedIds.includes(termId);
    const updated = isCurrently
      ? bookmarkedIds.filter((id) => id !== termId)
      : [...bookmarkedIds, termId];

    setBookmarkedIds(updated);

    if (currentUser?.id) {
      localStorage.setItem(`lawsync_bookmarks_${currentUser.id}`, JSON.stringify(updated));
      const token = localStorage.getItem('lawsync_token');
      if (token) {
        try {
          if (isCurrently) {
            await api.removeBookmark(termId, token);
          } else {
            await api.addBookmark(termId, token);
          }
        } catch (e) {
          console.warn('Failed to sync bookmark to server', e);
        }
      }
    }
  };

  const isBookmarked = (termId) => bookmarkedIds.includes(termId);

  // 1. Initial Health Check and Category Fetch
  useEffect(() => {
    async function initApp() {
      try {
        const health = await api.checkHealth();
        setBackendStatus({ online: true, service: health.service });
      } catch (err) {
        setBackendStatus({ online: false, error: err.message });
      }

      try {
        const catRes = await api.getCategories();
        if (catRes.success && catRes.data) {
          setCategories(catRes.data);
          if (catRes.totalTerms) {
            setTotalTermsCount(catRes.totalTerms);
          }
        }
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    }
    initApp();
  }, []);

  // 2. Fetch Legal Terms dynamically with filters
  const fetchLegalTerms = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsSearching(Boolean(searchQuery.trim()));
      setErrorMessage(null);

      const params = {
        search: searchQuery.trim(),
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        letter: selectedLetter || undefined,
        sort: sortOption,
        limit: 500, // Fetch all available terms dynamically
      };

      const res = await api.getTerms(params);
      if (res.success) {
        setTerms(res.data || []);
        if (res.total && selectedCategory === 'all' && !searchQuery && !selectedLetter) {
          setTotalTermsCount(res.total);
        }
        setBackendStatus((prev) => ({ ...prev, online: true }));
      }
    } catch (err) {
      setErrorMessage(err.message || 'Unable to fetch legal terms from backend API.');
      setBackendStatus({ online: false, error: err.message });
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  }, [searchQuery, selectedCategory, selectedLetter, sortOption]);

  // Debounced search / filter trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLegalTerms();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchLegalTerms]);

  // Calculate available letters from current loaded terms
  const availableLetters = useMemo(() => {
    const set = new Set();
    terms.forEach((t) => {
      if (t.word) set.add(t.word[0].toUpperCase());
    });
    return Array.from(set);
  }, [terms]);

  // Handle opening term modal and recording view history
  const handleOpenTermModal = (term) => {
    setSelectedTermForModal(term);
    const token = localStorage.getItem('lawsync_token');
    if (token && term?.id) {
      api.addHistory(term.id, token).catch(() => {});
    }
  };

  // Handle clicking on related term tags
  const handleRelatedTermClick = (relTermWord) => {
    setSearchQuery(relTermWord);
    setSelectedCategory('all');
    setSelectedLetter('');
    setActiveTab('dictionary');
  };

  // Handle initiating comparison from a term card
  const handleCompareWith = (term) => {
    setCompareSelection({
      term1: term.word,
      term2: terms.find((t) => t.id !== term.id)?.word || '',
    });
    setActiveTab('compare');
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLetter('');
    setSortOption('word');
  };

  // Filtered terms for Bookmarks tab
  const displayedTerms = useMemo(() => {
    if (activeTab === 'bookmarks') {
      return terms.filter((t) => bookmarkedIds.includes(t.id));
    }
    return terms;
  }, [terms, activeTab, bookmarkedIds]);

  // If not authenticated, render Sign In / Registration flow directly
  if (!isAuthenticated) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="lawsync-app">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        backendStatus={backendStatus}
        termCount={totalTermsCount || terms.length}
        bookmarkedCount={bookmarkedIds.length}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main className="main-content-wrap">
        {/* Backend Connection Error Banner if offline */}
        {!backendStatus.online && errorMessage && (
          <div className="connection-error-alert">
            <AlertCircle size={22} className="alert-icon" />
            <div className="alert-text">
              <strong>Backend Connection Notice:</strong> {errorMessage} Ensure the Express backend is running on <code>http://localhost:5000</code> with PostgreSQL.
            </div>
            <button type="button" className="retry-btn" onClick={fetchLegalTerms}>
              <RotateCcw size={14} /> Retry Connection
            </button>
          </div>
        )}

        {/* Tab 1: Dictionary & Main Search */}
        {activeTab === 'dictionary' && (
          <div className="dictionary-view">
            {/* Hero / Header Section */}
            <section className="hero-banner">
              <div className="hero-badge">
                <Scale size={15} /> Codified Jurisprudence System
              </div>
              <h1 className="hero-heading">
                Legal Dictionary & <span className="text-gold">Statutory Guide</span>
              </h1>
              <p className="hero-subtitle">
                Access statutory definitions, plain-English translations, landmark precedents, and procedural provisions.
              </p>

              {/* Live Search Bar */}
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearchSubmit={fetchLegalTerms}
                totalResults={terms.length}
                isSearching={isSearching}
              />
            </section>

            {/* Category Filter Chips */}
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={(catId) => {
                setSelectedCategory(catId);
                setSelectedLetter('');
              }}
            />

            {/* A-Z Alphabetical Filter */}
            <AlphabetFilter
              selectedLetter={selectedLetter}
              onSelectLetter={setSelectedLetter}
              availableLetters={availableLetters}
            />

            {/* Controls Bar: Sorting & Filter Reset */}
            <div className="results-controls-bar">
              <div className="results-summary">
                <span>
                  Showing <strong>{terms.length}</strong> legal terms from PostgreSQL
                </span>
                {(selectedCategory !== 'all' || selectedLetter || searchQuery) && (
                  <button
                    type="button"
                    className="clear-all-filters-btn"
                    onClick={handleResetFilters}
                  >
                    Reset all filters
                  </button>
                )}
              </div>

              <div className="sort-wrapper">
                <ArrowUpDown size={15} className="sort-icon" />
                <label htmlFor="sortSelect" className="sort-label">
                  Sort by:
                </label>
                <select
                  id="sortSelect"
                  className="sort-dropdown"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="word">Alphabetical (A - Z)</option>
                  <option value="popular">Popular First</option>
                  <option value="-createdAt">Recently Added</option>
                </select>
              </div>
            </div>

            {/* Dynamic Terms Grid / Skeletons */}
            {isLoading ? (
              <LoadingSkeleton count={6} />
            ) : terms.length > 0 ? (
              <div className="terms-grid">
                {terms.map((term) => (
                  <TermCard
                    key={term.id}
                    term={term}
                    onSelectTerm={handleOpenTermModal}
                    onRelatedTermClick={handleRelatedTermClick}
                    onCompareWith={handleCompareWith}
                    isBookmarked={isBookmarked(term.id)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-results-box">
                <BookOpen size={48} className="empty-icon" />
                <h3 className="empty-title">No legal terms found</h3>
                <p className="empty-desc">
                  No terms matched your query "<strong>{searchQuery}</strong>" in the selected category.
                </p>
                <button type="button" className="btn-primary" onClick={handleResetFilters}>
                  Clear Search & View All Terms
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Term of the Day */}
        {activeTab === 'termofday' && (
          <div className="tod-view-wrapper">
            <div className="section-intro">
              <h2 className="section-heading">Featured Jurisprudence</h2>
              <p className="section-subheading">
                Daily deep-dive into landmark doctrines, constitutional remedies, and procedural mechanisms.
              </p>
            </div>
            <TermOfTheDay
              onSelectTerm={handleOpenTermModal}
              onRelatedTermClick={handleRelatedTermClick}
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
            />
          </div>
        )}

        {/* Tab 3: Categories */}
        {activeTab === 'categories' && (
          <CategoriesView
            categories={categories}
            onSelectCategory={(catId) => {
              setSelectedCategory(catId);
              setActiveTab('dictionary');
            }}
          />
        )}

        {/* Tab 4: Compare Terms */}
        {activeTab === 'compare' && (
          <CompareView
            allTerms={terms.length > 0 ? terms : []}
            initialTerm1={compareSelection.term1}
            initialTerm2={compareSelection.term2}
          />
        )}

        {/* Tab 5: Legal Quiz */}
        {activeTab === 'quiz' && <QuizView />}

        {/* Tab 6: Saved Bookmarks */}
        {activeTab === 'bookmarks' && (
          <div className="bookmarks-view-wrapper">
            <div className="section-intro">
              <h2 className="section-heading">Saved Legal Terms</h2>
              <p className="section-subheading">
                Your personalized repository of bookmarked statutory doctrines, procedural rules, and jurisprudence definitions.
              </p>
            </div>
            {terms.filter((t) => bookmarkedIds.includes(t.id)).length > 0 ? (
              <div className="terms-grid">
                {terms
                  .filter((t) => bookmarkedIds.includes(t.id))
                  .map((term) => (
                    <TermCard
                      key={term.id}
                      term={term}
                      onSelectTerm={handleOpenTermModal}
                      onRelatedTermClick={handleRelatedTermClick}
                      onCompareWith={handleCompareWith}
                      isBookmarked={isBookmarked(term.id)}
                      onToggleBookmark={toggleBookmark}
                    />
                  ))}
              </div>
            ) : (
              <div className="empty-results-box">
                <Bookmark size={48} className="empty-icon" />
                <h3 className="empty-title">No bookmarked terms yet</h3>
                <p className="empty-desc">
                  Click the bookmark ribbon icon on any legal term card to save it here for quick reference.
                </p>
                <button type="button" className="btn-primary" onClick={() => setActiveTab('dictionary')}>
                  Browse Legal Dictionary
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Detailed Modal Dialog */}
      {selectedTermForModal && (
        <TermModal
          term={selectedTermForModal}
          onClose={() => setSelectedTermForModal(null)}
          onRelatedTermClick={handleRelatedTermClick}
          onCompareWith={handleCompareWith}
          isBookmarked={isBookmarked(selectedTermForModal.id)}
          onToggleBookmark={toggleBookmark}
        />
      )}

      {/* Footer */}
      <Footer totalTerms={totalTermsCount || 18} totalCategories={categories.length || 6} />
    </div>
  );
}
