const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ScenarioTerm = sequelize.define(
  'ScenarioTerm',
  {
    scenario_term_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    scenario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'legal_scenarios',
        key: 'scenario_id'
      },
      onDelete: 'CASCADE'
    },
    term_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'terms',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    relevance: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: 'Primary'
    }
  },
  {
    tableName: 'scenario_terms',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['scenario_id', 'term_id']
      }
    ]
  }
);

module.exports = ScenarioTerm;
