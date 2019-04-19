const Sequelize = require("sequelize");
const connection = require("../config/DBConfig");

var sportList = connection.define("sport_lists", {
  activity: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  graph: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  assistance: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  award: {
    type: Sequelize.TEXT,
    allowNull: true
  }
});

module.exports = sportList;
