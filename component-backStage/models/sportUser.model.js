const Sequelize = require("sequelize");
const connection = require("../config/DBConfig");

var sportUser = connection.define("sport_users", {
  openId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  avatarUrl: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  step: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  energy: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  exchange: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  correlation: {
    type: Sequelize.TEXT,
    allowNull: true,
    defaultValue: ''
  }
});

module.exports = sportUser;
