const express = require('express');
const router = express.Router();

const utils = require('../../../common/utils');
const log = require('../../../middleware/log');

const CompanyService = require('../../../services/company/company.service')

// 参数校验
const validateParams = (req, res, next) => {
    utils.validateParams(req, res, next, ['companyId']);
}

// 公司详情
const detailCompany = (req, res, next) => {

    // 获取接口参数
    const params = req.query;
    const companyId = parseInt(params.companyId);

    CompanyService.detailCompany(companyId).then(
        ret => {
            res.locals.queryResult = utils.dealSuccess({
                companyInfo: ret.get({plain: true})
            }, '查询公司信息成功');
            next();
        },
        err => {

            log.error({
                func: 'detailCompany-CompanyService.detailCompany()',
                companyId: companyId,
                msg: '查询公司信息失败',
                err: err
            });

            res.json(utils.dealFail(null, '查询公司信息失败'));
        }
    );
    
}

router.get('/', validateParams, detailCompany, (req, res, next) => {
    res.json(res.locals.queryResult);
});

module.exports = router;