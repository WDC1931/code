const log = require('../middleware/log');
const Model = require('../models/model');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const QuestionnaireDAO = {
  // 添加一个问卷
  saveQuestionnaireInfo({ questionnaireInfo, transaction }) {
    log.trace('QuestionnaireDAO-saveQuestionnaireInfo(), questionnaireInfo');
    log.trace(questionnaireInfo);

    return Model.questionnaire.create(questionnaireInfo, { transaction });
  },
  // 查询问卷详情
  queryQuestionnaireById({ questionnaireId, transaction }) {
    log.trace('QuestionnaireDAO-queryQuestionnaireById(), questionnaireId');
    log.trace(questionnaireId);

    return Model.questionnaire.findOne({
      where: {
        questionnaireId,
        beginTime: {
          [Op.or]: {
            [Op.lte]: new Date().toISOString(),
            [Op.eq]: null
          }
        }
      },
      transaction
    });
  },
  // 查询问卷列表
  queryQuestionnaireList({ page, size, status, userId, transaction }) {
    log.trace(
      'QuestionnaireDAO-queryQuestionnaireList(), { page, size, status, userId }'
    );
    log.trace(page, size, status, userId);

    let config = {
      limit: parseInt(size),
      offset: (page - 1) * size,
      distinct: false,
      order: [['questionnaireId', 'desc']],
      include: [
        {
          model: Model.question,
          // attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'totalCount']],
        },{
          model: Model.user,
          attributes: ['userName'],
        }
      ],
      distinct: true,
      transaction
    };
    let where = {};
    (status || status === 0) && (where.status = status);
    userId && (where.userId = userId);
    JSON.stringify(where) !== '{}' && (config.where = where);

    return Model.questionnaire.findAndCount(config);
  },
  // 修改问卷状态
  updateQuestionnaireInfo({ questionnaireId, updateData, transaction }) {
    log.trace(
      'QuestionnaireDAO-editQuestionnaireStatus(), { questionnaireId, updateData }'
    );
    log.trace(questionnaireId, updateData);

    return Model.questionnaire.update(updateData, {
      where: { questionnaireId },
      transaction
    });
  },
  // 添加页面浏览量 PV
  increaseQuestionnairePV({ questionnaireId, transaction }) {
    log.trace(
      'QuestionnaireDAO-increaseQuestionnairePV(), { questionnaireId }'
    );
    log.trace(questionnaireId);

    return Model.questionnaire.update(
      {
        PV: Model.sequelize.literal('PV + 1')
      },
      {
        where: { questionnaireId },
        transaction
      }
    );
  },
  // 添加答案提交量 subNum
  increaseQuestionnaireSubNum({ questionnaireId, transaction }) {
    log.trace(
      'QuestionnaireDAO-increaseQuestionnaireSubNum(), { questionnaireId }'
    );
    log.trace(questionnaireId);

    return Model.questionnaire.update(
      {
        subNum: Model.sequelize.literal('subNum + 1')
      },
      {
        where: { questionnaireId },
        transaction
      }
    );
  }
};

module.exports = QuestionnaireDAO;
