const log = require('../middleware/log');
const Model = require('../models/model');

const UserDAO = {
  // 添加一个用户
  saveUserInfo({ userInfo }) {
    log.trace('UserDAO-createUserInfo(), userInfo');
    log.trace(userInfo);

    return Model.user.create(userInfo);
  },

  // 查询用户详情
  queryUserInfoByUserId({ userId }) {
    log.trace('UserDAO-queryUserInfoByUserId(), userId');
    log.trace(userId);

    return Model.user.findOne({
      where: {
        userId
      }
    });
  },

  // 查询用户列表
  queryUserList({ page, size }) {
    return Model.user.findAndCountAll({
      order: [['createdAt', 'DESC']],
      attributes: ['userId', 'userName', 'sex', 'email'],
      limit: size,
      offset: (page - 1) * size
    });
  },

  // 更新用户信息
  updateUserInfo({ userId, updateData }) {
    log.trace('UserDAO-updateUserInfo(), userId');
    log.trace(userId);
    log.trace('UserDAO-updateUserInfo(), updateData');
    log.trace(updateData);

    return Model.user.update(updateData, {
      where: {
        userId: userId
      }
    });
  }
};

module.exports = UserDAO;
