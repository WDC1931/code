const Sequelize = require('sequelize');
const sequelize = require('./_sequelize');
const config = require('../config/db.config');

// User 数据模型
const User = {
  // 用户id
  userId: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  // 用户名
  userName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  // 手机号
  userMobile: {
    type: Sequelize.STRING,
    allowNull: true
  },
  // 是否有审核权
  audit: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  // 创建时间
  createdAt: {
    type: Sequelize.DATE // 日期类型
  },
  // 更新时间
  updatedAt: {
    type: Sequelize.DATE
  }
};
module.exports = sequelize.define(config.table.prefix + 'user', User, {
  comment: '用于用户信息'
});
