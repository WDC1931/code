const express = require("express");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

let router = express.Router();
const sportUser = require("../models/sportUser.model");
const sportList = require("../models/sportPub.model");
const login = require("../controllers/wechat/login");
const WXBizDataCrypt = require("../controllers/wechat/WXBizDataCrypt");

router.post("/login", login);

router.post("/decrypt", function(req, res, next) {
  let appId = req.body.appid;
  let sessionKey = req.body.sessionkey;
  let encryptedData = req.body.encrypteddata;
  let iv = req.body.iv;
  let pc = new WXBizDataCrypt(appId, sessionKey);
  let data = pc.decryptData(encryptedData, iv);
  res.send(data);
});

// 保存发布端信息
router.post("/savePub", function(req, res, next) {
  var body = req.body;

  sportList
    .create({
      activity: body.activity,
      graph: body.graph,
      assistance: body.assistance,
      award: body.award
    })
    .then(data => {
      res.send({
        msg: "保存成功!",
        id: data.id
      });
    })
    .catch(err => {
      res.send(err);
    });
});

// 保存用户信息
router.post("/user", function(req, res, next) {
  let body = req.body;

  sportUser
    .findAll({
      attributes: ["openId"],
      where: { openId: body.openId }
    })
    .then(data => {
      if (data[0] !== undefined) {
        sportUser
          .update(
            {
              step: body.step,
              energy: body.energy,
              exchange: body.exchange
            },
            {
              where: {
                openId: body.openId
              }
            }
          )
          .then(() => {
            res.send({
              msg: "用户已存在!"
            });
          })
          .catch(err => {
            res.send(err);
          });
      } else {
        sportUser
          .create({
            openId: body.openId,
            nickName: body.nickName,
            avatarUrl: body.avatarUrl,
            step: body.step,
            energy: body.energy,
            exchange: body.exchange,
            correlation: body.correlation
          })
          .then(data => {
            res.send({
              msg: "保存成功!",
              id: data.id
            });
          })
          .catch(err => {
            res.send(err);
          });
      }
    });
});

// 查询用户信息
router.post("/searchUser", function(req, res, next) {
  let body = req.body;

  sportUser
    .findAll({
      where: { openId: body.openId }
    })
    .then(data => {
      res.send({
        result: data
      });
    })
    .catch(err => {
      res.send(err);
    });
});

// 关联用户
router.post("/share", function(req, res, next) {
  let body = req.body;

  sportUser
    .findAll({
      attributes: ["openId"],
      where: { openId: body.guestOpenId }
    })
    .then(data => {
      if (data[0] !== undefined) {
        sportUser
          .findAll({
            where: { openId: body.hostOpenId }
          })
          .then(data => {
            let obj = data[0].dataValues;
            let relation = obj.correlation;
            relation = relation + body.guestOpenId + ",";
            sportUser.update(
              {
                correlation: relation
              },
              {
                where: { openId: body.hostOpenId }
              }
            );
          });

        sportUser
          .findAll({
            where: { openId: body.guestOpenId }
          })
          .then(data => {
            let obj = data[0].dataValues;
            let relation = obj.correlation;
            relation = relation + body.hostOpenId + ",";
            sportUser.update(
              {
                correlation: relation
              },
              {
                where: { openId: body.guestOpenId }
              }
            );
          });

        res.send("关联成功！");
      } else {
        res.send("请先登录！");
      }
    })
    .catch(err => {
      res.send(err);
    });
});

// 好友列表
router.post("/friendList", function(req, res, next) {
  let body = req.body;
  sportUser
    .findAll({
      where: { openId: body.openId }
    })
    .then(data => {
      return new Promise((resolve, reject) => {
        let obj = data[0].dataValues;
        let relation = obj.correlation;
        let relArry = relation.split(",");

        sportUser
          .findAll({
            where: {
              openId: {
                [Op.in]: relArry
              }
            }
          })
          .then(arrData => {
            let stepArry = [];

            for (let i of arrData) {
              let a = i.get({
                plain: true
              });
              stepArry.push({
                openId: a.openId,
                avatarUrl: a.avatarUrl,
                nickName: a.nickName,
                step: a.step
              });
            }
            function Sort(x, y) {
              return y.step - x.step;
            }
            stepArry.sort(Sort)
            resolve(stepArry);
          });
      });
    })
    .then(stepArry => {
      res.send(stepArry);
    });
});

module.exports = router;
