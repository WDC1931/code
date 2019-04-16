const Sequelize = require("sequelize");
const sequelizeConfig = require("../config/sequelize.config");
const fs = require("fs");

const path = require("path");
const logger = require("../config/log4js.config").getLogger();

const sequelize = new Sequelize(sequelizeConfig);
const basename = path.basename(__filename);

let db = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// sequelize.sync().then(
//   () => {
//     logger.debug('sequelize 初始化完成');
//   }
// ).catch(err => {
//   logger.error('sequelize 初始化失败');
//   logger.error(err);
// })

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// require('../controllers/answerActivity/init-question')(db);

module.exports = db;
