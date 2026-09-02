const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const TermComparison = sequelize.define(
  'TermComparison',
  {
    comparison_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    term1_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'terms',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    term2_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'terms',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    differences: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide the key differences between the terms' }
      }
    },
    similarities: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    tableName: 'term_comparisons',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['term1_id', 'term2_id']
      }
    ]
  }
);

module.exports = TermComparison;
