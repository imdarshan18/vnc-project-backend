const sequelize = require('sequelize');
const { Model, DataTypes, Sequelize } = require('sequelize');

module.exports = function(sequelize, Sequelize) {
  const Trees = sequelize.define("trees", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    treeName: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    longitude: {
      type: DataTypes.FLOAT
    },
    latitude: {
      type: DataTypes.FLOAT
    },
    created_at: {
      type: DataTypes.DATE
    }
  });

  return Trees;
}