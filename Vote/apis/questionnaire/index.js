const express = require('express');
const router = express.Router();

router.use('/create', require('./create_questionnaire'));
router.use('/detail', require('./detail_questionnaire'));
router.use('/list', require('./list_questionnaire'));
router.use('/audit', require('./audit_questionnaire'));
router.use('/addpv', require('./addpv_questionnaire'));
router.use('/update', require('./update_questionnaire'));

module.exports = router;
