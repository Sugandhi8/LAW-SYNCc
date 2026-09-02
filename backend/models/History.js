const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const History = sequelize.define(
  'History',
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
    },
    searchedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'histories',
    timestamps: false,
    indexes: [
      { fields: ['userId', 'searchedAt'] }
    ]
  }
);

module.exports = History;
