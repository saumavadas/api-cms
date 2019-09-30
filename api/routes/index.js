const express = require("express");
const router = express.Router();
const IndexController = require('../controllers/index');
router.get("/", IndexController.index);
router.post("/", IndexController.index);
module.exports = router;
