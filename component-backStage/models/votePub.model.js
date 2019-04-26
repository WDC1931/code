const Sequelize = require("sequelize");
const connection = require("../config/DBConfig");
const moment =require("moment");

var voteList = connection.define('vote_lists', {
  type: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  deadline: {
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('deadline')).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  anonymity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  isLimit: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  detail: {
    type: Sequelize.STRING,
    allowNull: true
  },
  optionsType: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  options: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  totalNum: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});



module.exports = voteList;
