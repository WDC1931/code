const express = require("express");
var url = require("url");
var multer = require("multer");
var fs = require("fs");

var router = express.Router();
const connection = require("../config/DBConfig");
const voteSQL = require("../dao/vote.dao");

// 保存投票
router.post("/save", function (req, res, next) {
  var body = req.body;
  connection.query(voteSQL.insert, [body.type, body.deadline, body.anonymity, body.isLimit, body.title, body.detail, body.optionsType, body.options, body.totalNum], function (err, result) {
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

// 投票列表
router.get("/list", function (req, res, next) {
  connection.query(voteSQL.queryAll, function (err, result) {
    if (err) {
      res.send("查询失败:");
    } else {
      res.send(result);
    }
  });
});

// 图片上传
var upload = multer({
  dest: "public/images/vote"
});
router.post("/upload", upload.single("file"), function (req, res, next) {
  var file = req.file;
  // console.log("文件类型：", file.mimetype);
  // console.log("原始文件名：", file.originalname);
  // console.log("文件大小：", file.size);
  // console.log("文件保存路径：", file.path);
  res.send({
    msg: '上传成功',
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

// 更新票数
router.post("/update", function (req, res, next) {
  var body = req.body;

  connection.query(voteSQL.update, [body.options, body.totalNum, body.voteId], function (err, rows) {
    if (err) {
      res.send("更新失败" + err);
    } else {
      res.send("更新成功");
    }
  });
});

module.exports = router;