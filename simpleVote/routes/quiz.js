const express = require("express");
var url = require("url");
var multer = require("multer");
var fs = require("fs");

var router = express.Router();
const quizList = require("../models/quiz.model");

// 保存问答
router.post("/save", function(req, res, next) {
  var body = req.body;

  quizList
    .create({
      fonts: body.fonts,
      class: body.class,
      title: body.title,
      home: body.home,
      behavior: body.behavior,
      finsh: body.finsh,
      analysis: body.analysis
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

// 问答查询
router.get("/search", function(req, res, next) {
  var params = url.parse(req.url, true).query;

  quizList
    .findAll({
      where: {
        id: params.quizId
      }
    })
    .then(data => {
      res.send({
        msg: "查询成功!",
        result: data
      });
    })
    .catch(err => {
      res.send(err);
    });
});

// 图片上传
var upload = multer({
  dest: "public/images/quiz"
});
router.post("/upload", upload.single("file"), function(req, res, next) {
  var file = req.file;
  res.send({
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

module.exports = router;
