const Sequelize = require('sequelize');
const config = require('../config/db.config');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 30000
    },
    define: {
      timestamps: true
    },
    timezone: '+08:00',
    logging: function(executed) {
      console.log(executed);
    }
  }
);

module.exports = sequelize;
