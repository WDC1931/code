const Sequelize = require('sequelize');
const sequelize = require('./_sequelize');
const config = require('../config/db.config');

// Question 数据模型
const Question = {
  // 问题id
  questionId: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  // 问题题目
  questionTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // 题目备注
  questionDesc: {
    type: Sequelize.STRING,
    allowNull: true
  },
  // 是否必答 0：否；1：是
  necessary: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  // 题号
  questionNo: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  // 题目类型 0：单选；1：多选；2：填空；3：量表;
  type: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  // 所属问卷id
  questionnaireId: {
    type: Sequelize.INTEGER.UNSIGNED,
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

module.exports = sequelize.define(config.table.prefix + 'question', Question, {
  comment: '保存题目数据'
});
