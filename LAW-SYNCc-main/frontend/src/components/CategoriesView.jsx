import React from 'react';
import {
  Shield,
  FileText,
  Briefcase,
  Users,
  Cpu,
  Layers,
  ArrowRight,
  Landmark,
  Scale,
  ScrollText,
  Search,
  Handshake,
  AlertTriangle,
  Home,
  HeartHandshake,
  Building,
  Coins,
  ShoppingBag,
  HardHat,
  Lightbulb,
  CreditCard,
  Receipt,
  FileBadge,
  Leaf,
  Globe,
  FileSignature,
  Car,
  Key,
  TrendingDown,
  Tv,
  BookOpen
} from 'lucide-react';

const categoryMeta = {
  // 1. Constitutional Law
  constitutionallaw: {
    icon: Landmark,
    color: '#3b82f6',
    bg: 'rgba(59, 130, 246, 0.1)',
    desc: 'Fundamental rights, prerogative writs (Habeas Corpus, Mandamus), basic structure doctrine, and judicial review.',
  },
  // 2. Criminal Law
  criminallaw: {
    icon: Shield,
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.1)',
    desc: 'Substantive penal offences under Bharatiya Nyaya Sanhita (BNS), mens rea, culpable homicide, and criminal liabilities.',
  },
  // 3. Criminal Procedure
  criminalprocedure: {
    icon: Scale,
    color: '#f97316',
    bg: 'rgba(249, 115, 22, 0.1)',
    desc: 'Arrest procedures, FIR registration, bail mechanisms, remand, chargesheets, and trial proceedings under BNSS.',
  },
  // 4. Civil Law
  civillaw: {
    icon: ScrollText,
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.1)',
    desc: 'Substantive civil rights, specific relief remedies, adverse possession, mesne profits, and restitution jurisprudence.',
  },
  // 5. Civil Procedure
  civilprocedure: {
    icon: FileText,
    color: '#06b6d4',
    bg: 'rgba(6, 182, 212, 0.1)',
    desc: 'Code of Civil Procedure (CPC) litigation lifecycle, plaints, summons, caveats, temporary injunctions, and decree execution.',
  },
  // 6. Law of Evidence
  lawofevidence: {
    icon: Search,
    color: '#8b5cf6',
    bg: 'rgba(139, 92, 246, 0.1)',
    desc: 'Bharatiya Sakshya Adhiniyam (BSA), admissibility of electronic records, burden of proof, dying declarations, and estoppel.',
  },
  // 7. Contract Law
  contractlaw: {
    icon: Handshake,
    color: '#d97706',
    bg: 'rgba(217, 119, 6, 0.1)',
    desc: 'Offer, acceptance, force majeure, liquidated damages, indemnity clauses, novation, and contractual breach remedies.',
  },
  // 8. Tort Law
  tortlaw: {
    icon: AlertTriangle,
    color: '#e11d48',
    bg: 'rgba(225, 29, 72, 0.1)',
    desc: 'Civil wrongs, unliquidated damages, negligence, absolute liability (M.C. Mehta rule), strict liability, and nuisance.',
  },
  // 9. Property Law
  propertylaw: {
    icon: Home,
    color: '#059669',
    bg: 'rgba(5, 150, 105, 0.1)',
    desc: 'Transfer of Property Act, title deeds, mortgages, easements, doctrine of lis pendens, and part performance.',
  },
  // 10. Family Law
  familylaw: {
    icon: HeartHandshake,
    color: '#ec4899',
    bg: 'rgba(236, 72, 153, 0.1)',
    desc: 'Matrimonial disputes, mutual consent divorce, permanent alimony, Streedhan, coparcenary rights, and child custody.',
  },
  // 11. Company / Corporate Law
  companycorporatelaw: {
    icon: Building,
    color: '#6366f1',
    bg: 'rgba(99, 102, 241, 0.1)',
    desc: 'Companies Act, corporate veil lifting, ultra vires doctrine, oppression and mismanagement, and NCLT adjudication.',
  },
  // 12. Commercial Law
  commerciallaw: {
    icon: Coins,
    color: '#84cc16',
    bg: 'rgba(132, 204, 22, 0.1)',
    desc: 'Sale of Goods, caveat emptor, unpaid seller rights, letters of credit, and commercial court frameworks.',
  },
  // 13. Consumer Law
  consumerlaw: {
    icon: ShoppingBag,
    color: '#14b8a6',
    bg: 'rgba(20, 184, 166, 0.1)',
    desc: 'Consumer Protection Act (CPA 2019), product liability, unfair trade practices, deficiency in service, and CCPA powers.',
  },
  // 14. Labour and Employment Law
  labourandemploymentlaw: {
    icon: HardHat,
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.1)',
    desc: 'Industrial disputes, retrenchment, layoff compensation, gratuity rights, and POSH Act Internal Complaints Committees (ICC).',
  },
  // 15. Intellectual Property Law
  intellectualpropertylaw: {
    icon: Lightbulb,
    color: '#a855f7',
    bg: 'rgba(168, 85, 247, 0.1)',
    desc: 'Patents, trademarks, passing off actions, fair dealing exceptions, GI tags, trade secrets, and copyright jurisprudence.',
  },
  // 16. Cyber Law
  cyberlaw: {
    icon: Cpu,
    color: '#0284c7',
    bg: 'rgba(2, 132, 199, 0.1)',
    desc: 'Information Technology Act, DPDP Act 2023, data privacy rights, phishing frauds, and intermediary liability safe harbours.',
  },
  // 17. Banking and Financial Law
  bankingandfinanciallaw: {
    icon: CreditCard,
    color: '#0d9488',
    bg: 'rgba(13, 148, 136, 0.1)',
    desc: 'Cheque bounce (Sec. 138 NI Act), SARFAESI Act asset enforcement, NPAs, DRT tribunals, and banker liens.',
  },
  // 18. Tax Law
  taxlaw: {
    icon: Receipt,
    color: '#ca8a04',
    bg: 'rgba(202, 138, 4, 0.1)',
    desc: 'Income tax, GST framework, Input Tax Credit (ITC), TDS deductions, and tax evasion vs avoidance doctrines.',
  },
  // 19. Administrative Law
  administrativelaw: {
    icon: FileBadge,
    color: '#475569',
    bg: 'rgba(71, 85, 105, 0.1)',
    desc: 'Principles of Natural Justice (Audi Alteram Partem), delegated legislation, speaking orders, and proportionality.',
  },
  // 20. Environmental Law
  environmentallaw: {
    icon: Leaf,
    color: '#16a34a',
    bg: 'rgba(22, 163, 74, 0.1)',
    desc: 'Polluter Pays Principle, Precautionary Principle, Public Trust Doctrine, NGT jurisdiction, and EIA audits.',
  },
  // 21. Human Rights Law
  humanrightslaw: {
    icon: Globe,
    color: '#2563eb',
    bg: 'rgba(37, 99, 235, 0.1)',
    desc: 'Protection against custodial violence, D.K. Basu guidelines, free legal aid (Article 39A), and NHRC inquiry powers.',
  },
  // 22. Arbitration and Alternative Dispute Resolution
  arbitrationandalternativedisputeresolution: {
    icon: Scale,
    color: '#7c3aed',
    bg: 'rgba(124, 58, 237, 0.1)',
    desc: 'Arbitral awards enforcement, Section 34 setting aside, court mediation under Mediation Act 2023, and Lok Adalats.',
  },
  // 23. Court and Judicial Terms
  courtandjudicialterms: {
    icon: Landmark,
    color: '#b91c1c',
    bg: 'rgba(185, 28, 28, 0.1)',
    desc: 'Sub judice doctrine, Amicus Curiae, Suo Motu cognizance, Stare Decisis precedents, and Contempt of Court.',
  },
  // 24. Legal Documents and Proceedings
  legaldocumentsandproceedings: {
    icon: FileSignature,
    color: '#0891b2',
    bg: 'rgba(8, 145, 178, 0.1)',
    desc: 'Sworn affidavits, Vakalatnama authorization, statutory legal notices, Powers of Attorney, and plaints.',
  },
  // 25. Juvenile / Child Law
  juvenilechildlaw: {
    icon: Users,
    color: '#db2777',
    bg: 'rgba(219, 39, 119, 0.1)',
    desc: 'Juvenile Justice Act, Child in Conflict with Law (CCL), POCSO Act protections, JJB boards, and CWC committees.',
  },
  // 26. Motor Vehicle Law
  motorvehiclelaw: {
    icon: Car,
    color: '#ea580c',
    bg: 'rgba(234, 88, 12, 0.1)',
    desc: 'Motor Accident Claims Tribunal (MACT), third-party insurance, Good Samaritan immunity, and hit-and-run schemes.',
  },
  // 27. Real Estate Law
  realestatelaw: {
    icon: Key,
    color: '#65a30d',
    bg: 'rgba(101, 163, 13, 0.1)',
    desc: 'RERA Act 2016 regulations, standard carpet area definitions, occupation certificates (OC), and escrow accounts.',
  },
  // 28. Insolvency and Bankruptcy
  insolvencyandbankruptcy: {
    icon: TrendingDown,
    color: '#4338ca',
    bg: 'rgba(67, 56, 202, 0.1)',
    desc: 'Corporate Insolvency Resolution Process (CIRP), IBC moratoria, Committee of Creditors (CoC), and resolution professionals.',
  },
  // 29. Media and Information Law
  mediaandinformationlaw: {
    icon: Tv,
    color: '#0284c7',
    bg: 'rgba(2, 132, 199, 0.1)',
    desc: 'Right to Information (RTI Act), Public Information Officers (PIO), CIC commissions, and constitutional freedom of press.',
  },
  // 30. General Legal Terms
  generallegalterms: {
    icon: BookOpen,
    color: '#4f46e5',
    bg: 'rgba(79, 70, 229, 0.1)',
    desc: 'Universal legal maxims including Prima Facie, Bona Fide, Mala Fide, Ab Initio, Pro Bono Publico, and Mutatis Mutandis.',
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
