const express = require('express');
const router = express.Router();

const utils = require('../../../common/utils');
const log = require('../../../middleware/log');

const UserService = require('../../../services/user/user.service')

// 参数校验
const validateParams = (req, res, next) => {
    utils.validateParams(req, res, next, ['userName', 'sex', 'companyId']);
}

// 添加用户
const addUser = (req, res, next) => {

    // 获取接口参数
    const params = req.body;
    const userName = params.userName;
    const sex = parseInt(params.sex);
    const email = params.email;
    const companyId = parseInt(params.companyId);

    const userInfo = {
        userName: userName,
        sex: sex,
        companyId: companyId
    };

    // 可选参数
    if (email) {
        Object.assign(userInfo, {
            email: email
        })
    }

    UserService.addUser(userInfo).then(
        ret => {
            res.locals.addResult = utils.dealSuccess(null, '添加用户成功');
            next();
        },
        err => {

            log.error({
                func: 'addUser-UserService.addUser()',
                userInfo: userInfo,
                msg: '添加用户失败',
                err: err
            });

            res.json(utils.dealFail(null, '添加用户失败'));

        }
    );
    
}

router.post('/', validateParams, addUser, (req, res, next) => {
    res.json(res.locals.addResult);
});

module.exports = router;