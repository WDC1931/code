const Sequelize = require("sequelize");
const connection = require("../config/DBConfig");

var quizList = connection.define("quiz_lists", {
  fonts: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  class: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  title: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  intro: {
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
    allowNull: true
  },
  analysis: {
    type: Sequelize.TEXT,
    allowNull: true
  }
});

module.exports = quizList;
