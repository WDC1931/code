const OptionFormat = {
  // 为每个选项添加问题id
  OptionAddQuestion({ questionList, questions }) {
    let optionList = [];
    questions.forEach(v => {
      if (v.options && v.options.length) {
        let targetQuestion = questionList.find(qv => {
          return qv.questionNo === v.questionNo;
        });
        v.options.forEach(ov => {
          optionList.push(
            Object.assign({}, ov, { questionId: targetQuestion.questionId })
          );
        });
      }
    });
    return optionList;
  }
};

module.exports = OptionFormat;
