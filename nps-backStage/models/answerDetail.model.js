const Sequelize = require('sequelize');
const sequelize = require('./_sequelize');
const config = require('../config/db.config');

// Company 数据模型
const AnswerDetail = {
  // 答案详情id
  answerDetailId: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  // 答案id
  answerId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  // 答案值
  value: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // 题号
  questionNo: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  // 所属问卷id
  questionnaireId: {
    type: Sequelize.INTEGER,
    allowNull: false
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

module.exports = sequelize.define(
  config.table.prefix + 'answer_detail',
  AnswerDetail
);
