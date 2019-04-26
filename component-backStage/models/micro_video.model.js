const Sequelize = require("sequelize");
const connection = require("../config/DBConfig");

var videoList = connection.define("videodatas", {
  videoId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  logo: {
    type: Sequelize.STRING,
    allowNull: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true
  },
  video: {
    type: Sequelize.STRING,
    allowNull: true
  },
  text: {
    type: Sequelize.STRING,
    allowNull: true
  },
  other: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = videoList;
