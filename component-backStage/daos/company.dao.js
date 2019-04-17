const log = require('../middleware/log');
const Model = require('../models/model');

const CompanyDAO = {

  // 添加一个公司
  saveCompanyInfo(companyInfo) {

    log.trace('CompanyDAO-saveCompanyInfo(), companyInfo');
    log.trace(companyInfo);

    return Model.company.create(companyInfo);
  },

  // 查询公司详情
  queryCompanyInfoByCompanyId(companyId) {

    log.trace('CompanyDAO-queryCompanyInfoByCompanyId(), companyId=' + companyId);

    return Model.company.findOne({
      where: {
        companyId: companyId
      }
    });
  },

  // 查询公司列表
  queryCompanyList(pageSize, pageNum) {

    log.trace('CompanyDAO-queryCompanyList(), pageSize=' + pageSize);
    log.trace('CompanyDAO-queryCompanyList(), pageNum=' + pageNum);

    return Model.company.findAndCountAll({
      order: [
        ['createdAt', 'DESC']
      ],
      attributes: ['companyId', 'companyName', 'logoUrl', 'createdAt', 'updatedAt'],
      limit: pageSize,
      offset: (pageNum - 1) * pageSize
    });
  },


  // 更新公司信息
  updateCompanyInfo(companyId, updateData) {

    log.trace('CompanyDAO-updateCompanyInfo(), companyId=' + companyId);
    log.trace('CompanyDAO-updateCompanyInfo(), updateData');
    log.trace(updateData);

    return Model.company.update(updateData, {
      where: {
        companyId: companyId
      }
    });
  }

}

module.exports = CompanyDAO;
