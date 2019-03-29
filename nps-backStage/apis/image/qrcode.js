const express = require('express');
const router = express.Router();

const utils = require('../../common/utils');
const log = require('../../middleware/log');

const qr = require('qr-image');
// 参数校验
const validateParams = (req, res, next) => {
  utils.validateParams(req, res, next, ['url']);
};

const qrcode = function(req, res, next) {
    log.debug('qrcode接口参数：' + JSON.stringify(req.query))
    
    var text = req.query.url;
    var download = req.query.download;
    try {
      if(download == 1) {
        log.debug('qrcode接口，下载')
        var img = qr.imageSync(text,{size :10, type:'png'});
        res.set({
          'Content-Disposition': "inline; filename=\"qrcode.png\""
        });
        res.send(img);
      } else {
        log.debug('qrcode接口，非下载')
        res.writeHead(200, {'Content-Type': 'image/png'});
        var img = qr.image(text,{size :10, type:'png'});
        img.pipe(res);
      }
    } catch (e) {
      log.error(e)
      // res.writeHead(414, {'Content-Type': 'text/html'});
      // res.end('<h1>414 Request-URI Too Large</h1>');
    }
}

router.get('/', validateParams, qrcode);

module.exports = router;
