const UserDAO = require('./user.dao');
const QuestionnaireDAO = require('./questionnaire.dao');
const QuestionDAO = require('./question.dao');
const OptionDAO = require('./option.dao');
const AnswerDAO = require('./answer.dao');
const AnswerDetailDAO = require('./answerDetail.dao');

const DAO = {
  user: UserDAO,
  questionnaire: QuestionnaireDAO,
  question: QuestionDAO,
  option: OptionDAO,
  answer: AnswerDAO,
  answerDetail: AnswerDetailDAO
};

module.exports = DAO;
