const Sequelize = require('sequelize');
const sequelize = require('./_sequelize');
const config = require('../config/db.config');

// Company 数据模型
const Answer = {
  // 答案id
  answerId: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  // 提交ip
  ip: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // 问卷id
  questionnaireId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  // 设备
  device: {
    type: Sequelize.STRING,
    allowNull: true
  },
  // 区域位置
  location: {
    type: Sequelize.STRING,
    allowNull: true
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

module.exports = sequelize.define(config.table.prefix + 'answer', Answer, {
  comment: '用于保存用户提交答案'
});
