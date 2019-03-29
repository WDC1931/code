const express = require('express');
const router = express.Router();
const sequelize = require('../../models/model').sequelize;

const utils = require('../../common/utils');
const log = require('../../middleware/log');

const QuestionnaireService = require('../../services/questionnaire/questionnaire.service');
const AnswerService = require('../../services/answer/answer.service');
const AnswerDetailService = require('../../services/answerDetail/answerDetail.service');

const AnswerDetailFormat = require('../../services/answerDetail/answerDetail.format');

// 参数校验
const validateParams = (req, res, next) => {
  utils.validateParams(req, res, next, [
    'questionnaireId',
    // 'location',
    'answerDetail'
  ]);
};

// 添加用户
const createAnswer = (req, res, next) => {
  // 获取接口参数
  const params = req.body;
  const questionnaireId = params.questionnaireId;
  const location = params.location;
  const answerDetail = params.answerDetail;

  sequelize.transaction(transaction => {
    //更新问卷访问量
    return QuestionnaireService.updateQuestionnaireSubNum({
      questionnaireId,
      transaction
    })
    //添加answer表
    .then(resDate => {
      let answerInfo = {
        questionnaireId,
        location,
        device: utils.getReqDevice({
          req
        }),
        ip: utils.getClientIp(req)
      };
      return AnswerService.createAnswer({
        answerInfo,
        transaction
      });
    })
    //添加answerDetail表
    .then(answer => {
      let answerDetailList = AnswerDetailFormat.AnswerDetailAddQuestionnaireIdAndAnswerId({
        questionnaireId,
        answerId: answer.answerId,
        answerDetail
      });
      return AnswerDetailService.createAnswerDetailList({
        answerDetailList,
        transaction
      });
    })
  }).then(resData => {
    res.locals.addResult = utils.dealSuccess(null, '提交答案成功');
    next();
  }).catch(err => {
    log.error(err);
    res.json(utils.dealFail(null, '添加答案失败'));
  })
}

router.post('/', validateParams, createAnswer, (req, res, next) => {
  res.json(res.locals.addResult);
});

module.exports = router;