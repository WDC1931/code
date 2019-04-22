const request = require('superagent');
const moment = require('moment');
const uuid = require('uuid');

const utils = {
    // 获取请求头中携带的 Token
    getHeaderToken (req) {
        return req.header('X-Access-Token');
    },

    // 生成 UUID
    generateUUID () {
        return uuid().split('-').join('').toUpperCase();
    },

    // 生成随机整数
    generateRandomInteger (min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    },

    // 生成订单号
    generateOrderId () {
        // 当前时间14位 + 随机数4位
        const min = 1000, max = 9999;
        const now = moment().format('YYYYMMDDHHmmss');
        const random = Math.floor(Math.random()*(max-min+1)+min);
        return now + '' + random;
    },

    // 接口成功处理
    dealSuccess (ret, msg) {
        const status = {
            ret: 0,
            msg: msg
        }
        return Object.assign(status, ret);
    },

    // 接口返回失败
    dealFail (ret, msg) {
        const status = {
            ret: 1,
            msg: msg
        }
        return Object.assign(status, ret);
    },

    // 接口身份验证失败
    dealAuthFail (msg) {
        const ret = {
            ret: 401,
            msg: msg
        }
        return ret;
    },

    // 接口用户权限不足
    dealPermissionFail (msg) {
        const ret = {
            ret: 412,
            msg: msg
        }
        return ret;
    },

    // 接口缺少参数
    dealLackParam (param) {
        return {
            ret: 400,
            msg: '缺少参数 ' + param + '，请补充'
        };
    },

    // 资源不存在
    dealNotExist (msg) {
        return {
            ret: 410,
            msg: msg
        };
    },

    // 禁止访问
    dealForbidden (msg) {
        return {
            ret: 403,
            msg: msg
        };
    },

    // 处理分页数据
    dealPaginationList (listName, queryResult, pageNum, pageSize) {
        const data = {};
        const key = listName + 'List';
        data[key] = queryResult.rows;
        return Object.assign(data, {
            pageNum: pageNum,
            pageSize: pageSize,
            totalItems: queryResult.count,
            totalPages: Math.ceil(queryResult.count / pageSize)
        });
    },

    // 参数校验
    validNeededParams(params={},paramsNameArr=[]){
        return new Promise((resolve,reject)=>{
            paramsNameArr.forEach(item=>{
                if(typeof params[item]==='undefined'){
                    return reject({
                        lackParamName:item
                    });
                }
            });
            resolve();
        });
    },

    validateParams(req, res, next, paramsNeeded) {

        const method = req.method;
        const params = method === 'POST' ? req.body : req.query;

        this.validNeededParams(params, paramsNeeded).then(
            ret => {
                next();
            },
            err => {
                res.json(this.dealLackParam(err.lackParamName));
            }
        )
    },

    // 网络请求
    http (options) {
        const method = options.method || 'GET';
        const url = options.url;
        const headers = options.headers || {};
        const data = options.data || {};
        const cookies = options.cookies || {};

        let cookiesString = '';
        let headersArray = [];

        for (key in cookies) {
            let item = key + '=' + cookies[key] + '; ';
            cookiesString += item;
        }

        headers.Cookie = cookiesString;

        for (let key in headers) {
            headersArray.push({
                key: key,
                value: headers[key]
            })
        }

        let req = null;

        if (method === 'GET') {
            req = request.get(url);
        }

        if (method === 'POST') {
            req = request.post(url);
        }

        for (let i = 0; i < headersArray.length; i++) {
            req.set(headersArray[i].key, headersArray[i].value)
        }

        if (method === 'GET') {
            return req.query(data);
        }
        if (method === 'POST') {
            return req.type('form').send(data);
        }
    },

    // 判断空对象
    isEmptyObject (object) {
        return JSON.stringify(object) === '{}';
    }
}

module.exports = utils;