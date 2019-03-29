const sequelize = require('./_sequelize');
const UserModel = require('./user.model');
const QuestionnaireModel = require('./questionnaire.model');
const QuestionModel = require('./question.model');
const OptionModel = require('./option.model');
const AnswerModel = require('./answer.model');
const AnswerDetailModel = require('./answerDetail.model');

const log = require('../middleware/log');

/**
 * 打开重置数据库
 * 生产环境必须关闭
 */
// sequelize
//   .sync({ force: true })
//   .then(() => {
//     log.debug('数据库初始化成功');
//   })
//   .catch(err => {
//     log.error('数据库初始化失败');
//     log.error(err);
//   });

QuestionnaireModel.hasMany(QuestionModel, {
  foreignKey: 'questionnaireId',
  targetKey: 'questionnaireId'
})

QuestionnaireModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  targetKey: 'userId'
})

module.exports = {
  sequelize: sequelize,
  user: UserModel,
  questionnaire: QuestionnaireModel,
  question: QuestionModel,
  option: OptionModel,
  answer: AnswerModel,
  answerDetail: AnswerDetailModel
};
