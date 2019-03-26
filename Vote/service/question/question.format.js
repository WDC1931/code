const QuestionFormat = {
  /**
   * 给每个question加上questionnaireId
   * @param {Number} questionnaireId 问卷id
   * @param {Array} questions 问题列表
   */
  QuestionAddQuestionnaireId({ questionnaireId, questions }) {
    return questions.map(v => {
      return Object.assign({}, v, { questionnaireId });
    });
  },
  /**
   * 提取问题id
   * @param {Array} questionList 问题列表
   */
  ExtractQuestionIdList({ questionList }) {
    let questionIdList = [];
    questionList.forEach(v => {
      questionIdList.push(v.questionId);
    });
    return questionIdList;
  },
  /**
   * 匹配问题和选项
   * @param {Array} questionList 问题列表
   * @param {Array} optionList 选项列表
   */
  QuestionMatchOption({ questionList, optionList }) {
    return JSON.parse(JSON.stringify(questionList)).map(qv => {
      let options = [];
      optionList.forEach(ov => {
        if (ov.questionId === qv.questionId) {
          options.push(ov);
        }
      });
      if (options.length) {
        return Object.assign(qv, { options });
      } else {
        return qv;
      }
    });
  }
};

module.exports = QuestionFormat;
