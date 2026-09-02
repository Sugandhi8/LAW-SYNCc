const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const RelatedTerm = sequelize.define(
  'RelatedTerm',
  {
    relation_id: {
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
    related_term_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'terms',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    relationship_type: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: 'Related'
    }
  },
  {
    tableName: 'related_terms',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['term_id', 'related_term_id']
      }
    ]
  }
);

module.exports = RelatedTerm;
