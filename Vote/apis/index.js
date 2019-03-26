const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect('h5/');
});

module.exports = router;
