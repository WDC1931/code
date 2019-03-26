const utils = require('../common/utils');
// IP 白名单
const whiteList = (req, res, next, whiteList) => {
    const ip = req.ip || req.socket.remoteAddress;
    const whiteListed = whiteList.indexOf(ip) !== -1;
    console.log('ip=' + ip);
    console.log('whiteList=' + whiteList);
    if (whiteListed) {
        // ip 白名单校验通过
        console.log('whiteList()-ip-in-whiteList', 'IP 白名单校验通过');
        next();
    }
    else {
        console.log('whiteList()-ip-not-in-whiteList', 'IP 不在白名单中');
        res.json(utils.dealForbidden('IP 不在白名单中'));
    }
}

module.exports = whiteList;