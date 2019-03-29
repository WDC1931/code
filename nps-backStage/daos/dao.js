const QuestionDAO = require('./question.dao');
const OptionDAO = require('./option.dao');

const DAO = {
  question: QuestionDAO,
  option: OptionDAO
};

module.exports = DAO;
