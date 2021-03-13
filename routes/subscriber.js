const express = require("express");
const router = express.Router();
const subscriberCtrl = require("../controllers/subscriberCtrl");

router.get("/:topic", subscriberCtrl.handle);

module.exports = router;
