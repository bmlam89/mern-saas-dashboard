const express = require("express");
const { getUser } = require("../controllers/general.js");

router = express.Router();

router.get("/user/:id", getUser);

module.exports = router;