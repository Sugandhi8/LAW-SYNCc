import { useEffect, useState } from 'react';
import { 
  X, 
  Bookmark, 
  BookOpen, 
  Lightbulb, 
  Scale, 
  ScrollText, 
  Check, 
  Copy, 
  GitCompare, 
  ListChecks 
} from 'lucide-react';
import TextToSpeech from './TextToSpeech';

export default function TermDetailsModal({
  term,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onSelectRelatedTerm,
  onCompareTerm
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!term) return null;

  const handleCopy = () => {
    const textToCopy = `${term.word} (${term.category})\n\nSimple Meaning: ${term.simpleMeaning}\n\nLegal Definition: ${term.definition}\n\nRelated Laws: ${term.relatedLaws}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-top">
            <span
              style={{
                background: 'rgba(212, 175, 55, 0.2)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                color: '#fef08a',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)'
              }}
            >
              {term.category}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                className={`action-icon-btn ${isBookmarked ? 'bookmarked' : ''}`}
                style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                onClick={() => onToggleBookmark(term.id)}
                title={isBookmarked ? "Remove bookmark" : "Save bookmark"}
              >
                <Bookmark size={20} fill={isBookmarked ? "#eab308" : "none"} color={isBookmarked ? "#eab308" : "#ffffff"} />
              </button>
              <button className="modal-close-btn" onClick={onClose} title="Close modal">
                <X size={20} />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h2 className="modal-word-title">{term.word}</h2>
            {term.pronunciation && (
              <span className="pronunciation-tag" style={{ color: '#cbd5e1' }}>
                {term.pronunciation}
              </span>
            )}
          </div>

          <div style={{ marginTop: '1rem' }}>
            <TextToSpeech
              text={`${term.word}. Simple explanation: ${term.simpleMeaning}. Legal definition: ${term.definition}`}
              label="Listen Full Pronunciation & Meaning"
              className="speech-btn"
            />
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Simple Meaning */}
          <div className="detail-section-block">
            <span className="detail-label">
              <Lightbulb size={16} color="#16a34a" />
              Simple Meaning (Layman Explanation)
            </span>
            <div className="detail-content-simple">
              {term.simpleMeaning}
            </div>
          </div>

          {/* Formal Legal Definition */}
          <div className="detail-section-block">
            <span className="detail-label">
              <BookOpen size={16} color="#2563eb" />
              Formal Legal Definition
            </span>
            <div className="detail-content-formal">
              {term.definition}
            </div>
          </div>

          {/* Practical Real-World Example */}
          {term.example && (
            <div className="detail-section-block">
              <span className="detail-label">
                <Scale size={16} color="#9333ea" />
                Practical Real-World Example
              </span>
              <div className="detail-content-example">
                "{term.example}"
              </div>
            </div>
          )}

          {/* Related Statutory Laws / Sections */}
          {term.relatedLaws && (
            <div className="detail-section-block">
              <span className="detail-label">
                <ScrollText size={16} color="#d97706" />
                Applicable Statutory Provisions & Sections
              </span>
              <div className="detail-content-laws">
                🏛️ {term.relatedLaws}
              </div>
            </div>
          )}

          {/* Key Elements */}
          {term.keyElements && term.keyElements.length > 0 && (
            <div className="detail-section-block">
              <span className="detail-label">
                <ListChecks size={16} color="#0f172a" />
                Core Legal Elements
              </span>
              <ul className="key-elements-list">
                {term.keyElements.map((el, index) => (
                  <li key={index}>{el}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Terms */}
          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div className="detail-section-block">
              <span className="detail-label">
                Related Legal Terms & Concepts
              </span>
              <div className="related-terms-tags">
                {term.relatedTerms.map((relatedWord, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="related-tag-btn"
                    onClick={() => {
                      if (onSelectRelatedTerm) onSelectRelatedTerm(relatedWord);
                    }}
                  >
                    🔍 {relatedWord}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="modal-footer">
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn-secondary" onClick={handleCopy}>
              {copied ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
              <span>{copied ? "Copied to Clipboard!" : "Copy Summary"}</span>
            </button>
            {onCompareTerm && (
              <button
                className="btn-secondary"
                onClick={() => {
                  onCompareTerm(term);
                  onClose();
                }}
              >
                <GitCompare size={16} />
                <span>Compare Term</span>
              </button>
            )}
          </div>

          <button className="btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
