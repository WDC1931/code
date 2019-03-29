const express = require('express');
const router = express.Router();

const utils = require('../../common/utils');
const log = require('../../middleware/log');

const QuestionnaireService = require('../../services/questionnaire/questionnaire.service');
const QuestionService = require('../../services/question/question.service');
const OptionService = require('../../services/option/option.service');

const QuestionFormat = require('../../services/question/question.format');

// 参数校验
const validateParams = (req, res, next) => {
  utils.validateParams(req, res, next, ['questionnaireId']);
};

// 添加用户
const queryQuestionnaireDetail = (req, res, next) => {
  // 获取接口参数
  const params = req.query;
  const questionnaireId = params.questionnaireId;

  let questionnaireDetail = {};
  let questionList = [];
  QuestionnaireService.questionnaireDetail({ questionnaireId })
    .then(ret => {
      if(ret) {
        questionnaireDetail = ret;
        return QuestionService.questionList({
          questionnaireId: ret.questionnaireId
        });
      } else {
        return Promise.reject({
          ret: 0,
          data: null
        })
      }
    })
    .then(questions => {
      questionList = questions;
      let questionIdList = QuestionFormat.ExtractQuestionIdList({
        questionList: questions
      });
      return OptionService.optionList({ questionIdList });
    })
    .then(optionList => {
      return QuestionFormat.QuestionMatchOption({
        questionList,
        optionList
      });
    })
    .then(ret => {
      let data = Object.assign(
        JSON.parse(JSON.stringify(questionnaireDetail)),
        { questions: ret }
      );
      res.locals.addResult = utils.dealSuccess({ data }, '查询问卷成功');
      next();
    })
    .catch(err => {
      log.error(err);
      if(err.ret === 0) {
        res.json(utils.dealSuccess({ data: err.data }, '查询问卷成功'))
      } else {
        res.json(utils.dealFail(null, '查询问卷失败'));
      }
    });
};

router.get('/', validateParams, queryQuestionnaireDetail, (req, res, next) => {
  res.json(res.locals.addResult);
});

module.exports = router;
