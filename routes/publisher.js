const express = require("express");
const router = express.Router();
const publisherCtrl = require("../controllers/publisherCtrl");

router.post("/subscribe/:topic", publisherCtrl.subscribe);
router.post("/publish/:topic", publisherCtrl.publish);

module.exports = router;
