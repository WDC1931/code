const express = require('express');
const router = express.Router();

// 端接口
router.use('/', require('./client/client'));
router.use('/questionnaire', require('./questionnaire/index'));
router.use('/answer', require('./answer/index'));
router.use('/statistic', require('./statistic'));
// 图片相关服务
router.use('/image', require('./image'))

module.exports = router;
