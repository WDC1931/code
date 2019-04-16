const express = require("express");
const router = express.Router();

const controller = require("../controllers/login");

router.post("/", controller);

router.all("/", function(req, res, next) {
  res.sendStatus(403);
});

module.exports = router;
