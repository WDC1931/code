const express = require('express');
const router = express.Router();

const utils = require('../../../common/utils');
const log = require('../../../middleware/log');

const UserService = require('../../../services/user/user.service')

// 参数校验
const validateParams = (req, res, next) => {
    utils.validateParams(req, res, next, ['userId']);
}

// 更新用户信息
const updateUser = (req, res, next) => {

    // 获取接口参数
    const params = req.body;
    const userId = parseInt(params.userId);
    const userName = params.userName;
    const sex = parseInt(params.sex);
    const email = params.email;

    const updateData = {};

    if (userName) {
        Object.assign(updateData, {
            userName: userName
        })
    }

    if (sex) {
        Object.assign(updateData, {
            sex: sex
        })
    }

    if (email) {
        Object.assign(updateData, {
            email: email
        })
    }

    UserService.updateUser(userId, updateData).then(
        ret => {
            res.locals.updateResult = utils.dealSuccess(null, '更新用户信息成功');
            next();
        },
        err => {

            log.error({
                func: 'updateUser-UserService.updateUser()',
                userId: userId,
                updateData: updateData,
                msg: '更新用户信息失败',
                err: err
            });

            res.json(utils.dealFail(null, '更新用户信息失败'));

        }
    );
    
}

router.post('/', validateParams, updateUser, (req, res, next) => {
    res.json(res.locals.updateResult);
});

module.exports = router;