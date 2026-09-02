import React, { useState, useEffect } from 'react';
import { Sparkles, Volume2, Bookmark, BookmarkCheck, ArrowRight, Scale, BookOpen, Lightbulb, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export default function TermOfTheDay({
  onSelectTerm,
  onRelatedTermClick,
  isBookmarked,
  onToggleBookmark,
}) {
  const [term, setTerm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadTermOfDay() {
      try {
        setLoading(true);
        const res = await api.getTermOfTheDay();
        if (isMounted && res.success && res.data) {
          setTerm(res.data);
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadTermOfDay();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSpeak = () => {
    if (!term || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${term.word}. ${term.simpleMeaning}`);
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  if (loading) {
    return (
      <div className="tod-card skeleton-tod">
        <div className="tod-header-shimmer"></div>
        <div className="tod-body-shimmer"></div>
      </div>
    );
  }

  if (error || !term) {
    return null; // Gracefully hide if not available
  }

  const bookmarked = typeof isBookmarked === 'function' ? isBookmarked(term.id) : Boolean(isBookmarked);

  return (
    <section className="tod-container">
      <div className="tod-card">
        <div className="tod-badge-header">
          <div className="tod-pill">
            <Sparkles size={16} className="tod-sparkle-icon" />
            <span>FEATURED LEGAL TERM OF THE DAY</span>
          </div>
          <div className="tod-actions">
            <button
              type="button"
              className={`tod-action-btn ${isSpeaking ? 'speaking' : ''}`}
              onClick={handleSpeak}
              title="Pronounce this term"
            >
              <Volume2 size={18} />
            </button>
            <button
              type="button"
              className={`tod-action-btn ${bookmarked ? 'bookmarked' : ''}`}
              onClick={() => onToggleBookmark(term.id)}
              title="Bookmark Term of the Day"
            >
              {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            </button>
          </div>
        </div>

        <div className="tod-main">
          <div className="tod-word-group">
            <h2 className="tod-word">{term.word}</h2>
            {term.pronunciation && (
              <span className="tod-pronunciation">{term.pronunciation}</span>
            )}
            <span className="tod-category">{term.category}</span>
          </div>

          <div className="tod-meaning-box">
            <div className="tod-meaning-label">
              <Lightbulb size={16} /> Plain-English Summary:
            </div>
            <p className="tod-meaning-text">{term.simpleMeaning}</p>
          </div>

          <div className="tod-def-box">
            <div className="tod-def-label">
              <BookOpen size={16} /> Formal Statutory Definition:
            </div>
            <p className="tod-def-text">{term.definition}</p>
          </div>

          {term.example && (
            <div className="tod-example-box">
              <span className="tod-example-tag">EXAMPLE</span>
              <p className="tod-example-text">"{term.example}"</p>
            </div>
          )}

          {term.keyElements && term.keyElements.length > 0 && (
            <div className="tod-elements-box">
              <span className="tod-elements-label">Key Legal Principles:</span>
              <div className="tod-elements-chips">
                {term.keyElements.map((el, i) => (
                  <span key={i} className="tod-element-chip">
                    <CheckCircle2 size={13} /> {el}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="tod-footer">
          {term.relatedLaws && (
            <div className="tod-laws">
              <Scale size={14} /> <span>{term.relatedLaws}</span>
            </div>
          )}
          <button
            type="button"
            className="tod-explore-btn"
            onClick={() => onSelectTerm(term)}
          >
            <span>Full Legal Analysis</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
