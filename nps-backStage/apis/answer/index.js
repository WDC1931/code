const express = require('express');
const router = express.Router();

router.use('/create', require('./create_answer'));

module.exports = router;
