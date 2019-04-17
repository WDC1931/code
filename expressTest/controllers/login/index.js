const axios = require("axios");
const uuidv4 = require("uuid/v4");
// const appConfig = require('../../config/app.config');
const logger = require("../../config/log4js.config").getLogger();
const createRedisClent = require("../../util/createLongClient");

module.exports = function(req, res, next) {
  //   let appID = `wx1fcb05ddddb5108d`;
  let appSerect = `12f9a67d76f46a10b807ef669e1ffb5d`;
  logger.debug(`请求参数：${JSON.stringify(req.body)}`);
  const code = req.body.code || null;
  const appID = req.body.appid || null;
  if (code === null || appid === null) {
    res.sendStatus(400);
    return;
  }
  
  axios
    .get(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${appID}&secret=${appSerect}&js_code=${code}&grant_type=authorization_code`
    )
    .then(response => {
      const data = response.data;
      logger.debug(data);
      if (data.errcode === 40013) {
        res.json({
          code: 1002,
          msg: "appid错误"
        });
      } else if (data.errcode === 40125) {
        res.json({
          code: 1003,
          msg: "secret错误"
        });
      } else if (data.errcode === 40029) {
        res.json({
          code: 1004,
          msg: "js_code错误"
        });
      } else {
        const openid = data.openid || null;
        const sessionKey = data.session_key || null;
        const unionid = data.unionid || null;
        if (openid === null || sessionKey === null) {
          res.json({
            code: 1005,
            msg: "获取openid/sessionKey失败"
          });
          logger.debug(data);
          return;
        }
        const sessionId = uuidv4();
        const redisClient = createRedisClent();
        redisClient.set(
          sessionId,
          JSON.stringify({
            openid: openid,
            sessionKey: sessionKey,
            appid: appid
          }),
          "EX",
          86400,
          (err, resp) => {
            if (err) {
              logger.error(err);
              res.JSON({
                code: 1011,
                msg: "redis错误"
              });
            } else {
              // redisClient.quit();
              register(req.app.db, openid, appid, unionid)
                .then(() => {
                  res.json({
                    code: 1,
                    msg: "成功",
                    data: {
                      sessionId: sessionId,
                      openid: openid,
                      appid: appid
                    }
                  });
                })
                .catch(err => {
                  logger.error(err);
                  res.json({
                    code: 1010,
                    msg: "数据库错误"
                  });
                });
            }
          }
        );
      }
    })
    .catch(err => {
      logger.error(err);
      res.json({
        code: 1001,
        msg: "服务器checkSession网络请求失败"
      });
    });
};

function register(db, openid, appid, unionid) {
  return new Promise((resolve, reject) => {
    let defaults = {};
    
    if (unionid) {
      defaults.unionid = unionid;
    }
    const User = db.User;
    User.findOrCreate({
      where: {
        openid: openid,
        appid: appid
      },
      defaults: defaults
    })
      .spread(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
}
