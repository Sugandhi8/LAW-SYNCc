import { useState } from 'react';
import { GitCompare, ArrowRightLeft, BookOpen, Lightbulb, Scale, ScrollText } from 'lucide-react';
import TextToSpeech from '../components/TextToSpeech';

export default function Compare({ terms, initialTerm1Id, initialTerm2Id }) {
  const [term1Id, setTerm1Id] = useState(initialTerm1Id || (terms[0] ? terms[0].id : '1'));
  const [term2Id, setTerm2Id] = useState(initialTerm2Id || (terms[4] ? terms[4].id : '5'));

  const term1 = terms.find(t => t.id === term1Id) || terms[0];
  const term2 = terms.find(t => t.id === term2Id) || terms[1];

  const presets = [
    { label: "Bail vs Anticipatory Bail", id1: "1", id2: "5" },
    { label: "Habeas Corpus vs Locus Standi", id1: "2", id2: "7" },
    { label: "Tort vs Mens Rea", id1: "4", id2: "6" },
    { label: "Indemnity vs Liquidated Damages", id1: "9", id2: "10" }
  ];

  const handleSwap = () => {
    const temp = term1Id;
    setTerm1Id(term2Id);
    setTerm2Id(temp);
  };

  return (
    <div className="compare-page-view">
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#d4af37', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          <GitCompare size={18} />
          <span>Comparative Jurisprudence Tool</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Compare Legal Terms
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Analyze subtle differences, definitions, and legal implications between two concepts side-by-side.
        </p>
      </div>

      {/* Preset Quick Pairs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
          Quick Comparisons:
        </span>
        {presets.map((p, idx) => (
          <button
            key={idx}
            type="button"
            className="filter-pill-btn"
            style={{
              background: term1Id === p.id1 && term2Id === p.id2 ? '#0b132b' : '#ffffff',
              color: term1Id === p.id1 && term2Id === p.id2 ? '#ffffff' : '#334155'
            }}
            onClick={() => {
              setTerm1Id(p.id1);
              setTerm2Id(p.id2);
            }}
          >
            ⚖️ {p.label}
          </button>
        ))}
      </div>

      {/* Selectors Grid */}
      <div className="compare-selectors-grid" style={{ marginBottom: '2.5rem' }}>
        <div className="selector-box">
          <label>Select First Term</label>
          <select
            className="select-input"
            value={term1Id}
            onChange={(e) => setTerm1Id(e.target.value)}
          >
            {terms.map((t) => (
              <option key={t.id} value={t.id}>
                {t.word} ({t.category})
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <div className="vs-badge">VS</div>
          <button
            type="button"
            className="search-btn-icon"
            title="Swap terms"
            onClick={handleSwap}
          >
            <ArrowRightLeft size={16} />
          </button>
        </div>

        <div className="selector-box">
          <label>Select Second Term</label>
          <select
            className="select-input"
            value={term2Id}
            onChange={(e) => setTerm2Id(e.target.value)}
          >
            {terms.map((t) => (
              <option key={t.id} value={t.id}>
                {t.word} ({t.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side by Side Comparison Cards */}
      {term1 && term2 && (
        <div className="comparison-results-grid">
          {/* Term 1 Column */}
          <div className="compare-column-card" style={{ borderTop: '4px solid #d4af37' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="category-pill category-criminal">{term1.category}</span>
                <TextToSpeech text={`${term1.word}. ${term1.simpleMeaning}`} label="" />
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {term1.word}
              </h2>
            </div>

            <div className="detail-section-block">
              <span className="detail-label">
                <Lightbulb size={16} color="#16a34a" />
                Simple Meaning
              </span>
              <div className="detail-content-simple">
                {term1.simpleMeaning}
              </div>
            </div>

            <div className="detail-section-block">
              <span className="detail-label">
                <BookOpen size={16} color="#2563eb" />
                Formal Definition
              </span>
              <div className="detail-content-formal">
                {term1.definition}
              </div>
            </div>

            {term1.example && (
              <div className="detail-section-block">
                <span className="detail-label">
                  <Scale size={16} color="#9333ea" />
                  Practical Example
                </span>
                <div className="detail-content-example">
                  "{term1.example}"
                </div>
              </div>
            )}

            {term1.relatedLaws && (
              <div className="detail-section-block">
                <span className="detail-label">
                  <ScrollText size={16} color="#d97706" />
                  Statutory Reference
                </span>
                <div className="detail-content-laws">
                  {term1.relatedLaws}
                </div>
              </div>
            )}
          </div>

          {/* Term 2 Column */}
          <div className="compare-column-card" style={{ borderTop: '4px solid #2563eb' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="category-pill category-civil">{term2.category}</span>
                <TextToSpeech text={`${term2.word}. ${term2.simpleMeaning}`} label="" />
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {term2.word}
              </h2>
            </div>

            <div className="detail-section-block">
              <span className="detail-label">
                <Lightbulb size={16} color="#16a34a" />
                Simple Meaning
              </span>
              <div className="detail-content-simple">
                {term2.simpleMeaning}
              </div>
            </div>

            <div className="detail-section-block">
              <span className="detail-label">
                <BookOpen size={16} color="#2563eb" />
                Formal Definition
              </span>
              <div className="detail-content-formal">
                {term2.definition}
              </div>
            </div>

            {term2.example && (
              <div className="detail-section-block">
                <span className="detail-label">
                  <Scale size={16} color="#9333ea" />
                  Practical Example
                </span>
                <div className="detail-content-example">
                  "{term2.example}"
                </div>
              </div>
            )}

            {term2.relatedLaws && (
              <div className="detail-section-block">
                <span className="detail-label">
                  <ScrollText size={16} color="#d97706" />
                  Statutory Reference
                </span>
                <div className="detail-content-laws">
                  {term2.relatedLaws}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
