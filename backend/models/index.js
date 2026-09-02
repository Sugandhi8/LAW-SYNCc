// Existing Core Models
const User = require('./User');
const Term = require('./Term');
const Bookmark = require('./Bookmark');
const History = require('./History');
const Quiz = require('./Quiz');

// New Requested Models
const Category = require('./Category');
const TermTranslation = require('./TermTranslation');
const RelatedTerm = require('./RelatedTerm');
const TermComparison = require('./TermComparison');
const LegalSource = require('./LegalSource');
const LegalScenario = require('./LegalScenario');
const ScenarioTerm = require('./ScenarioTerm');
const SearchHistory = require('./SearchHistory');

// ==========================================
// 1. Existing Relationships (Preserved)
// ==========================================

// User <-> Bookmark (1:M)
User.hasMany(Bookmark, { foreignKey: 'userId', as: 'bookmarks', onDelete: 'CASCADE' });
Bookmark.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Term <-> Bookmark (1:M)
Term.hasMany(Bookmark, { foreignKey: 'termId', as: 'bookmarks', onDelete: 'CASCADE' });
Bookmark.belongsTo(Term, { foreignKey: 'termId', as: 'term' });

// User <-> History (1:M)
User.hasMany(History, { foreignKey: 'userId', as: 'histories', onDelete: 'CASCADE' });
History.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Term <-> History (1:M)
Term.hasMany(History, { foreignKey: 'termId', as: 'histories', onDelete: 'CASCADE' });
History.belongsTo(Term, { foreignKey: 'termId', as: 'term' });

// ==========================================
// 2. New Relationships
// ==========================================

// Category <-> LegalScenario (1:M)
Category.hasMany(LegalScenario, { foreignKey: 'category_id', as: 'scenarios', onDelete: 'SET NULL' });
LegalScenario.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// Term <-> TermTranslation (1:M)
Term.hasMany(TermTranslation, { foreignKey: 'term_id', as: 'translations', onDelete: 'CASCADE' });
TermTranslation.belongsTo(Term, { foreignKey: 'term_id', as: 'term' });

// Term <-> RelatedTerm (Self-referential 1:M / M:N)
Term.hasMany(RelatedTerm, { foreignKey: 'term_id', as: 'relatedTermsList', onDelete: 'CASCADE' });
RelatedTerm.belongsTo(Term, { foreignKey: 'term_id', as: 'sourceTerm' });
RelatedTerm.belongsTo(Term, { foreignKey: 'related_term_id', as: 'relatedTerm' });

// Term <-> TermComparison (Self-referential 1:M)
Term.hasMany(TermComparison, { foreignKey: 'term1_id', as: 'comparisonsAsTerm1', onDelete: 'CASCADE' });
Term.hasMany(TermComparison, { foreignKey: 'term2_id', as: 'comparisonsAsTerm2', onDelete: 'CASCADE' });
TermComparison.belongsTo(Term, { foreignKey: 'term1_id', as: 'firstTerm' });
TermComparison.belongsTo(Term, { foreignKey: 'term2_id', as: 'secondTerm' });

// Term <-> LegalSource (1:M)
Term.hasMany(LegalSource, { foreignKey: 'term_id', as: 'sources', onDelete: 'CASCADE' });
LegalSource.belongsTo(Term, { foreignKey: 'term_id', as: 'term' });

// LegalScenario <-> ScenarioTerm <-> Term (M:N)
LegalScenario.hasMany(ScenarioTerm, { foreignKey: 'scenario_id', as: 'scenarioTerms', onDelete: 'CASCADE' });
ScenarioTerm.belongsTo(LegalScenario, { foreignKey: 'scenario_id', as: 'scenario' });

Term.hasMany(ScenarioTerm, { foreignKey: 'term_id', as: 'scenarioLinks', onDelete: 'CASCADE' });
ScenarioTerm.belongsTo(Term, { foreignKey: 'term_id', as: 'term' });

LegalScenario.belongsToMany(Term, {
  through: ScenarioTerm,
  foreignKey: 'scenario_id',
  otherKey: 'term_id',
  as: 'terms'
});
Term.belongsToMany(LegalScenario, {
  through: ScenarioTerm,
  foreignKey: 'term_id',
  otherKey: 'scenario_id',
  as: 'scenarios'
});

// User <-> SearchHistory (1:M)
User.hasMany(SearchHistory, { foreignKey: 'user_id', as: 'searchHistory', onDelete: 'CASCADE' });
SearchHistory.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = {
  // Existing Models
  User,
  Term,
  Bookmark,
  History,
  Quiz,

  // New Models
  Category,
  TermTranslation,
  RelatedTerm,
  TermComparison,
  LegalSource,
  LegalScenario,
  ScenarioTerm,
  SearchHistory
};
