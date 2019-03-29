const express = require('express');
const router = express.Router();

const utils = require('../../common/utils');
const log = require('../../middleware/log');

const QuestionnaireService = require('../../services/questionnaire/questionnaire.service');

// 参数校验
const validateParams = (req, res, next) => {
  utils.validateParams(req, res, next, ['questionnaireId']);
};

// 添加问卷访问量PV
const addQuestionnairePV = (req, res, next) => {
  // 获取接口参数
  const params = req.body;
  const questionnaireId = params.questionnaireId;

  QuestionnaireService.updateQuestionnairePV({ questionnaireId }).then(
    ret => {
      res.locals.addResult = utils.dealSuccess(null, '添加成功');
      next();
    },
    err => {
      log.error({
        func:
          'updateQuestionnairePV-QuestionnaireService.updateQuestionnairePV()',
        questionnaireId,
        msg: '添加失败',
        err: err
      });

      res.json(utils.dealFail(null, '添加失败'));
    }
  );
};

router.post('/', validateParams, addQuestionnairePV, (req, res, next) => {
  res.json(res.locals.addResult);
});

module.exports = router;
