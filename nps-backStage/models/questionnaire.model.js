const Sequelize = require('sequelize');
const sequelize = require('./_sequelize');
const config = require('../config/db.config');

// Questionnaire 数据模型
const Questionnaire = {
  // 问卷id
  questionnaireId: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  // 问卷标题
  title: {
    type: Sequelize.STRING,
    allowNull: true
  },
  // 问卷描述
  describe: {
    type: Sequelize.STRING,
    allowNull: true
  },
  // 发布人id
  userId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false
  },
  // 问卷状态： -1：关闭；0：未审核；1：审核通过；2：审核不通过
  status: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  // 访问量
  PV: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  // 提交量
  subNum: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  //关键字
  keyWord: {
    type: Sequelize.STRING,
    allowNull: true
  },
  //审核人id
  auditUserId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  //原因
  reason: {
    type: Sequelize.STRING,
    allowNull: true
  },
  //开始时间
  beginTime: {
    type: Sequelize.DATE,
    allowNull: true
  },
  //结束时间
  endTime: {
    type: Sequelize.DATE,
    allowNull: true
  },
  // 创建时间
  createdAt: {
    type: Sequelize.DATE // 日期类型
  },
  // 更新时间
  updatedAt: {
    type: Sequelize.DATE
  },
  // 品牌logo
  logo: {
    type: Sequelize.STRING,
    allowNull: true
  },
  // 限制 如 30/1 则每天填30次, 0则为无限制,默认：0/0
  limit: {
    type: Sequelize.STRING,
    defaultValue: '0/0'
  }
};

module.exports = sequelize.define(
  config.table.prefix + 'questionnaire',
  Questionnaire, {
    comment: '保存问卷基本信息'
  }
);