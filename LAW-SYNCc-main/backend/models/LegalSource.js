const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const LegalSource = sequelize.define(
  'LegalSource',
  {
    source_id: {
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
    source_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a source title' }
      }
    },
    act_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    section_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    source_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: {
          msg: 'Please provide a valid URL for source_url',
          args: true
        }
      }
    }
  },
  {
    tableName: 'legal_sources',
    timestamps: true,
    indexes: [
      { fields: ['term_id'] }
    ]
  }
);

module.exports = LegalSource;
