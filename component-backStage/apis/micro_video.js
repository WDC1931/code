const express = require("express");
var url = require("url");
var multer = require("multer");
var fs = require("fs");

var router = express.Router();
const videoList = require("../models/micro_video.model");

// 图片上传
var upload = multer({
  dest: "public/micro_video"
});
router.post("/upload", upload.single("file"), function(req, res, next) {
  var file = req.file;

  res.send({
    msg: "上传成功",
    Url: file.path
  });
});

// 图片下载
router.get("/getPic", function(req, res, next) {
  var params = url.parse(req.url, true).query;
  var path = params.path;
  var data = fs.readFileSync("./" + path);
  res.write(data);
});

// 发布数据
router.post("/upLoadData", function(req, res, next) {
  var body = req.body;

  videoList
    .create({
      videoId: body.videoId,
      logo: body.logo,
      title: body.title,
      video: body.video,
      text: body.text,
      other: body.other
    })
    .then(data => {
      res.send({
        msg: "发送数据成功!"
      });
    })
    .catch(err => {
      res.send("请输入正确数据");
    });
});

// 获取数据
router.get("/getVideoData", function(req, res, next) {
  var params = url.parse(request.url, true).query;
  videoList
    .findAll({
      where: { videoId: params.videoId }
    })
    .then(data => {
      res.send(data);
    });
});

module.exports = router;
