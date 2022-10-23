const express = require("express");
const router = express.Router();

const { ipCounter } = require("../controllers/ipCounter");

router.get("/ip-counter", ipCounter);

module.exports = router;
