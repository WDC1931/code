const express = require("express");
var url = require("url");
var multer = require("multer");
var fs = require("fs");

var router = express.Router();
const voteList = require("../models/votePub.model");
const login = require("../controllers/wechat/login");

// 小程序登录
router.post("/login", login);

// 保存投票
router.post("/save", function(req, res, next) {
  var body = req.body;

  voteList
    .create({
      type: body.type,
      deadline: body.deadline,
      anonymity: body.anonymity,
      isLimit: body.isLimit,
      title: body.title,
      detail: body.detail,
      optionsType: body.optionsType,
      options: body.options,
      totalNum: body.totalNum
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

// 投票列表
router.get("/list", function(req, res, next) {
  voteList.findAll().then(data => {
    res.send(data);
  });
});

// 图片上传
var upload = multer({
  dest: "public/images/vote"
});
router.post("/upload", upload.single("file"), function(req, res, next) {
  var file = req.file;
  
  res.send({
    msg: "上传成功",
    Url: file.path
  });
});

// 图片下载
router.get("/acquire", function(req, res, next) {
  var params = url.parse(req.url, true).query;
  var path = params.path;
  var data = fs.readFileSync("./" + path);
  res.write(data);
});

// 更新票数
router.post("/update", function(req, res, next) {
  var body = req.body;

  voteList
    .update(
      {
        options: body.options,
        totalNum: body.totalNum
      },
      {
        where: { id: body.voteId }
      }
    )
    .then(() => {
      res.send({
        msg: "更新成功!"
      });
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
