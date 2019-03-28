const utils = require('../../common/utils');
const log = require('../../middleware/log');
const DAO = require('../../daos/dao');

const QuestionnaireService = {
  /**
   * @description 创建问卷
   * @param {Object} questionnaireInfo - 问卷信息
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  createQuestionnaire({ questionnaireInfo, transaction }) {
    return DAO.questionnaire.saveQuestionnaireInfo({
      questionnaireInfo,
      transaction
    });
  },
  /**
   * @description 查询问卷详情
   * @param {Number} questionnaireId - 问卷id
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  questionnaireDetail({ questionnaireId, transaction }) {
    return DAO.questionnaire.queryQuestionnaireById({
      questionnaireId,
      transaction
    });
  },
  /**
   * @description 查询问卷列表
   * @param {Number} page - 页码
   * @param {Number} size - 分页大小
   * @param {Number} status - 问卷状态
   * @param {Number} userId - 用户id
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  questionnaireList({ page, size, status, userId, transaction }) {
    return DAO.questionnaire.queryQuestionnaireList({
      page,
      size,
      status,
      userId,
      transaction
    }).then(ret => {
      // console.log(ret)
      const arr = ret.rows.map((item, index) => {
        item = item.get({plain: true});
        item.questionsCount = item.t_nps_questions.length;
        delete item.t_nps_questions;
        return item;
      })
     
      return {rows: arr, count: ret.count};
    })
  },
  /**
   * @description 修改问卷状态
   * @param {Number} questionnaireId - 问卷id
   * @param {Number} status - 状态
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  updateQuestionnaire({ questionnaireId, updateData, transaction }) {
    return DAO.questionnaire.updateQuestionnaireInfo({
      questionnaireId,
      updateData,
      transaction
    });
  },
  /**
   * @description 增加页面浏览量 PV
   * @param {Number} questionnaireId - 问卷id
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  updateQuestionnairePV({ questionnaireId, transaction }) {
    return DAO.questionnaire.increaseQuestionnairePV({
      questionnaireId,
      transaction
    });
  },
  /**
   * @description 增加问卷答案提交量 subNum
   * @param {Number} questionnaireId - 问卷id
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  updateQuestionnaireSubNum({ questionnaireId, transaction }) {
    return DAO.questionnaire.increaseQuestionnaireSubNum({
      questionnaireId,
      transaction
    });
  }
};

module.exports = QuestionnaireService;
