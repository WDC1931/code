const utils = require('../../common/utils');
const log = require('../../middleware/log');
const DAO = require('../../daos/dao');

const QuestionService = {
  /**
   * @description 创建问题
   * @param {Array} questionList - 问题列表
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  createQuestion({
    questionList,
    transaction
  }) {
    return DAO.question.saveQuestionList({
      questionList,
      transaction
    });
  },
  /**
   * @description 查询问题
   * @param {Number}  questionnaireId  - 问卷id
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  questionList({
    questionnaireId,
    transaction
  }) {
    return DAO.question.queryQuestionByQuestionnaireId({
      questionnaireId,
      transaction
    });
  },
  /**
   * @description 更新问题(先删除所有，再添加)
   * @param {Number, Array} 问卷id, 问题列表
   * @returns promise 
   */
  updateQuestionByDelete({
    questionnaireId,
    questionList,
    transaction
  }) {
    const deleteOptionIdArr = [];
    //1 找到原纪录的questionId,加到传入的数组里
    //2 删除全部
    //3 添加传入的数组
    return DAO.question.queryQuestionByQuestionnaireId({
      questionnaireId,
      transaction
    }).then(ret => {
      //数组变成对象方便根据questionNo 拿 questionid,createdAt
      const obj = ret.reduce((total, item) => {
        total[item.questionNo] = {
          id: item.questionId,
          createdAt: item.createdAt
        };
        deleteOptionIdArr.push(item.questionId)
        return total;
      }, {})
      
      //保存数据库原有记录的问题的 questionid,createdAt
      questionList.forEach(item => {
        item.questionnaireId = questionnaireId;
        if (typeof (obj[item.questionNo]) !== 'undefined') {
          item.questionId = obj[item.questionNo]['id'];
          item.createdAt = obj[item.questionNo]['createdAt'];
        }
      })
      return DAO.question.deleteQuestionByQuestionnaireId({
        questionnaireId,
        transaction
      })
    }).then(ret => {
      return DAO.question.saveQuestionList({
        questionList,
        transaction
      })
    }).then(ret => {
      //这里的ret 拿出来的 自增id不一定准，自已再查一次
      return DAO.question.queryQuestionByQuestionnaireId({
        questionnaireId,
        transaction
      })     
    }).then(ret => {
       //确保questionsList 的每个问题都有id
      //1 吧数组变成对象方便根据questionNo 拿 questionId
      const obj = ret.reduce((total, item) => {
        total[item.questionNo] = {
          id: item.questionId,
        }
        return total;
      }, {})
      //赋予id
      questionList.forEach(item => {
        if (typeof (obj[item.questionNo]) !== 'undefined') {
          item.questionId = obj[item.questionNo]['id'];
        }
      })
      //返回要删除的option表的 questionid数组
      return Promise.resolve(deleteOptionIdArr)
    })
  }
};

module.exports = QuestionService;