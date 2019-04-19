const Sequelize = require("sequelize");
const connection = require("../config/DBConfig");
const moment =require("moment");

var voteList = connection.define('vote_lists', {
  type: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  deadline: {
    type: Sequelize.DATE,
    allowNull: true,
    get() {
      return moment(this.getDataValue('deadline')).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  anonymity: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  isLimit: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true
  },
  detail: {
    type: Sequelize.STRING,
    allowNull: false
  },
  optionsType: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  options: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  totalNum: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});



module.exports = voteList;
