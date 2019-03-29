const express = require('express');
const router = express.Router();
const utils = require('../../common/utils');
const log = require('../../middleware/log');
const fs=require('fs'); 

const multer = require("multer");
const path = require('path');
// 设置图片存储路径
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const imgPath = path.resolve(__dirname, `../../upload/${new Date().toISOString().slice(0,10)}`)
    fsAccess(imgPath).then(_ =>{
      cb(null, imgPath);
    }).catch(_ => {
      //创建文件夹
      return fsMkdir(imgPath);
    }).then(_ => {
      cb(null, imgPath);
    }).catch(err => {
      log.error(err)
    })
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${Math.round(Math.random()*1000000)}${path.extname(file.originalname)}`)
  }
})
// 添加配置文件到muler对象。
const upload = multer({
  storage: storage,
});


const handler = function (req, res, next) {
  // 读取上传的图片信息
  var files = req.files;

  if (!files[0]) {
    res.json(utils.dealFail(null, '上传失败'));
  } else {
    res.json(utils.dealSuccess({
        url: files[0].path.replace(/\\/g,'/')
      },
      '上传图片成功'
    ))
  }
}

function fsAccess(path) {
  return new Promise((resolve, reject) => {
    fs.access(path, function(err){
      if(err) {
        reject()
      }
      resolve()
    })
  }) 
}
function fsMkdir(path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, function(err) {
       if(err) {
         reject(err)
       } 
       resolve()
    })
  })
}

router.post('/', upload.array('img', 1), handler);

module.exports = router;