const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Bookmark = sequelize.define(
  'Bookmark',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    termId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'terms',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  },
  {
    tableName: 'bookmarks',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'termId']
      }
    ]
  }
);

module.exports = Bookmark;
