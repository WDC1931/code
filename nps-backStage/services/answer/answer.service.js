const utils = require('../../common/utils');
const log = require('../../middleware/log');
const DAO = require('../../daos/dao');

const AnswerService = {
  /**
   * @description 创建答案
   * @param {Array} answerInfo - 答案信息
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  createAnswer({
    answerInfo,
    transaction
  }) {
    return DAO.answer.saveAnswerInfo({
      answerInfo,
      transaction
    });
  },

  pandect({
    questionnaireId,
    transaction
  }) {
    const pandect = {};
    //统计设备
    const device = DAO.answer.statisticGroup({
      questionnaireId,
      transaction
    }).then(ret => {
      pandect.device = ret
    });
    //统计地方
    const location = DAO.answer.statisticGroup({
      questionnaireId,
      transaction,
      type: 'location'
    }).then(ret => {
      const province = [
        '北京','天津','上海','重庆','河北','河南','云南','辽宁','黑龙江','湖南','安徽','山东','新疆',
        '江苏','浙江','江西','湖北','广西','甘肃','山西','内蒙古','陕西','吉林','福建','贵州','广东',
        '青海','西藏','四川','宁夏','海南','台湾','香港','澳门']
      pandect.location = ret.map(item => {
        const obj = item.get({conplain: true})
        const pri = obj.location.slice(0, 2);
        if(pri === '黑龙') {
          pri = '黑龙江'
        } else if (pri === '内蒙') {
          pri = '内蒙古'
        } else {
          ;
        }
        return {
          location:pri,
          amount: obj.amount,
          all: obj.all
        };
      })
    })
    //统计总数
    const total = DAO.answer.countAll({ questionnaireId, transaction }).then(ret => {
      pandect.total = ret;
    })
    //统计pv
    // const pv = DAO.questionnaire.get('PV', {transaction}).then(ret => {
    //   pandect.pv = ret
    // })

    return Promise.all([device, location,total]).then(_ => {
      return pandect;
    });
  }
};

module.exports = AnswerService;