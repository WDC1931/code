const Sequelize = require("sequelize");
const connection = require("../config/DBConfig");

var voteList = connection.define('vote_lists', {
  type: {
    type: Sequelize.INTEGER,
    notNull: true
  },
  deadline: {
    type: Sequelize.DATE(6),
    notNull: true
  },
  anonymity: {
    type: Sequelize.INTEGER,
    notNull: true
  },
  isLimit: {
    type: Sequelize.INTEGER,
    notNull: true
  },
  title: {
    type: Sequelize.STRING,
    notNull: true
  },
  detail: {
    type: Sequelize.STRING,
    notNull: false
  },
  optionsType: {
    type: Sequelize.INTEGER,
    notNull: true
  },
  options: {
    type: Sequelize.TEXT,
    notNull: true
  },
  totalNum: {
    type: Sequelize.INTEGER,
    notNull: true
  }
});



module.exports = voteList;
