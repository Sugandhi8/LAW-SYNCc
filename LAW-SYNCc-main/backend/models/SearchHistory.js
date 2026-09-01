const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const SearchHistory = sequelize.define(
  'SearchHistory',
  {
    search_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    search_query: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a search query' }
      }
    },
    search_method: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: 'Text'
    },
    language: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: 'en'
    },
    searched_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'search_history',
    timestamps: false,
    indexes: [
      { fields: ['user_id', 'searched_at'] },
      { fields: ['search_query'] }
    ]
  }
);

module.exports = SearchHistory;
