const Sequelize = require("sequelize");
const connection = require("../config/DBConfig");

var sportList = connection.define("sport_lists", {
  home: {
    type: Sequelize.TEXT,
    notNull: false
  },
  user: {
    type: Sequelize.TEXT,
    notNull: false
  },
  ranking: {
    type: Sequelize.TEXT,
    notNull: false
  }
});

module.exports = sportList;
