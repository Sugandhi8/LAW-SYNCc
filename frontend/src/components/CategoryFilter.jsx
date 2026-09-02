import React from 'react';
import {
  Layers,
  Shield,
  FileText,
  Briefcase,
  Users,
  Cpu,
  Gavel,
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
  BookOpen,
  Sparkles
} from 'lucide-react';

const categoryIcons = {
  all: Layers,
  // 1. Constitutional Law
  constitutionallaw: Landmark,
  'Constitutional Law': Landmark,
  // 2. Criminal Law
  criminallaw: Shield,
  'Criminal Law': Shield,
  // 3. Criminal Procedure
  criminalprocedure: Gavel,
  'Criminal Procedure': Gavel,
  // 4. Civil Law
  civillaw: ScrollText,
  'Civil Law': ScrollText,
  // 5. Civil Procedure
  civilprocedure: Scale,
  'Civil Procedure': Scale,
  // 6. Law of Evidence
  lawofevidence: Search,
  'Law of Evidence': Search,
  // 7. Contract Law
  contractlaw: Handshake,
  'Contract Law': Handshake,
  // 8. Tort Law
  tortlaw: AlertTriangle,
  'Tort Law': AlertTriangle,
  // 9. Property Law
  propertylaw: Home,
  'Property Law': Home,
  // 10. Family Law
  familylaw: HeartHandshake,
  'Family Law': HeartHandshake,
  // 11. Company / Corporate Law
  companycorporatelaw: Building,
  'Company / Corporate Law': Building,
  // 12. Commercial Law
  commerciallaw: Coins,
  'Commercial Law': Coins,
  // 13. Consumer Law
  consumerlaw: ShoppingBag,
  'Consumer Law': ShoppingBag,
  // 14. Labour and Employment Law
  labourandemploymentlaw: HardHat,
  'Labour and Employment Law': HardHat,
  // 15. Intellectual Property Law
  intellectualpropertylaw: Lightbulb,
  'Intellectual Property Law': Lightbulb,
  // 16. Cyber Law
  cyberlaw: Cpu,
  'Cyber Law': Cpu,
  // 17. Banking and Financial Law
  bankingandfinanciallaw: CreditCard,
  'Banking and Financial Law': CreditCard,
  // 18. Tax Law
  taxlaw: Receipt,
  'Tax Law': Receipt,
  // 19. Administrative Law
  administrativelaw: FileBadge,
  'Administrative Law': FileBadge,
  // 20. Environmental Law
  environmentallaw: Leaf,
  'Environmental Law': Leaf,
  // 21. Human Rights Law
  humanrightslaw: Globe,
  'Human Rights Law': Globe,
  // 22. Arbitration and Alternative Dispute Resolution
  arbitrationandalternativedisputeresolution: Scale,
  'Arbitration and Alternative Dispute Resolution': Scale,
  // 23. Court and Judicial Terms
  courtandjudicialterms: Gavel,
  'Court and Judicial Terms': Gavel,
  // 24. Legal Documents and Proceedings
  legaldocumentsandproceedings: FileSignature,
  'Legal Documents and Proceedings': FileSignature,
  // 25. Juvenile / Child Law
  juvenilechildlaw: Users,
  'Juvenile / Child Law': Users,
  // 26. Motor Vehicle Law
  motorvehiclelaw: Car,
  'Motor Vehicle Law': Car,
  // 27. Real Estate Law
  realestatelaw: Key,
  'Real Estate Law': Key,
  // 28. Insolvency and Bankruptcy
  insolvencyandbankruptcy: TrendingDown,
  'Insolvency and Bankruptcy': TrendingDown,
  // 29. Media and Information Law
  mediaandinformationlaw: Tv,
  'Media and Information Law': Tv,
  // 30. General Legal Terms
  generallegalterms: BookOpen,
  'General Legal Terms': BookOpen,
};

export default function CategoryFilter({
  categories = [],
  selectedCategory,
  onSelectCategory,
  activeFilterCount,
}) {
  return (
    <div className="category-filter-container">
      <div className="category-filter-header">
        <span className="filter-title">Filter by Legal Domain</span>
        {selectedCategory !== 'all' && (
          <button
            type="button"
            className="reset-filter-btn"
            onClick={() => onSelectCategory('all')}
          >
            Reset to All
          </button>
        )}
      </div>

      <div className="category-chips-list">
        {categories.map((cat) => {
          const isSelected =
            selectedCategory === cat.id ||
            selectedCategory === cat.name ||
            (selectedCategory === 'all' && cat.id === 'all');

          const IconComponent = categoryIcons[cat.id] || categoryIcons[cat.name] || Layers;

          return (
            <button
              key={cat.id || cat.name}
              type="button"
              className={`category-chip ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectCategory(cat.id || cat.name)}
            >
              <IconComponent size={15} className="chip-icon" />
              <span className="chip-name">{cat.name}</span>
              {typeof cat.count !== 'undefined' && (
                <span className="chip-count">{cat.count}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
