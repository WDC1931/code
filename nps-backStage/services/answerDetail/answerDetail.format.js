const AnswerDetailFormat = {
  /**
   * 给每个answerDetail加上questionnaireId和answerId
   * @param {Number} questionnaireId 问卷id
   * @param {Array} questions 问题列表
   */
  AnswerDetailAddQuestionnaireIdAndAnswerId({
    questionnaireId,
    answerId,
    answerDetail
  }) {
    return answerDetail.map(v => {
      return Object.assign(v, { questionnaireId, answerId });
    });
  }
};

module.exports = AnswerDetailFormat;
