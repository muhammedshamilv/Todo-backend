const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./index');
const user = require('./user');

const Note = sequelize.define(
  'Note',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: user,
        key: 'id',
      },
    },
  },
  {
    tableName: 'notes',
    timestamps: true,
  }
);

Note.belongsTo(user, {
  as: 'user',
  foreignKey: 'user_id',
  onDelete: 'cascade',
});

module.exports = Note;
