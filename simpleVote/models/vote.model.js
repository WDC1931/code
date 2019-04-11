const Sequelize = require("sequelize");
const connection = require("../config/DBConfig");
const moment =require("moment");

var voteList = connection.define('vote_lists', {
  type: {
    type: Sequelize.INTEGER,
    notNull: true
  },
  deadline: {
    type: Sequelize.DATE,
    notNull: true,
    get() {
      return moment(this.getDataValue('deadline')).format('YYYY-MM-DD HH:mm:ss');
    }
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
