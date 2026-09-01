import React from 'react';
import { Shield, FileText, Briefcase, Users, Cpu, Layers, ArrowRight } from 'lucide-react';

const categoryMeta = {
  criminal: {
    icon: Shield,
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.1)',
    desc: 'Offences against the state, CrPC/BNSS criminal procedural laws, bail, police powers, and penal codes.',
  },
  constitutional: {
    icon: FileText,
    color: '#3b82f6',
    bg: 'rgba(59, 130, 246, 0.1)',
    desc: 'Fundamental rights, prerogative writs (Habeas Corpus), judicial review, and constitutional supremacy.',
  },
  civil: {
    icon: FileText,
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.1)',
    desc: 'Civil procedure code (CPC), affidavits, injunctions, torts, damages, negligence, and property dispute resolution.',
  },
  corporate: {
    icon: Briefcase,
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.1)',
    desc: 'Contract law, liquidated damages, indemnity, commercial transactions, warranties, and force majeure doctrines.',
  },
  family: {
    icon: Users,
    color: '#ec4899',
    bg: 'rgba(236, 72, 153, 0.1)',
    desc: 'Matrimonial disputes, maintenance, alimony, guardianship (Guardian Ad Litem), and child custody jurisprudence.',
  },
  cyber: {
    icon: Cpu,
    color: '#8b5cf6',
    bg: 'rgba(139, 92, 246, 0.1)',
    desc: 'Information Technology Act, data privacy, cyber fraud, phishing, electronic evidence, and AI governance.',
  },
};

export default function CategoriesView({ categories = [], onSelectCategory }) {
  const filteredCategories = categories.filter((c) => c.id !== 'all');

  return (
    <div className="categories-view-page">
      <div className="section-intro">
        <h2 className="section-heading">Legal Categories & Branches</h2>
        <p className="section-subheading">
          Explore codified legal doctrines organized across major areas of Indian and International Jurisprudence.
        </p>
      </div>

      <div className="categories-grid">
        {filteredCategories.map((cat) => {
          const meta = categoryMeta[cat.id] || {
            icon: Layers,
            color: '#3b82f6',
            bg: 'rgba(59, 130, 246, 0.1)',
            desc: 'Codified statutory provisions, case law precedents, and specialized legal terminology.',
          };
          const Icon = meta.icon;

          return (
            <div key={cat.id || cat.name} className="category-card">
              <div className="cat-card-header">
                <div
                  className="cat-card-icon-wrap"
                  style={{ color: meta.color, backgroundColor: meta.bg }}
                >
                  <Icon size={26} />
                </div>
                <span className="cat-count-badge">{cat.count} Terms</span>
              </div>

              <h3 className="cat-card-title">{cat.name}</h3>
              <p className="cat-card-desc">{meta.desc}</p>

              <button
                type="button"
                className="cat-card-btn"
                onClick={() => onSelectCategory(cat.id || cat.name)}
              >
                <span>Browse {cat.count} Terms</span>
                <ArrowRight size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
