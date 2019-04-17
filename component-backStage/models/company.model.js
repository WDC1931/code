const Sequelize = require('sequelize');
const sequelize = require('./_sequelize');
const config = require('../config/db.config');

// Company 数据模型
const Company = {
    // 公司 ID
    companyId: {
        type: Sequelize.INTEGER,    // 数字整型
        autoIncrement: true,        // 自增
        unique: true,               // 唯一
        primaryKey: true            // 主键
    },
    // 公司名称
    companyName: {
        type: Sequelize.STRING,     // 字符串型
        allowNull: false            // 不能为空
    },
    // Logo 地址
    logoUrl: {
        type: Sequelize.STRING      // 字符串型
    },
    // 创建时间
    createdAt: {
        type: Sequelize.DATE        // 日期类型
    },
    // 更新时间
    updatedAt: {
        type: Sequelize.DATE
    }
};

module.exports = sequelize.define(config.table.prefix + 'company', Company);