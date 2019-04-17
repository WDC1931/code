const log = require('../middleware/log');
const Model = require('../models/model');

const UserDAO = {

  // 添加一个用户
  saveUserInfo(userInfo) {

    log.trace('UserDAO-createUserInfo(), userInfo');
    log.trace(userInfo);

    return Model.user.create(userInfo);
  },

  // 查询用户详情
  queryUserInfoByUserId(userId) {

    log.trace('UserDAO-queryUserInfoByUserId(), userId');
    log.trace(userId);

    return Model.user.findOne({
      where: {
        userId: userId
      }
    });
  },


  // 查询小黄条详情(含负责人，参与人，知会人信息)
  // queryStripInfo(stripId) {
  //   return Model.strip.findOne({
  //     attributes: ['stripId', 'stripName', 'stripIntroduce', 'stripStrartTime'],
  //     // 关联查询
  //     include: [
  //       // 关联查询该小黄条的负责人信息
  //       {
  //         attributes: ['userId', 'userName', 'userTel', 'userEmail'],
  //         model: Model.user,
  //         as: 'principalInfo'
  //       },
  //       // 关联查询该小黄条的参与人信息
  //       {
  //         attributes: ['userId', 'userName', 'userTel', 'userEmail'],
  //         model: Model.user,
  //         as: 'participantInfo'
  //       },
  //       // 关联查询该小黄条的知会人信息
  //       {
  //         attributes: ['userId', 'userName', 'userTel', 'userEmail'],
  //         model: Model.user,
  //         as: 'informedInfo'
  //       }
  //     ],
  //     where: {
  //       stripId: stripId
  //     }
  //   });
  // },


  // 查询用户详情(含公司信息)
  queryUserInfoIncludeCompany(userId) {

    log.trace('UserDAO-queryUserInfoWithCompany(), userId');
    log.trace(userId);

    return Model.user.findOne({
      attributes: ['userId', 'userName', 'sex', 'email'],
      include: [{
        attributes: ['companyId', 'companyName', 'logoUrl'],
        model: Model.company,
        as: 'companyInfo'
      }],
      where: {
        userId: userId
      }
    });
  },

  // 查询用户列表
  queryUserList(pageSize, pageNum) {
    return Model.user.findAndCountAll({
      order: [
        ['createdAt', 'DESC']
      ],
      attributes: ['userId', 'userName', 'sex', 'email'],
      limit: pageSize,
      offset: (pageNum - 1) * pageSize
    });
  },

  // 查询用户列表（含公司）
  queryUserListInlcudeCompany(pageSize, pageNum) {
    return Model.user.findAndCountAll({
      order: [
        ['createdAt', 'DESC']
      ],
      attributes: ['userId', 'userName', 'sex', 'email'],
      include: [{
        attributes: ['companyId', 'companyName', 'logoUrl'],
        model: Model.company,
        as: 'companyInfo'
      }],
      limit: pageSize,
      offset: (pageNum - 1) * pageSize
    });
  },


  // 更新用户信息
  updateUserInfo(userId, updateData) {

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

}

module.exports = UserDAO;
