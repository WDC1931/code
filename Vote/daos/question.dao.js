const log = require('../middleware/log');
const Model = require('../models/model');

const QuestionDAO = {
  // 添加一组问题
  saveQuestionList({ questionList, transaction }) {
    log.trace('QuestionDAO-saveQuestionList(), questionList');
    log.trace(questionList);

    return Model.question.bulkCreate(questionList, { transaction });
  },
  // 查询问题
  queryQuestionByQuestionnaireId({ questionnaireId, transaction }) {
    log.trace('QuestionDAO-queryQuestionByQuestionnaireId(), questionnaireId');
    log.trace(questionnaireId);

    return Model.question.findAll({
      where: {
        questionnaireId
      },
      raw: true,
      transaction
    });
  },
  // 删除问题
  deleteQuestionByQuestionnaireId({ questionnaireId, transaction }) {
    log.trace('QuestionDAO-deleteQuestionByQuestionnaireId(), questionnaireId');
    log.trace(questionnaireId);
    return Model.question.destroy({
      where: {
        questionnaireId
      },
      force: true,
      transaction
    });
  }
};

module.exports = QuestionDAO;
