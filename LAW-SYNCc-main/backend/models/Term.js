const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Term = sequelize.define(
  'Term',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    word: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: 'Please provide the legal term word' }
      }
    },
    pronunciation: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a category for the term' }
      }
    },
    categoryId: {
      type: DataTypes.STRING,
      defaultValue: function () {
        return this.category
          ? this.category.toLowerCase().replace(/[^a-z0-9]/g, '')
          : 'general';
      }
    },
    definition: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a formal legal definition' }
      }
    },
    simpleMeaning: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a simplified plain-English meaning' }
      }
    },
    example: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a practical example' }
      }
    },
    relatedLaws: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    relatedTerms: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    keyElements: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    isPopular: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isTermOfDay: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    tableName: 'terms',
    timestamps: true,
    indexes: [
      { fields: ['word'] },
      { fields: ['category'] },
      { fields: ['categoryId'] },
      { fields: ['isPopular'] },
      { fields: ['isTermOfDay'] }
    ]
  }
);

module.exports = Term;
