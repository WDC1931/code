const Sequelize = require("sequelize");
var fs = require("fs");

const DBConfig = {
  database: "component",
  user: "member",
  password: "component@member001",
  host: "localhost",
  dialect: "mysql"
};

const connection = new Sequelize(
  DBConfig.database,
  DBConfig.user,
  DBConfig.password,
  {
    host: DBConfig.host,
    dialect: DBConfig.dialect,
    operatorsAliases: false,
    // 设置时区
    timezone: "+08:00",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

function delDir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
  }
}

/**
 * 打开重置数据库
 * 生产环境必须关闭
 */
// connection
//   .sync({ force: true })
//   .then(() => {
//     delDir("public/images/quiz"); //删除quiz目录下所有文件
//     delDir("public/images/vote"); //删除vote目录下所有文件
//     delDir("public/images/sport"); //删除vote目录下所有文件
//     console.log("数据库初始化成功");
//   })
//   .catch(err => {
//     console.log("数据库初始化失败");
//     console.log(err);
//   });

module.exports = connection;
