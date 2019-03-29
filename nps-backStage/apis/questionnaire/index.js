const express = require('express');
const router = express.Router();

router.use('/create', require('./create_questionnaire'));

module.exports = router;
