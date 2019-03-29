const express = require('express');
const router = express.Router();

const utils = require('../../../common/utils');
const log = require('../../../middleware/log');

const UserService = require('../../../services/user/user.service')

// 参数校验
const validateParams = (req, res, next) => {
    utils.validateParams(req, res, next, ['userId']);
}

// 用户详情
const detailUser = (req, res, next) => {

    // 获取接口参数
    const params = req.query;
    const userId = parseInt(params.userId);

    UserService.detailUserIncludeCompany(userId).then(
        ret => {
            res.locals.queryResult = utils.dealSuccess({
                userInfo: ret.get({plain: true})
            }, '查询用户信息成功');
            next();
        },
        err => {

            log.error({
                func: 'detailUser-UserService.detailUser()',
                userId: userId,
                msg: '查询用户信息失败',
                err: err
            });

            res.json(utils.dealFail(null, '查询用户信息失败'));
        }
    );
    
}

router.get('/', validateParams, detailUser, (req, res, next) => {
    res.json(res.locals.queryResult);
});

module.exports = router;