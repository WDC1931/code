const express = require('express');
const router = express.Router();

const utils = require('../../common/utils');
const log = require('../../middleware/log');

const QuestionnaireService = require('../../services/questionnaire/questionnaire.service');

// 参数校验
const validateParams = (req, res, next) => {
  utils.validateParams(req, res, next, []);
};

// 添加用户
const queryQuestionnaireList = (req, res, next) => {
  // 获取接口参数
  const params = req.query;
  const page = params.page || 1;
  const size = params.size || 10;
  const status = params.status || null;
  const userId = params.userId || null;

  QuestionnaireService.questionnaireList({ page, size, status, userId }).then(
    ret => {
      res.locals.addResult = utils.dealSuccess(
        { data: ret.rows, count: ret.count },
        '查询问卷成功'
      );
      next();
    },
    err => {
      log.error({
        func:
          'queryQuestionnaireList-QuestionnaireService.queryQuestionnaireList()',
        page,
        size,
        status,
        userId,
        msg: '查询问卷失败',
        err: err
      });

      res.json(utils.dealFail(null, '查询问卷失败'));
    }
  );
};

router.get('/', validateParams, queryQuestionnaireList, (req, res, next) => {
  let a = res.locals.addResult;
  
  res.json(a);
});

module.exports = router;
