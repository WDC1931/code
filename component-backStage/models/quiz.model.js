const Sequelize = require("sequelize");
const connection = require("../config/DBConfig");

var quizList = connection.define('quiz_lists', {
    fonts: {
      type: Sequelize.TEXT,
      notNull: false
    },
    class: {
      type: Sequelize.TEXT,
      notNull: false
    },
    title: {
      type: Sequelize.TEXT,
      notNull: true
    },
    home: {
      type: Sequelize.TEXT,
      notNull: true
    },
    behavior: {
      type: Sequelize.TEXT,
      notNull: true
    },
    finsh: {
      type: Sequelize.TEXT,
      notNull: false
    },
    analysis: {
      type: Sequelize.TEXT,
      notNull: true
    }
  });
  
  
  
  module.exports = quizList;
  