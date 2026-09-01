const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const LegalScenario = sequelize.define(
  'LegalScenario',
  {
    scenario_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    scenario_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a scenario title' }
      }
    },
    scenario_description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a scenario description' }
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'category_id'
      },
      onDelete: 'SET NULL'
    }
  },
  {
    tableName: 'legal_scenarios',
    timestamps: true,
    indexes: [
      { fields: ['category_id'] }
    ]
  }
);

module.exports = LegalScenario;
