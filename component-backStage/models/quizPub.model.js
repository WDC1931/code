const Sequelize = require("sequelize");
const connection = require("../config/DBConfig");

var quizList = connection.define("quiz_lists", {
  fonts: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  class: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  title: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  home: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  behavior: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  finsh: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  analysis: {
    type: Sequelize.TEXT,
    allowNull: true
  }
});

module.exports = quizList;
