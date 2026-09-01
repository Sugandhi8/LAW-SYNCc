import React, { useState } from 'react';
import {
  Volume2,
  Bookmark,
  BookmarkCheck,
  Scale,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Tag,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Share2,
  GitCompare,
} from 'lucide-react';

export default function TermCard({
  term,
  onSelectTerm,
  onRelatedTermClick,
  onCompareWith,
  isBookmarked,
  onToggleBookmark,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  // Text to Speech
  const handleSpeak = (e) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) {
      alert('Text to speech is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${term.word}. ${term.simpleMeaning}`);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const shareText = `${term.word} - Legal Definition:\n${term.definition}\n\nSimple Meaning: ${term.simpleMeaning}\n(From LAW-SYNC Legal Dictionary)`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getCategoryClass = (category = '') => {
    const cat = category.toLowerCase();
    if (cat.includes('criminal')) return 'cat-criminal';
    if (cat.includes('constitutional')) return 'cat-constitutional';
    if (cat.includes('civil') || cat.includes('tort')) return 'cat-civil';
    if (cat.includes('corporate') || cat.includes('contract')) return 'cat-corporate';
    if (cat.includes('family')) return 'cat-family';
    if (cat.includes('cyber') || cat.includes('tech')) return 'cat-cyber';
    return 'cat-general';
  };

  return (
    <article className={`term-card ${getCategoryClass(term.category)}`}>
      {/* Card Header: Word, Pronunciation, Category Badge & Actions */}
      <div className="card-header">
        <div className="term-title-group">
          <div className="word-row">
            <h3 className="term-word" onClick={() => onSelectTerm(term)}>
              {term.word}
            </h3>
            {term.pronunciation && (
              <span className="term-pronunciation">{term.pronunciation}</span>
            )}
            <button
              type="button"
              className={`tts-button ${isSpeaking ? 'speaking' : ''}`}
              onClick={handleSpeak}
              title="Listen to pronunciation"
            >
              <Volume2 size={16} />
            </button>
          </div>

          <div className="term-badges">
            <span className="category-badge">
              <Scale size={13} className="badge-icon" />
              {term.category}
            </span>
            {term.isPopular && <span className="popular-badge">Popular</span>}
            {term.isTermOfDay && <span className="tod-badge">Term of the Day</span>}
          </div>
        </div>

        <div className="card-actions">
          <button
            type="button"
            className={`action-btn bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(term.id);
            }}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this term'}
          >
            {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>

          {onCompareWith && (
            <button
              type="button"
              className="action-btn compare-btn"
              onClick={(e) => {
                e.stopPropagation();
                onCompareWith(term);
              }}
              title="Compare with another term"
            >
              <GitCompare size={17} />
            </button>
          )}

          <button
            type="button"
            className="action-btn share-btn"
            onClick={handleShare}
            title={copied ? 'Copied to clipboard!' : 'Copy term & definition'}
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* 1. Simple Meaning (Plain-English summary) */}
      <div className="term-section simple-meaning-box">
        <div className="section-label-row">
          <Lightbulb size={16} className="label-icon meaning-icon" />
          <span className="section-label">Simple Meaning (Plain English)</span>
        </div>
        <p className="simple-meaning-text">{term.simpleMeaning}</p>
      </div>

      {/* 2. Full / Exact Legal Definition */}
      <div className="term-section definition-box">
        <div className="section-label-row">
          <BookOpen size={16} className="label-icon definition-icon" />
          <span className="section-label">Exact Legal Definition</span>
        </div>
        <p className="definition-text">{term.definition}</p>
      </div>

      {/* 3. Real-World Practical Example */}
      {term.example && (
        <div className="term-section example-box">
          <div className="section-label-row">
            <span className="example-tag">PRACTICAL EXAMPLE</span>
          </div>
          <p className="example-text">"{term.example}"</p>
        </div>
      )}

      {/* Collapsible details for Related Laws, Key Elements, and Related Terms */}
      <div className={`collapsible-content ${isExpanded ? 'expanded' : ''}`}>
        {/* 4. Related Laws */}
        {term.relatedLaws && (
          <div className="term-section laws-box">
            <div className="section-label-row">
              <Scale size={15} className="label-icon laws-icon" />
              <span className="section-label">Applicable Statutory Provisions & Laws</span>
            </div>
            <p className="laws-text">{term.relatedLaws}</p>
          </div>
        )}

        {/* 5. Key Elements */}
        {term.keyElements && Array.isArray(term.keyElements) && term.keyElements.length > 0 && (
          <div className="term-section key-elements-box">
            <div className="section-label-row">
              <CheckCircle2 size={15} className="label-icon elements-icon" />
              <span className="section-label">Essential Legal Elements</span>
            </div>
            <ul className="elements-list">
              {term.keyElements.map((el, idx) => (
                <li key={idx} className="element-item">
                  <CheckCircle2 size={14} className="check-bullet" />
                  <span>{el}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 6. Related Terms */}
        {term.relatedTerms && Array.isArray(term.relatedTerms) && term.relatedTerms.length > 0 && (
          <div className="term-section related-terms-box">
            <div className="section-label-row">
              <Tag size={15} className="label-icon tags-icon" />
              <span className="section-label">Related Legal Terms</span>
            </div>
            <div className="related-tags-wrap">
              {term.relatedTerms.map((relTerm, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="related-tag-chip"
                  onClick={() => onRelatedTermClick && onRelatedTermClick(relTerm)}
                  title={`Click to search '${relTerm}'`}
                >
                  {relTerm}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Expand/Collapse button and Details Trigger */}
      <div className="card-footer">
        <button
          type="button"
          className="toggle-expand-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <ChevronUp size={16} />
            </>
          ) : (
            <>
              <span>View Laws & Key Elements</span>
              <ChevronDown size={16} />
            </>
          )}
        </button>

        <button
          type="button"
          className="view-details-btn"
          onClick={() => onSelectTerm(term)}
        >
          <span>Full Analysis</span>
          <ExternalLink size={14} />
        </button>
      </div>
    </article>
  );
}
