import React from 'react';
import {
  Scale,
  BookOpen,
  Sparkles,
  GitCompare,
  HelpCircle,
  Layers,
  AlertCircle,
  LogOut,
  User
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  backendStatus,
  termCount,
  currentUser,
  onLogout,
}) {
  const navItems = [
    { id: 'dictionary', label: 'Legal Dictionary', icon: BookOpen },
    { id: 'termofday', label: 'Term of the Day', icon: Sparkles },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'compare', label: 'Compare Terms', icon: GitCompare },
    { id: 'quiz', label: 'Legal Quiz', icon: HelpCircle },
  ];

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        {/* Brand / Logo */}
        <div className="navbar-brand" onClick={() => setActiveTab('dictionary')} role="button" tabIndex={0}>
          <div className="brand-icon-wrapper">
            <Scale className="brand-icon" size={26} />
          </div>
          <div className="brand-text">
            <div className="brand-title">
              LAW<span className="brand-accent">-SYNC</span>
            </div>
            <div className="brand-subtitle">Smart Legal Dictionary</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="navbar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon size={17} className="nav-icon" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Status / DB Connection Badge & User Controls */}
        <div className="navbar-right-actions">
          {backendStatus.online ? (
            <div className="status-badge status-online" title="Connected to PostgreSQL Database">
              <span className="status-dot"></span>
              <span className="status-label">PostgreSQL</span>
              <span className="status-count">{termCount} Terms</span>
            </div>
          ) : (
            <div className="status-badge status-offline" title={backendStatus.error || 'Backend unreachable'}>
              <AlertCircle size={14} />
              <span className="status-label">Connecting...</span>
            </div>
          )}

          {/* User Profile & Logout */}
          {currentUser && (
            <div className="user-profile-controls">
              <div className="user-avatar-badge" title={currentUser.email}>
                <User size={15} />
                <span className="user-display-name">{currentUser.name || currentUser.email}</span>
              </div>
              <button
                type="button"
                className="logout-action-btn"
                onClick={onLogout}
                title="Sign Out"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

