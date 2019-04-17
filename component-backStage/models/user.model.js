const Sequelize = require('sequelize');
const sequelize = require('./_sequelize');
const config = require('../config/db.config');

// User 数据模型
const User = {
    // 用户 ID
    userId: {
        type: Sequelize.INTEGER,    // 数字整型
        autoIncrement: true,        // 自增
        unique: true,               // 唯一
        primaryKey: true            // 主键
    },
    // 姓名
    userName: {
        type: Sequelize.STRING,     // 字符串型
        allowNull: false            // 不能为空
    },
    // 性别（1-男，2-女）
    sex: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    // 电子邮箱
    email: {
        type: Sequelize.STRING
    },
    // 公司 ID
    companyId: {
        type: Sequelize.INTEGER
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
module.exports = sequelize.define(config.table.prefix + 'user', User);