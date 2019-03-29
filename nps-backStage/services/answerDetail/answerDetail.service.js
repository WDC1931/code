const utils = require('../../common/utils');
const log = require('../../middleware/log');
const DAO = require('../../daos/dao');

const AnswerDetailService = {
  /**
   * @description 创建一组答案详情
   * @param {Array} answerDetailList - 答案信息
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  createAnswerDetailList({ answerDetailList, transaction }) {
    return DAO.answerDetail.saveAnswerDetailList({ answerDetailList, transaction });
  }
};

module.exports = AnswerDetailService;
