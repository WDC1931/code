const sequelize = require('./_sequelize');
const QuestionModel = require('./question.model');
const OptionModel = require('./option.model');

const log = require('../middleware/log');

/**
 * 打开重置数据库
 * 生产环境必须关闭
 */
sequelize
  .sync({ force: true })
  .then(() => {
    log.debug('数据库初始化成功');
  })
  .catch(err => {
    log.error('数据库初始化失败');
    log.error(err);
  });

module.exports = {
  sequelize: sequelize,
  question: QuestionModel,
  option: OptionModel
};
