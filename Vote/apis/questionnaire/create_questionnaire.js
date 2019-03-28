const express = require('express');
const router = express.Router();
const sequelize = require('../../models/model').sequelize;

const utils = require('../../common/utils');
const log = require('../../middleware/log');

const QuestionnaireService = require('../../services/questionnaire/questionnaire.service');
const QuestionService = require('../../services/question/question.service');
const OptionService = require('../../services/option/option.service');

const QuestionFormat = require('../../services/question/question.format');
const OptionFormat = require('../../services/option/option.format');

// 参数校验
const validateParams = (req, res, next) => {
  utils.validateParams(req, res, next, ['title', 'questions', 'userId']);
};

// 添加用户
const createQuestionnaire = (req, res, next) => {
  // 获取接口参数
  const params = req.body;
  const title = params.title;
  const describe = params.describe || null;
  const questions = params.questions;
  const userId = parseInt(params.userId);

  const questionnaireInfo = {
    title,
    userId
  };

  // 可选参数
  describe && (questionnaireInfo.describe = describe);

  let questionnaireId = null;

  sequelize
    .transaction(transaction => {
      return QuestionnaireService.createQuestionnaire({
        questionnaireInfo,
        transaction
      })
        .then(ret => {
          questionnaireId = ret.questionnaireId;
          let questionList = QuestionFormat.QuestionAddQuestionnaireId({
            questionnaireId,
            questions: JSON.parse(questions)
          });
          return QuestionService.createQuestion({
            questionList,
            transaction
          });
        })
        .then(questionList => {
          let optionList = OptionFormat.OptionAddQuestion({
            questionList,
            questions: JSON.parse(questions)
          });
          return OptionService.createOption({ optionList, transaction });
        });
    })
    .then(() => {
      res.locals.addResult = utils.dealSuccess(
        { questionnaireId },
        '创建问卷成功'
      );
      next();
    })
    .catch(err => {
      log.error(err);
      res.json(utils.dealFail(null, '创建问卷失败'));
    });
};

router.post('/', validateParams, createQuestionnaire, (req, res, next) => {
  res.json(res.locals.addResult);
});

module.exports = router;