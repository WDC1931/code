const express = require("express");

var router = express.Router();
const sportList = require("../models/sport.model");
const login = require('../controllers/wechat/login');

router.get('/login', login);

// 保存信息
router.post("/save", function(req, res, next) {
    var body = req.body;
    sportList
      .create({
        home: body.home,
        user: body.user,
        ranking: body.ranking
      })
      .then(data => {
        res.send({
          msg: "保存成功!",
          result: data.id
        });
      })
      .catch(err => {
        res.send(err);
      });
  });


  module.exports = router;