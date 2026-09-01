import React, { useState } from 'react';
import {
  X,
  Volume2,
  Bookmark,
  BookmarkCheck,
  Scale,
  BookOpen,
  Lightbulb,
  CheckCircle2,
  Tag,
  Share2,
  Copy,
  Check,
  GitCompare,
} from 'lucide-react';

export default function TermModal({
  term,
  onClose,
  onRelatedTermClick,
  onCompareWith,
  isBookmarked,
  onToggleBookmark,
}) {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!term) return null;

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${term.word}. ${term.simpleMeaning}. ${term.definition}`);
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = () => {
    const text = `Word: ${term.word}\nCategory: ${term.category}\n\nSimple Meaning:\n${term.simpleMeaning}\n\nDefinition:\n${term.definition}\n\nExample:\n${term.example}\n\nRelated Laws:\n${term.relatedLaws}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-box">
            <div className="modal-word-row">
              <h2 className="modal-word">{term.word}</h2>
              {term.pronunciation && (
                <span className="modal-pronunciation">{term.pronunciation}</span>
              )}
              <button
                type="button"
                className={`tts-button ${isSpeaking ? 'speaking' : ''}`}
                onClick={handleSpeak}
                title="Pronounce this term"
              >
                <Volume2 size={18} />
              </button>
            </div>
            <div className="modal-badges">
              <span className="category-badge">
                <Scale size={14} /> {term.category}
              </span>
              {term.isPopular && <span className="popular-badge">Popular Term</span>}
              {term.isTermOfDay && <span className="tod-badge">Featured Term of the Day</span>}
            </div>
          </div>

          <div className="modal-header-actions">
            <button
              type="button"
              className={`action-btn ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={() => onToggleBookmark(term.id)}
              title={isBookmarked ? 'Bookmarked' : 'Add to bookmarks'}
            >
              {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
            </button>
            <button
              type="button"
              className="action-btn"
              onClick={handleCopy}
              title="Copy to clipboard"
            >
              {copied ? <Check size={20} className="text-success" /> : <Copy size={20} />}
            </button>
            {onCompareWith && (
              <button
                type="button"
                className="action-btn"
                onClick={() => {
                  onCompareWith(term);
                  onClose();
                }}
                title="Compare with another term"
              >
                <GitCompare size={20} />
              </button>
            )}
            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              title="Close modal (Esc)"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Simple Meaning */}
          <div className="modal-section simple-meaning-block">
            <div className="modal-section-title">
              <Lightbulb size={18} className="text-amber" />
              <span>Simple Meaning (Layman's Terms)</span>
            </div>
            <p className="modal-meaning-text">{term.simpleMeaning}</p>
          </div>

          {/* Legal Definition */}
          <div className="modal-section definition-block">
            <div className="modal-section-title">
              <BookOpen size={18} className="text-blue" />
              <span>Exact Statutory / Jurisprudential Definition</span>
            </div>
            <p className="modal-definition-text">{term.definition}</p>
          </div>

          {/* Practical Real World Example */}
          {term.example && (
            <div className="modal-section example-block">
              <div className="modal-section-title">
                <span className="example-indicator">REAL-WORLD APPLICATION</span>
              </div>
              <p className="modal-example-text">"{term.example}"</p>
            </div>
          )}

          {/* Applicable Laws */}
          {term.relatedLaws && (
            <div className="modal-section laws-block">
              <div className="modal-section-title">
                <Scale size={18} className="text-emerald" />
                <span>Statutory Sections & Landmark Precedents</span>
              </div>
              <p className="modal-laws-text">{term.relatedLaws}</p>
            </div>
          )}

          {/* Key Elements */}
          {term.keyElements && term.keyElements.length > 0 && (
            <div className="modal-section elements-block">
              <div className="modal-section-title">
                <CheckCircle2 size={18} className="text-purple" />
                <span>Essential Doctrinal Elements</span>
              </div>
              <ul className="modal-elements-list">
                {term.keyElements.map((el, i) => (
                  <li key={i} className="modal-element-item">
                    <CheckCircle2 size={16} className="element-check" />
                    <span>{el}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Terms */}
          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div className="modal-section related-block">
              <div className="modal-section-title">
                <Tag size={18} className="text-amber" />
                <span>Associated Legal Concepts</span>
              </div>
              <div className="modal-tags-grid">
                {term.relatedTerms.map((rt, i) => (
                  <button
                    key={i}
                    type="button"
                    className="modal-related-tag"
                    onClick={() => {
                      onRelatedTermClick(rt);
                      onClose();
                    }}
                  >
                    {rt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <span className="modal-footer-meta">
            Database ID: #{term.id} • Category ID: {term.categoryId || 'general'}
          </span>
          <button type="button" className="btn-primary" onClick={onClose}>
            Close Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
