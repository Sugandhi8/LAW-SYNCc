import { Bookmark, ArrowRight, ShieldAlert, Landmark, FileText, Briefcase, HeartHandshake, Lock, Scale } from 'lucide-react';
import TextToSpeech from './TextToSpeech';

export default function TermCard({
  term,
  onSelectTerm,
  isBookmarked,
  onToggleBookmark
}) {
  const getCategoryClass = (categoryId) => {
    switch (categoryId) {
      case 'criminal': return 'category-criminal';
      case 'constitutional': return 'category-constitutional';
      case 'civil': return 'category-civil';
      case 'corporate': return 'category-corporate';
      case 'family': return 'category-family';
      case 'cyber': return 'category-cyber';
      default: return 'category-civil';
    }
  };

  const getCategoryIcon = (categoryId) => {
    switch (categoryId) {
      case 'criminal': return <ShieldAlert size={12} />;
      case 'constitutional': return <Landmark size={12} />;
      case 'civil': return <FileText size={12} />;
      case 'corporate': return <Briefcase size={12} />;
      case 'family': return <HeartHandshake size={12} />;
      case 'cyber': return <Lock size={12} />;
      default: return <Scale size={12} />;
    }
  };

  return (
    <div className="term-card" onClick={() => onSelectTerm(term)}>
      <div className="term-card-top">
        <div className="term-card-meta">
          <span className={`category-pill ${getCategoryClass(term.categoryId)}`}>
            {getCategoryIcon(term.categoryId)}
            {term.category}
          </span>

          <div className="card-actions-quick" onClick={(e) => e.stopPropagation()}>
            <TextToSpeech text={`${term.word}. ${term.simpleMeaning}`} label="" />
            <button
              type="button"
              className={`action-icon-btn ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(term.id);
              }}
              title={isBookmarked ? "Remove from bookmarks" : "Save bookmark"}
            >
              <Bookmark size={18} fill={isBookmarked ? "#eab308" : "none"} />
            </button>
          </div>
        </div>

        <h3 className="term-card-word">{term.word}</h3>
        <p className="term-card-simple">{term.simpleMeaning}</p>
      </div>

      <div className="term-card-bottom">
        <span className="term-related-tag">
          {term.relatedLaws ? term.relatedLaws.split('/')[0] : 'Legal Principle'}
        </span>
        <div className="view-details-link">
          <span>Explore</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
}
