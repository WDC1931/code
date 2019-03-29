const express = require('express');
const router = express.Router();

const utils = require('../../../common/utils');
const log = require('../../../middleware/log');

const UserService = require('../../../services/user/user.service')

// 参数校验
const validateParams = (req, res, next) => {
    utils.validateParams(req, res, next, []);
}

// 用户列表
const listUsers = (req, res, next) => {

    // 获取接口参数
    const params = req.query;
    const pageSize = params.pageSize ? parseInt(params.pageSize) : 10;
    const pageNum = params.pageNum ? parseInt(params.pageNum) : 1;

    UserService.listUsers(pageSize, pageNum).then(
        ret => {
            const result = utils.dealPaginationList('user', ret, pageNum, pageSize);
            res.locals.queryResult = utils.dealSuccess(result, '查询用户列表成功');
            next();
        },
        err => {

            log.error({
                func: 'listUsers-UserService.listUsers()',
                msg: '查询用户列表失败',
                err: err
            });

            res.json(utils.dealFail(null, '查询用户列表失败'));
        }
    );
    
}

router.get('/', validateParams, listUsers, (req, res, next) => {
    res.json(res.locals.queryResult);
});

module.exports = router;