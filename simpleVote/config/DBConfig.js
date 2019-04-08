const Sequelize = require('sequelize');

const DBConfig = {
    database: 'votes',
    user: 'voter',
    password: 'voter123',
    host: 'localhost',
    dialect: 'mysql', 
};

const connection = new Sequelize(DBConfig.database, DBConfig.user, DBConfig.password, {
    host: DBConfig.host,
    dialect: DBConfig.dialect,
    operatorsAliases: false,
    // 设置时区
    timezone: '+08:00',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    
});

// 连接测试
// connection
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });


module.exports = connection;
