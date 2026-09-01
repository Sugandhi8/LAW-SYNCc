import React, { useState, useEffect } from 'react';
import { GitCompare, ArrowRightLeft, Scale, BookOpen, Lightbulb, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export default function CompareView({ allTerms = [], initialTerm1 = '', initialTerm2 = '' }) {
  const [term1Word, setTerm1Word] = useState(initialTerm1 || (allTerms[0]?.word || 'Bail'));
  const [term2Word, setTerm2Word] = useState(initialTerm2 || (allTerms[4]?.word || 'Anticipatory Bail'));
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (allTerms.length >= 2 && !term1Word && !term2Word) {
      setTerm1Word(allTerms[0].word);
      setTerm2Word(allTerms[4]?.word || allTerms[1].word);
    }
  }, [allTerms]);

  const handleCompare = async () => {
    if (!term1Word || !term2Word) return;
    if (term1Word === term2Word) {
      setError('Please select two different terms to compare.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await api.compareTerms(term1Word, term2Word);
      if (res.success && res.data) {
        setComparisonData(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to compare terms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (term1Word && term2Word && term1Word !== term2Word) {
      handleCompare();
    }
  }, [term1Word, term2Word]);

  const handleSwap = () => {
    const temp = term1Word;
    setTerm1Word(term2Word);
    setTerm2Word(temp);
  };

  return (
    <div className="compare-view-page">
      <div className="section-intro">
        <h2 className="section-heading">Side-by-Side Legal Comparison</h2>
        <p className="section-subheading">
          Analyze nuances, jurisdictional distinctions, and statutory differences between closely related legal doctrines.
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="compare-selectors-card">
        <div className="compare-select-col">
          <label className="compare-label">First Legal Term:</label>
          <select
            className="compare-select"
            value={term1Word}
            onChange={(e) => setTerm1Word(e.target.value)}
          >
            {allTerms.map((t) => (
              <option key={t.id} value={t.word}>
                {t.word} ({t.category})
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="compare-swap-btn"
          onClick={handleSwap}
          title="Swap Terms"
        >
          <ArrowRightLeft size={20} />
        </button>

        <div className="compare-select-col">
          <label className="compare-label">Second Legal Term:</label>
          <select
            className="compare-select"
            value={term2Word}
            onChange={(e) => setTerm2Word(e.target.value)}
          >
            {allTerms.map((t) => (
              <option key={t.id} value={t.word}>
                {t.word} ({t.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="compare-error-banner">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="compare-loading">
          <div className="searching-spinner">Analyzing terms in PostgreSQL backend...</div>
        </div>
      )}

      {/* Comparison Grid */}
      {comparisonData && !loading && (
        <div className="comparison-grid">
          {/* Term 1 Column */}
          <div className="comparison-card">
            <div className="comp-card-header">
              <span className="comp-badge">Term A</span>
              <h3 className="comp-word">{comparisonData.term1.word}</h3>
              <span className="comp-category">{comparisonData.term1.category}</span>
            </div>

            <div className="comp-section">
              <h4 className="comp-sec-title">
                <Lightbulb size={15} /> Simple Meaning
              </h4>
              <p className="comp-text highlight-box">{comparisonData.term1.simpleMeaning}</p>
            </div>

            <div className="comp-section">
              <h4 className="comp-sec-title">
                <BookOpen size={15} /> Formal Definition
              </h4>
              <p className="comp-text">{comparisonData.term1.definition}</p>
            </div>

            <div className="comp-section">
              <h4 className="comp-sec-title">
                <Scale size={15} /> Related Laws
              </h4>
              <p className="comp-text law-tag-box">{comparisonData.term1.relatedLaws}</p>
            </div>

            {comparisonData.term1.example && (
              <div className="comp-section">
                <h4 className="comp-sec-title">Real Example</h4>
                <p className="comp-text italic-example">"{comparisonData.term1.example}"</p>
              </div>
            )}

            {comparisonData.term1.keyElements && (
              <div className="comp-section">
                <h4 className="comp-sec-title">
                  <CheckCircle2 size={15} /> Key Elements
                </h4>
                <ul className="comp-list">
                  {comparisonData.term1.keyElements.map((el, i) => (
                    <li key={i}>{el}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Term 2 Column */}
          <div className="comparison-card">
            <div className="comp-card-header">
              <span className="comp-badge comp-badge-alt">Term B</span>
              <h3 className="comp-word">{comparisonData.term2.word}</h3>
              <span className="comp-category">{comparisonData.term2.category}</span>
            </div>

            <div className="comp-section">
              <h4 className="comp-sec-title">
                <Lightbulb size={15} /> Simple Meaning
              </h4>
              <p className="comp-text highlight-box">{comparisonData.term2.simpleMeaning}</p>
            </div>

            <div className="comp-section">
              <h4 className="comp-sec-title">
                <BookOpen size={15} /> Formal Definition
              </h4>
              <p className="comp-text">{comparisonData.term2.definition}</p>
            </div>

            <div className="comp-section">
              <h4 className="comp-sec-title">
                <Scale size={15} /> Related Laws
              </h4>
              <p className="comp-text law-tag-box">{comparisonData.term2.relatedLaws}</p>
            </div>

            {comparisonData.term2.example && (
              <div className="comp-section">
                <h4 className="comp-sec-title">Real Example</h4>
                <p className="comp-text italic-example">"{comparisonData.term2.example}"</p>
              </div>
            )}

            {comparisonData.term2.keyElements && (
              <div className="comp-section">
                <h4 className="comp-sec-title">
                  <CheckCircle2 size={15} /> Key Elements
                </h4>
                <ul className="comp-list">
                  {comparisonData.term2.keyElements.map((el, i) => (
                    <li key={i}>{el}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
