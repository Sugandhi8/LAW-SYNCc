import { useState } from 'react';
import { 
  Layers, 
  ShieldAlert, 
  Landmark, 
  FileText, 
  Briefcase, 
  HeartHandshake, 
  Lock, 
  Scale, 
  ArrowRight 
} from 'lucide-react';
import TermCard from '../components/TermCard';
import { legalCategories } from '../data/legalTerms';

export default function Categories({
  terms,
  onSelectTerm,
  bookmarkedIds,
  onToggleBookmark
}) {
  const [activeCategory, setActiveCategory] = useState('criminal');

  const categoryDetails = {
    criminal: {
      title: "Criminal Law",
      description: "Statutes and procedural rules relating to offenses against the state, public safety, bail, warrants, and punishments.",
      badge: "CrPC / BNSS & IPC / BNS",
      icon: ShieldAlert,
      color: "#dc2626"
    },
    constitutional: {
      title: "Constitutional Law",
      description: "Fundamental rights, judicial review, constitutional writs (Article 32 & 226), and governance doctrines.",
      badge: "Constitution of India",
      icon: Landmark,
      color: "#d97706"
    },
    civil: {
      title: "Civil & Tort Law",
      description: "Private civil rights, negligence, remedies, affidavits, injunctions, damages, and civil dispute resolution.",
      badge: "CPC & Law of Torts",
      icon: FileText,
      color: "#2563eb"
    },
    corporate: {
      title: "Corporate & Contract Law",
      description: "Commercial agreements, indemnity, force majeure, liquidated damages, compliance, and corporate transactions.",
      badge: "Indian Contract Act & Companies Act",
      icon: Briefcase,
      color: "#4f46e5"
    },
    family: {
      title: "Family & Personal Law",
      description: "Marriage, judicial separation, alimony, child custody, guardianship, and succession rights.",
      badge: "Personal & Family Statutes",
      icon: HeartHandshake,
      color: "#db2777"
    },
    cyber: {
      title: "Cyber Law & Tech",
      description: "Electronic evidence, identity theft, data privacy, DPDP regulations, and cyber offenses under the IT Act.",
      badge: "IT Act 2000 & DPDP 2023",
      icon: Lock,
      color: "#0284c7"
    }
  };

  const selectedCatInfo = categoryDetails[activeCategory] || categoryDetails.criminal;
  const filteredTerms = terms.filter(t => t.categoryId === activeCategory);

  return (
    <div className="categories-page-view">
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#d4af37', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          <Layers size={18} />
          <span>Domain Classifications</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Legal Categories
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Explore key terminology organized systematically by specialized domains of law.
        </p>
      </div>

      {/* Category Selection Grid */}
      <div className="category-grid" style={{ marginBottom: '2.5rem' }}>
        {Object.entries(categoryDetails).map(([key, cat]) => {
          const Icon = cat.icon;
          const isActive = activeCategory === key;
          const count = terms.filter(t => t.categoryId === key).length;

          return (
            <div
              key={key}
              className={`category-card-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveCategory(key)}
            >
              <div className="category-icon-box">
                <Icon size={24} color={isActive ? "#d4af37" : cat.color} />
              </div>
              <div>
                <div className="cat-item-name">{cat.title}</div>
                <div className="cat-item-count">{count} Terms</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Category Header Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0b132b, #1c2541)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          color: '#ffffff',
          marginBottom: '2rem',
          border: '1px solid rgba(212, 175, 55, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span
            style={{
              background: 'rgba(212, 175, 55, 0.2)',
              color: '#fef08a',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-full)'
            }}
          >
            {selectedCatInfo.badge}
          </span>
          <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
            {filteredTerms.length} Terms in this domain
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          {selectedCatInfo.title}
        </h2>
        <p style={{ color: '#cbd5e1', fontSize: '0.98rem', maxWidth: '680px', lineHeight: 1.6 }}>
          {selectedCatInfo.description}
        </p>
      </div>

      {/* Category Terms */}
      <div className="terms-grid">
        {filteredTerms.map((term) => (
          <TermCard
            key={term.id}
            term={term}
            onSelectTerm={onSelectTerm}
            isBookmarked={bookmarkedIds.includes(term.id)}
            onToggleBookmark={onToggleBookmark}
          />
        ))}
      </div>
    </div>
  );
}
