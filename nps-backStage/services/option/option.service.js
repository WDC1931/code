const utils = require('../../common/utils');
const log = require('../../middleware/log');
const DAO = require('../../daos/dao');

const OptionService = {
  /**
   * @description 创建选项
   * @param {Object} optionList - 问卷信息
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  createOption({ optionList, transaction }) {
    return DAO.option.saveOptionList({ optionList, transaction });
  },
  /**
   * @description 查询选项
   * @param {Array} questionIdList - 问题id列表
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  optionList({ questionIdList, transaction }) {
    return DAO.option.queryOptionByQuestionId({ questionIdList, transaction });
  },
  updateQuestionByDelete({ deleteIdArr, optionList, transaction }) {
    //1删除所有
    //2重新啊添加
    return DAO.option.deleteOptionByQuestionId({ deleteIdArr, transaction }).then(ret => {
      return DAO.option.saveOptionList({ optionList, transaction });
    })
    
  }
};

module.exports = OptionService;
