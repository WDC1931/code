const log = require('../middleware/log');
const Model = require('../models/model');

const AnswerDetailDAO = {
  // 添加一条答案
  saveAnswerDetailList({ answerDetailList, transaction }) {
    log.trace('AnswerDetailDAO-saveAnswerDetailList(), answerDetailList');
    log.trace(answerDetailList);

    return Model.answerDetail.bulkCreate(answerDetailList, {transaction});
  }
};

module.exports = AnswerDetailDAO;
