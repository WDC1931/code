const express = require('express');
const router = express.Router();

// 端接口
router.use('/questionnaire', require('./questionnaire/index'));

module.exports = router;
