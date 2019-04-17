const express = require('express');
const router = express.Router();

// 端接口
router.use('/client', require('./client/client'));

module.exports = router;






