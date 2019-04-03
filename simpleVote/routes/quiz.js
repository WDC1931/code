const express = require("express");
var url = require("url");
var multer = require("multer");
var fs = require("fs");

var router = express.Router();
const connection = require("../config/DBConfig");
const quizSQL = require("../dao/quiz.dao");

// 保存问答
router.post("/save", function (req, res, next) {
    var body = req.body;
    connection.query(quizSQL.insert, [body.fonts, body.class, body.title, body.home, body.behavior, body.finsh, body.analysis], function (err, result) {
        if (err) {
            res.send("保存失败" + err);
        } else {
            res.send({
                msg: "保存成功!",
                result: result.insertId
            });
        }
    });
});

// 问答查询
router.get("/search", function (req, res, next) {
    var params = url.parse(req.url, true).query;

    connection.query(quizSQL.getquizById, [params.quizId], function (err, rows) {
        if (err) {
            res.send("查询失败" + err);
        } else {
            res.send({
                msg: '查询成功',
                result: rows
            });
        }
    });
});

// 图片上传
var upload = multer({
    dest: "public/images/quiz"
  });
  router.post("/upload", upload.single("file"), function (req, res, next) {
    var file = req.file;
    res.send({
      Url: file.path,
    });
  });

// 图片下载
router.get("/acquire", function (req, res, next) {
    var params = url.parse(req.url, true).query;
    var path = params.path;
    var data = fs.readFileSync("./" + path);
    res.write(data);
  });



  module.exports = router;


