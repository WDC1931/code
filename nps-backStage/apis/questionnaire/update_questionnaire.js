const express = require('express');
const router = express.Router();
const sequelize = require('../../models/model').sequelize;

const utils = require('../../common/utils');
const log = require('../../middleware/log');

const QuestionnaireService = require('../../services/questionnaire/questionnaire.service');
const QuestionService = require('../../services/question/question.service');
const OptionService = require('../../services/option/option.service');

// 参数校验
const validateParams = (req, res, next) => {
  const valid = req.app.valid.setResult();
  valid.paramsMustHave(req.body, ['questionnaireId']).getResult();
  if(valid.result) {
    next()
  } else {
    res.json(utils.dealFail(null, valid.err));
  }
};

// 添加用户
const updateQuestionnaire = (req, res, next) => {
  // 获取接口参数
  const params = req.body;
  const {
    title,
    describe,
    questions,
    questionnaireId,
    max,
    beginTime,
    endTime,
    logo,
    limit
  } = params;

  sequelize.transaction(transaction => {
    //1.更新问卷
    return QuestionnaireService.updateQuestionnaire({
      questionnaireId,
      updateData: {
        title,
        describe,
        max,
        beginTime,
        endTime,
        logo,
        limit
      },
      transaction
    }).then(ret => {
      let p = Promise.resolve();
      if (questions) {
        const questionList = JSON.parse(questions);
        //2.更新问题
        const questionParams = {
          questionnaireId,
          questionList,
          transaction
        };
        p = p.then(_ => QuestionService.updateQuestionByDelete(questionParams)).then(deleteOptionIdArr => {
          //3.更新选项
          const optionList = [];
          
          questionList.forEach(item => {
            if (item.questionId && item.options) {
                optionList.push(...item.options.map(item2 => {
                  item2.questionId = item.questionId;
                  item2.createdAt = item.createdAt;
                  return item2;
                }));
            }
          })

          return OptionService.updateQuestionByDelete({
            deleteIdArr: deleteOptionIdArr,
            optionList,
            transaction
          })
        });
      }
      return p;
    })
  }).then(() => {
    res.locals.addResult = utils.dealSuccess({
        questionnaireId
      },
      '更新问卷成功'
    );
    next();
  }).catch(err => {
    log.error(err);
    res.json(utils.dealFail(null, '更新问卷失败'));
  });
};

router.post('/', validateParams, updateQuestionnaire, (req, res, next) => {
  res.json(res.locals.addResult);
});

module.exports = router;