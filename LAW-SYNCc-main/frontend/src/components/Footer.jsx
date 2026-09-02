import React from 'react';
import { Scale, Database, Server, Code, ShieldCheck } from 'lucide-react';

export default function Footer({ totalTerms = 18, totalCategories = 6 }) {
  return (
    <footer className="app-footer">
      <div className="footer-top">
        <div className="footer-brand-col">
          <div className="footer-logo">
            <Scale size={22} className="text-gold" />
            <span>LAW-SYNC</span>
          </div>
          <p className="footer-tagline">
            Codified Legal Dictionary & Comparative Jurisprudence System powered by PostgreSQL 18 & Express REST API.
          </p>
        </div>

        <div className="footer-stats-col">
          <div className="stat-item">
            <span className="stat-number">{totalTerms}</span>
            <span className="stat-desc">Legal Terms Seeded</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{totalCategories}</span>
            <span className="stat-desc">Legal Domains</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-desc">Statutory Citations</span>
          </div>
        </div>

        <div className="footer-stack-col">
          <span className="stack-heading">Architecture</span>
          <div className="stack-badges">
            <span className="stack-tag">
              <Database size={13} /> PostgreSQL 18
            </span>
            <span className="stack-tag">
              <Server size={13} /> Express REST
            </span>
            <span className="stack-tag">
              <Code size={13} /> React 19 + Vite
            </span>
            <span className="stack-tag">
              <ShieldCheck size={13} /> JWT & Sequelize
            </span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 LAW-SYNC Legal Dictionary. Designed for legal practitioners, advocates, and law scholars.</p>
      </div>
    </footer>
  );
}
