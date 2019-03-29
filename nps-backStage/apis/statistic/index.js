const express = require('express');
const router = express.Router();

router.use('/pandect', require('./pandect_statistic'));

module.exports = router;
