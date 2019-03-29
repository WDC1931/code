const express = require('express');
const router = express.Router();
const sequelize = require('../../models/model').sequelize;

const utils = require('../../common/utils');
const log = require('../../middleware/log');

const AnswerService = require('../../services/answer/answer.service');

// 参数校验
const validateParams = (req, res, next) => {
  const valid = req.app.valid.setResult();
  valid.paramsMustHave(req.body, ['questionnaireId']).getResult();
  if(valid.result) {
    next()
  } else {
    log.error(valid)
    res.json(utils.dealFail(null, valid.err));
  }
};

const pandect = (req, res, next) => {
  const questionnaireId = req.body.questionnaireId;
  sequelize.transaction(transaction => {
    return AnswerService.pandect({ questionnaireId, transaction}).then(ret => {
      return ret
    })
  }).then(resData => {
    res.locals.addResult = utils.dealSuccess(resData, '总览统计成功');
    next();
  }).catch(err => {
    log.error(err);
    res.json(utils.dealFail(null, '总览统计失败'));
  })
}

router.post('/', validateParams, pandect, (req, res, next) => {
  res.json(res.locals.addResult);
});

module.exports = router;