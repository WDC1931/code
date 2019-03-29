const express = require('express');
const router = express.Router();

const utils = require('../../common/utils');
const log = require('../../middleware/log');

const QuestionnaireService = require('../../services/questionnaire/questionnaire.service');
const UserService = require('../../services/user/user.service');

// 参数校验
const validateParams = (req, res, next) => {
  utils.validateParams(req, res, next, ['questionnaireId', 'userId', 'status']);
};

const auditQuestionnaire = (req, res, next) => {
  // 获取接口参数
  const params = req.body;
  const questionnaireId = params.questionnaireId;
  const auditUserId = params.userId;
  const status = params.status;
  const keyWord = params.keyWord || null;
  const reason = params.reason || null;


  let updateData = { status,keyWord,reason,auditUserId };
  UserService.detailUser({ userId:auditUserId }).then(ret => {
    if (ret) {
      if (ret.audit) {
        QuestionnaireService.updateQuestionnaire({
          updateData,
          questionnaireId
        }).then(
          ret => {
            res.locals.addResult = utils.dealSuccess(null, '审核成功');
            next();
          },
          err => {
            log.error({
              func:
                'updateQuestionnaire-QuestionnaireService.updateQuestionnaire()',
              updateData,
              questionnaireId,
              msg: '审核失败',
              err: err
            });

            res.json(utils.dealFail(null, '审核失败'));
          }
        );
      } else {
        res.locals.addResult = utils.dealPermissionFail('无审核权');
        next();
      }
    } else {
      res.locals.addResult = utils.dealNotExist('用户不存在');
      next();
    }
  });
};

router.post('/', validateParams, auditQuestionnaire, (req, res, next) => {
  res.json(res.locals.addResult);
});

module.exports = router;
