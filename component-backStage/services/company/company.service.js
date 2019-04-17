const utils = require('../../common/utils');
const log = require('../../middleware/log');
const DAO = require('../../daos/dao');

// CompanyService
const CompanyService = {

  /**
   * @description 添加公司
   * @param {Object} companyInfo - 公司信息
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  addCompany(companyInfo) {
    return DAO.company.saveCompanyInfo(companyInfo);
  },
  
  /**
   * 查询公司信息
   * @param {Int} companyId - 公司 ID
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  detailCompany(companyId) {
    return DAO.company.queryCompanyInfoByCompanyId(companyId);
  },
  
  /**
   * 查询公司列表
   * @param {Int} pageSize - 分页大小
   * @param {Int} pageNum - 分页页码
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  listCompanys(pageSize, pageNum) {
    return DAO.company.queryCompanyList(pageSize, pageNum);
  },

  /**
   * 更新公司信息
   * @param {Int} companyId - 公司 ID
   * @param {Object} updateData - 更新的公司信息
   * @returns {Promise} - Sequelize 数据库操作的结果
   */
  updateCompany(companyId, updateData) {
    return DAO.company.updateCompanyInfo(companyId, updateData);
  }
}

module.exports = CompanyService;
