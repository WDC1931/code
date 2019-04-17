const express = require('express');
const router = express.Router();

const utils = require('../../../common/utils');
const log = require('../../../middleware/log');

const ComapnyService = require('../../../services/company/company.service')

// 参数校验
const validateParams = (req, res, next) => {
    utils.validateParams(req, res, next, ['companyName']);
}

// 添加公司
const addCompany = (req, res, next) => {

    // 获取接口参数
    const params = req.body;
    const companyName = params.companyName;
    const logoUrl = params.logoUrl;

    const companyInfo = {
        companyName: companyName,
        logoUrl: logoUrl
    };

    ComapnyService.addCompany(companyInfo).then(
        ret => {
            res.locals.addResult = utils.dealSuccess(null, '添加公司成功');
            next();
        },
        err => {

            log.error({
                func: 'addCompany-ComapnyService.addCompany()',
                companyInfo: companyInfo,
                msg: '添加公司失败',
                err: err
            });

            res.json(utils.dealFail(null, '添加公司失败'));

        }
    );
    
}

router.post('/', validateParams, addCompany, (req, res, next) => {
    res.json(res.locals.addResult);
});

module.exports = router;