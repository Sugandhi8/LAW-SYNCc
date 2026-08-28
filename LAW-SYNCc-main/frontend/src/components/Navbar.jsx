import { useState } from 'react';
import { 
  Scale, 
  BookOpen, 
  Layers, 
  Bookmark, 
  History, 
  GitCompare, 
  GraduationCap, 
  Home, 
  Menu, 
  X 
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, bookmarkCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dictionary', label: 'Dictionary', icon: BookOpen },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'compare', label: 'Compare', icon: GitCompare },
    { id: 'quiz', label: 'Quiz', icon: GraduationCap },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, badge: bookmarkCount },
    { id: 'history', label: 'History', icon: History }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="brand-logo" onClick={() => handleNavClick('home')}>
          <div className="brand-icon-wrapper">
            <Scale size={22} />
          </div>
          <div className="brand-text">
            <h1>LAW-SYNC</h1>
            <span>Legal Dictionary</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav>
          <ul className="nav-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    className={`nav-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                    {Boolean(item.badge && item.badge > 0) && (
                      <span className="nav-badge">{item.badge}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: '#0b132b',
          borderTop: '1px solid rgba(212, 175, 55, 0.2)',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: isActive ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                  border: '1px solid',
                  borderColor: isActive ? 'rgba(212, 175, 55, 0.4)' : 'transparent',
                  borderRadius: 'var(--radius-md)',
                  color: isActive ? '#ffffff' : '#cbd5e1',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
                onClick={() => handleNavClick(item.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {Boolean(item.badge && item.badge > 0) && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
