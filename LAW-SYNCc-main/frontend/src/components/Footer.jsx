import { Scale, Heart, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <Scale size={24} color="#d4af37" />
            <h2 style={{ margin: 0 }}>LAW-SYNC</h2>
          </div>
          <p className="footer-desc">
            Empowering students, legal professionals, and curious minds by making complex statutory legal terms simple, clear, and actionable.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: '#10b981', fontSize: '0.85rem' }}>
            <ShieldCheck size={16} />
            <span>Verified Law Terminology Dataset</span>
          </div>
        </div>

        <div className="footer-col">
          <h3>Explore</h3>
          <ul className="footer-links">
            <li><button onClick={() => onNavigate('dictionary')}>All Legal Terms</button></li>
            <li><button onClick={() => onNavigate('categories')}>Law Categories</button></li>
            <li><button onClick={() => onNavigate('compare')}>Compare Concepts</button></li>
            <li><button onClick={() => onNavigate('quiz')}>Interactive Quiz</button></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Saved & Study</h3>
          <ul className="footer-links">
            <li><button onClick={() => onNavigate('bookmarks')}>My Bookmarks</button></li>
            <li><button onClick={() => onNavigate('history')}>Search History</button></li>
            <li><button onClick={() => onNavigate('dictionary')}>Criminal Law (CrPC/BNSS)</button></li>
            <li><button onClick={() => onNavigate('dictionary')}>Constitutional Rights</button></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Legal Notice</h3>
          <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
            LAW-SYNC is an educational tool. The information provided is for educational and informational purposes only and does not constitute formal legal advice.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          © {new Date().getFullYear()} LAW-SYNC Legal Dictionary. All rights reserved.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#cbd5e1' }}>
          <span>Created with</span>
          <Heart size={14} color="#ef4444" fill="#ef4444" />
          <span>for legal clarity</span>
        </div>
      </div>
    </footer>
  );
}
