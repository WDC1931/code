const Sequelize = require('sequelize');
const sequelize = require('./_sequelize');
const config = require('../config/db.config');

// Option 数据模型
const Option = {
  // 选项id
  optionId: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  // 选项名
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  // 选项值
  value: {
    type: Sequelize.STRING,
    allowNull: true
  },
  // 对应问题id
  questionId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  // 跳转目标
  targetQuestion: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: -1
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

module.exports = sequelize.define(config.table.prefix + 'option', Option, {
  comment: '用于保存问题对应选项'
});
