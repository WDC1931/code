const express = require('express');
const router = express.Router();

const utils = require('../../../common/utils');
const log = require('../../../middleware/log');

const CompanyService = require('../../../services/company/company.service')

// 参数校验
const validateParams = (req, res, next) => {
    utils.validateParams(req, res, next, ['companyId']);
}

// 更新公司信息
const updateCompany = (req, res, next) => {

    // 获取接口参数
    const params = req.body;
    const companyId = parseInt(params.companyId);
    const companyName = params.companyName;
    const logoUrl = params.logoUrl;

    const updateData = {};

    if (companyName) {
        Object.assign(updateData, {
            companyName: companyName
        })
    }

    if (logoUrl) {
        Object.assign(updateData, {
            logoUrl: logoUrl
        })
    }

    CompanyService.updateCompany(companyId, updateData).then(
        ret => {
            res.locals.updateResult = utils.dealSuccess(null, '更新公司信息成功');
            next();
        },
        err => {

            log.error({
                func: 'updateCompany-CompanyService.updateCompany()',
                companyId: companyId,
                updateData: updateData,
                msg: '更新公司信息失败',
                err: err
            });

            res.json(utils.dealFail(null, '更新公司信息失败'));

        }
    );
    
}

router.post('/', validateParams, updateCompany, (req, res, next) => {
    res.json(res.locals.updateResult);
});

module.exports = router;