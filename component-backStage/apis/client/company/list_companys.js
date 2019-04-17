const express = require('express');
const router = express.Router();

const utils = require('../../../common/utils');
const log = require('../../../middleware/log');

const CompanyService = require('../../../services/company/company.service')

// 参数校验
const validateParams = (req, res, next) => {
    utils.validateParams(req, res, next, []);
}

// 公司列表
const listCompanys = (req, res, next) => {

    // 获取接口参数
    const params = req.query;
    const pageSize = params.pageSize ? parseInt(params.pageSize) : 10;
    const pageNum = params.pageNum ? parseInt(params.pageNum) : 1;

    CompanyService.listCompanys(pageSize, pageNum).then(
        ret => {
            const result = utils.dealPaginationList('company', ret, pageNum, pageSize);
            res.locals.queryResult = utils.dealSuccess(result, '查询公司列表成功');
            next();
        },
        err => {

            log.error({
                func: 'listCompanys-CompanyService.listCompanys()',
                msg: '查询公司列表失败',
                err: err
            });

            res.json(utils.dealFail(null, '查询公司列表失败'));
        }
    );
    
}

router.get('/', validateParams, listCompanys, (req, res, next) => {
    res.json(res.locals.queryResult);
});

module.exports = router;