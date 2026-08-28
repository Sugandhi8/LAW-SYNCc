import { 
  Sparkles, 
  BookOpen, 
  Flame, 
  Layers, 
  Scale, 
  GraduationCap, 
  GitCompare, 
  ShieldAlert, 
  Landmark, 
  FileText, 
  Briefcase, 
  HeartHandshake, 
  Lock,
  ArrowRight
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import TermCard from '../components/TermCard';
import TextToSpeech from '../components/TextToSpeech';
import { legalCategories } from '../data/legalTerms';

export default function Home({
  terms,
  onSelectTerm,
  onNavigate,
  onSearchSubmit,
  searchQuery,
  setSearchQuery,
  bookmarkedIds,
  onToggleBookmark
}) {
  const termOfDay = terms.find(t => t.isTermOfDay) || terms[0];
  const popularTerms = terms.filter(t => t.isPopular);

  const getCategoryIcon = (id) => {
    switch (id) {
      case 'criminal': return <ShieldAlert size={24} color="#dc2626" />;
      case 'constitutional': return <Landmark size={24} color="#d97706" />;
      case 'civil': return <FileText size={24} color="#2563eb" />;
      case 'corporate': return <Briefcase size={24} color="#4f46e5" />;
      case 'family': return <HeartHandshake size={24} color="#db2777" />;
      case 'cyber': return <Lock size={24} color="#0284c7" />;
      default: return <Scale size={24} color="#d4af37" />;
    }
  };

  return (
    <div className="home-page-view">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <Sparkles size={14} />
          <span>Next-Gen Legal Knowledge Engine</span>
        </div>

        <h1 className="hero-title">
          Understand Legal Terminology <br />
          <span className="hero-title-highlight">Simply & Authoritatively</span>
        </h1>

        <p className="hero-subtitle">
          LAW-SYNC transforms intricate statutes, constitutional doctrines, and courtroom Latin into clear, everyday English with verified statutory references and audio pronunciations.
        </p>

        <div className="hero-search-container">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search any legal term (e.g., Habeas Corpus, Bail, Injunction)..."
            onSubmit={(query) => {
              if (onSearchSubmit) onSearchSubmit(query);
            }}
          />
        </div>

        {/* Quick Stats */}
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-icon">
              <BookOpen size={20} />
            </div>
            <div className="stat-info">
              <div className="stat-num">{terms.length}+</div>
              <div className="stat-label">Essential Terms</div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">
              <Layers size={20} />
            </div>
            <div className="stat-info">
              <div className="stat-num">{legalCategories.length - 1}</div>
              <div className="stat-label">Legal Domains</div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">
              <GraduationCap size={20} />
            </div>
            <div className="stat-info">
              <div className="stat-num">Interactive</div>
              <div className="stat-label">Quizzes & Tools</div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">
              <Scale size={20} />
            </div>
            <div className="stat-info">
              <div className="stat-num">100% Free</div>
              <div className="stat-label">Open Law Learning</div>
            </div>
          </div>
        </div>
      </section>

      {/* Term of the Day */}
      {termOfDay && (
        <section className="term-of-day-card">
          <div className="term-of-day-header">
            <span className="tod-badge">
              <Sparkles size={14} />
              Term of the Day
            </span>
            <TextToSpeech
              text={`${termOfDay.word}. ${termOfDay.simpleMeaning}`}
              label="Listen to Audio"
            />
          </div>

          <div className="tod-term-title">
            <span>{termOfDay.word}</span>
            {termOfDay.pronunciation && (
              <span className="pronunciation-tag">{termOfDay.pronunciation}</span>
            )}
          </div>

          <p className="tod-meaning">{termOfDay.simpleMeaning}</p>

          <div className="tod-footer">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="category-pill category-criminal">
                {termOfDay.category}
              </span>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Ref: {termOfDay.relatedLaws ? termOfDay.relatedLaws.split('/')[0] : 'Statute'}
              </span>
            </div>

            <button
              className="btn-primary"
              onClick={() => onSelectTerm(termOfDay)}
            >
              <span>Explore Full Breakdown</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      )}

      {/* Explore by Legal Categories */}
      <section style={{ marginBottom: '3rem' }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">
              <Layers size={22} color="#d4af37" />
              Explore by Legal Category
            </h2>
            <p className="section-subtitle">
              Browse legal terminologies organized across key practice domains
            </p>
          </div>
          <button className="btn-secondary" onClick={() => onNavigate('categories')}>
            View All Categories
          </button>
        </div>

        <div className="category-grid">
          {legalCategories.filter(c => c.id !== 'all').map((cat) => {
            const count = terms.filter(t => t.categoryId === cat.id).length;
            return (
              <div
                key={cat.id}
                className="category-card-item"
                onClick={() => {
                  onNavigate('dictionary', { category: cat.id });
                }}
              >
                <div className="category-icon-box">
                  {getCategoryIcon(cat.id)}
                </div>
                <div>
                  <div className="cat-item-name">{cat.name}</div>
                  <div className="cat-item-count">{count} Terms Available</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Popular Legal Terms */}
      <section style={{ marginBottom: '3rem' }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">
              <Flame size={22} color="#ef4444" />
              Most Frequently Searched Terms
            </h2>
            <p className="section-subtitle">
              High-frequency concepts frequently encountered in judicial exams & courtroom proceedings
            </p>
          </div>
          <button className="btn-secondary" onClick={() => onNavigate('dictionary')}>
            Browse Entire Dictionary
          </button>
        </div>

        <div className="terms-grid">
          {popularTerms.map((term) => (
            <TermCard
              key={term.id}
              term={term}
              onSelectTerm={onSelectTerm}
              isBookmarked={bookmarkedIds.includes(term.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      </section>

      {/* Interactive Learning Callout Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1c2541, #0b132b)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          color: '#ffffff',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          alignItems: 'center',
          border: '1px solid rgba(212, 175, 55, 0.25)'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#d4af37', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            <GraduationCap size={18} />
            <span>Interactive Learning Modes</span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Test Your Legal Acumen
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.96rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Master core principles with instant quizzes or compare confusing legal terms side-by-side to understand nuanced distinctions.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn-gold" onClick={() => onNavigate('quiz')}>
              <GraduationCap size={18} />
              <span>Take Legal Quiz</span>
            </button>
            <button
              className="btn-secondary"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}
              onClick={() => onNavigate('compare')}
            >
              <GitCompare size={18} />
              <span>Compare Terms</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
