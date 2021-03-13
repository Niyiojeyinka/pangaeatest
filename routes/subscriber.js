const express = require("express");
const router = express.Router();
const subscriberCtrl = require("../controllers/subscriberCtrl");

router.get("/:topic", subscriberCtrl.handle);
router.post("/:topic", subscriberCtrl.receiveNotification);

module.exports = router;
