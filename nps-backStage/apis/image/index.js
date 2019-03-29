const express = require('express');
const router = express.Router();

router.use('/qrcode', require('./qrcode'));
router.use('/upload', require('./upload'))
module.exports = router;
