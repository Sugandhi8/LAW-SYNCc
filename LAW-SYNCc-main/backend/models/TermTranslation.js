const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const TermTranslation = sequelize.define(
  'TermTranslation',
  {
    translation_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
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
    language: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a language code or name' }
      }
    },
    translated_term: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide the translated term' }
      }
    },
    translated_meaning: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide the translated meaning' }
      }
    }
  },
  {
    tableName: 'term_translations',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['term_id', 'language']
      }
    ]
  }
);

module.exports = TermTranslation;
