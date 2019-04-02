const express = require("express");
var url = require("url");
var multer = require("multer");
var fs = require("fs");

var router = express.Router();
const connection = require("../config/DBConfig");

// 连接测试
connection.connect(function(err) {
  if (err) {
    console.log("[query] - :" + err);
    return;
  }
  console.log("connection connect succeed!");
});

// 保存投票
router.post("/save", function(req, res, next) {
  var type = req.body.type;
  var deadline = req.body.deadline;
  var anonymity = req.body.anonymity;
  var title = req.body.title;
  var detail = req.body.detail;
  var optionsType = req.body.optionsType;
  var options = req.body.options;

  connection.query(
    "insert into vote_list(type,deadline,anonymity,title,detail,optionsType,options) values('" +
      type +
      "','" +
      deadline +
      "','" +
      anonymity +
      "','" +
      title +
      "','" +
      detail +
      "','" +
      optionsType +
      "','" +
      options +
      "')",

    function(err, result) {
      if (err) {
        res.send("保存失败" + err);
      } else {
        res.send("保存成功,投票id为：" + result.insertId);
      }
    }
  );
});

// 返回投票列表
router.get("/list", function(req, res, next) {
  var sql = "select * from vote_list";

  connection.query(sql, function(err, result) {
    if (err) {
      res.send("查询失败:");
    } else {
      res.send(result);
    }
  });
});

// 图片上传
var upload = multer({ dest: "public/images" });
router.post("/upload", upload.single("file"), function(req, res, next) {
  var file = req.file;

  console.log("文件类型：", file.mimetype);
  console.log("原始文件名：", file.originalname);
  console.log("文件大小：", file.size);
  console.log("文件保存路径：", file.path);

  res.send("Url：" + file.path);
});

// 图片下载
router.get("/acquire", function(req, res, next) {
  var params = url.parse(req.url, true).query;
  var path = params.path;
  var data = fs.readFileSync("./" + path);
  res.write(data);
});

// 查询投票（根据ID）
router.get("/serach", function(req, res, next) {
  var params = url.parse(req.url, true).query;
  var id = params.voteId;
  console.log(params);
  var sql = "select * from vote_list where voteId = '" + id + "'";

  connection.query(sql, function(err, result) {
    if (err) {
      res.send("查询失败: " + err);
    } else {
      res.send({
        msg: "查询成功",
        result: result
      });
    }
  });
});

module.exports = router;
