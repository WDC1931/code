const log = require('../middleware/log');
const Model = require('../models/model');
const Op = require('sequelize').Op;
const OptionDAO = {
  // 添加一组问题
  saveOptionList({ optionList, transaction }) {
    log.trace('OptionDAO-saveOptionList(), optionList');
    log.trace(optionList);

    return Model.option.bulkCreate(optionList, { transaction });
  },
  // 查询选项
  queryOptionByQuestionId({ questionIdList, transaction }) {
    log.trace('OptionDAO-queryOptionByQuestionId(), questionIdList');
    log.trace(questionIdList);

    return Model.option.findAll({
      where: {
        questionId: questionIdList
      },
      transaction
    });
  },
  // 删除
  deleteOptionByQuestionId({ deleteIdArr, transaction }) {
    log.trace('OptionDAO-deleteOptionByQuestionId(), deleteIdArr');
    log.trace(deleteIdArr);

    return Model.option.destroy({
      where: {
        questionId: {
          [Op.in]: deleteIdArr
        }
      },
      force: true,
      transaction
    });
  }
};

module.exports = OptionDAO;
