const utils = require('../../common/utils');
const log = require('../../middleware/log');
const DAO = require('../../daos/dao');

// UserService
const UserService = {
  
  /**
   * @description 添加用户
   * @param {Object} userInfo - 用户信息
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  addUser(userInfo) {
    return DAO.user.saveUserInfo(userInfo);
  },
  
  /**
   * 查询用户信息
   * @param {Int} userId - 用户 ID
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  detailUser(userId) {
    return DAO.user.queryUserInfoByUserId(userId);
  },

  /**
   * 查询用户信息(包含公司)
   * @param {Int} userId - 用户 ID
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  detailUserIncludeCompany(userId) {
    return DAO.user.queryUserInfoIncludeCompany(userId);
  },
  
  /**
   * 查询用户列表
   * @param {Int} pageSize - 分页大小
   * @param {Int} pageNum - 分页页码
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  listUsers(pageSize, pageNum) {
    return DAO.user.queryUserList(pageSize, pageNum);
  },

  /**
   * 查询用户列表(含公司)
   * @param {Int} pageSize - 分页大小
   * @param {Int} pageNum - 分页页码
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  listUsersIncludeCompany(pageSize, pageNum) {
    return DAO.user.queryUserListInlcudeCompany(pageSize, pageNum);
  },
  
  /**
   * 更新用户信息
   * @param {Int} userId - 用户 ID
   * @param {Object} updateData - 更新的用户信息
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  updateUser(userId, updateData) {
    return DAO.user.updateUserInfo(userId, updateData);
  }
}

module.exports = UserService;
