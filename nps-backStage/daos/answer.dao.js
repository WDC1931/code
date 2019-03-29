const log = require('../middleware/log');
const Model = require('../models/model');
const sequelize = require('sequelize');

const AnswerDAO = {
  // 添加一条答案
  saveAnswerInfo({ answerInfo, transaction }) {
    log.trace('AnswerDAO-saveAnswerInfo(), answerInfo');
    log.trace(answerInfo);

    return Model.answer.create(answerInfo, { transaction });
  },
  // 分组统计
  statisticGroup({ type= 'device',transaction, questionnaireId }) {
    log.trace('AnswerDAO-statisticGroup()');

    return Model.answer.findAll({
      where: {
        questionnaireId
      },
      attributes: [type,[sequelize.fn('COUNT', sequelize.col(type)), 'amount']],
      group: type
    })
  },
  // count
  countAll({ transaction, questionnaireId }) {
    log.trace('AnswerDAO-countAll()');

    return Model.answer.count({where: {
      questionnaireId
    }})
  }
};

module.exports = AnswerDAO;
