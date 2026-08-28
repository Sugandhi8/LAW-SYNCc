import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TermDetailsModal from './components/TermDetailsModal';
import Home from './pages/Home';
import Dictionary from './pages/Dictionary';
import Categories from './pages/Categories';
import Bookmarks from './pages/Bookmarks';
import History from './pages/History';
import Compare from './pages/Compare';
import Quiz from './pages/Quiz';
import { sampleLegalTerms } from './data/legalTerms';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalTerm, setActiveModalTerm] = useState(null);
  const [compareTerm1Id, setCompareTerm1Id] = useState(null);
  const [compareTerm2Id, setCompareTerm2Id] = useState(null);

  // Bookmarks persistence
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('lawsync_bookmarks');
      return saved ? JSON.parse(saved) : ['1', '2'];
    } catch {
      return ['1', '2'];
    }
  });

  // History persistence
  const [historyItems, setHistoryItems] = useState(() => {
    try {
      const saved = localStorage.getItem('lawsync_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync Bookmarks to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('lawsync_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error("Failed to save bookmarks to localStorage:", e);
    }
  }, [bookmarkedIds]);

  // Sync History to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('lawsync_history', JSON.stringify(historyItems));
    } catch (e) {
      console.error("Failed to save history to localStorage:", e);
    }
  }, [historyItems]);

  // Toggle Bookmark Handler
  const handleToggleBookmark = (termId) => {
    setBookmarkedIds(prev => {
      if (prev.includes(termId)) {
        return prev.filter(id => id !== termId);
      } else {
        return [...prev, termId];
      }
    });
  };

  // Clear Bookmarks Handler
  const handleClearBookmarks = () => {
    if (window.confirm("Are you sure you want to clear all saved bookmarks?")) {
      setBookmarkedIds([]);
    }
  };

  // Clear History Handler
  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your search history?")) {
      setHistoryItems([]);
    }
  };

  // Add term to History and open detail modal
  const handleSelectTerm = (term) => {
    if (!term) return;
    setActiveModalTerm(term);

    // Record in history
    setHistoryItems(prev => {
      const filtered = prev.filter(item => item.id !== term.id);
      const newEntry = {
        id: term.id,
        word: term.word,
        category: term.category,
        simpleMeaning: term.simpleMeaning,
        timestamp: new Date().toISOString()
      };
      return [newEntry, ...filtered].slice(0, 30); // keep max 30 items
    });
  };

  // Select term by ID (from history or related term)
  const handleSelectTermById = (termId) => {
    const found = sampleLegalTerms.find(t => t.id === termId || t.word.toLowerCase() === termId.toLowerCase());
    if (found) {
      handleSelectTerm(found);
    } else {
      // If word not matched by ID, search dictionary
      setSearchQuery(termId);
      setActiveTab('dictionary');
    }
  };

  // Click on related term pill inside modal
  const handleSelectRelatedTerm = (word) => {
    const found = sampleLegalTerms.find(t => t.word.toLowerCase() === word.toLowerCase());
    if (found) {
      handleSelectTerm(found);
    } else {
      setActiveModalTerm(null);
      setSearchQuery(word);
      setActiveTab('dictionary');
    }
  };

  // Trigger compare from modal or dictionary
  const handleCompareTerm = (term) => {
    setCompareTerm1Id(term.id);
    setActiveTab('compare');
  };

  // Navigation with params
  const handleNavigate = (tab, params = {}) => {
    if (params.category) {
      setSelectedCategory(params.category);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search from Home
  const handleSearchSubmitFromHome = (query) => {
    setSearchQuery(query);
    setActiveTab('dictionary');
  };

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarkCount={bookmarkedIds.length}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'home' && (
          <Home
            terms={sampleLegalTerms}
            onSelectTerm={handleSelectTerm}
            onNavigate={handleNavigate}
            onSearchSubmit={handleSearchSubmitFromHome}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeTab === 'dictionary' && (
          <Dictionary
            terms={sampleLegalTerms}
            onSelectTerm={handleSelectTerm}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeTab === 'categories' && (
          <Categories
            terms={sampleLegalTerms}
            onSelectTerm={handleSelectTerm}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeTab === 'compare' && (
          <Compare
            terms={sampleLegalTerms}
            initialTerm1Id={compareTerm1Id}
            initialTerm2Id={compareTerm2Id}
          />
        )}

        {activeTab === 'quiz' && (
          <Quiz />
        )}

        {activeTab === 'bookmarks' && (
          <Bookmarks
            terms={sampleLegalTerms}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onClearBookmarks={handleClearBookmarks}
            onSelectTerm={handleSelectTerm}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'history' && (
          <History
            historyItems={historyItems}
            onClearHistory={handleClearHistory}
            onSelectTermById={handleSelectTermById}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Term Inspection Modal */}
      {activeModalTerm && (
        <TermDetailsModal
          term={activeModalTerm}
          onClose={() => setActiveModalTerm(null)}
          isBookmarked={bookmarkedIds.includes(activeModalTerm.id)}
          onToggleBookmark={handleToggleBookmark}
          onSelectRelatedTerm={handleSelectRelatedTerm}
          onCompareTerm={handleCompareTerm}
        />
      )}

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
