const express = require('express');
const validateRequiredFields = require('../middleware/validateRequiredFields');
const validateQueryParams = require('../middleware/validateQueryParams');
const catchHandler = require('../utils/catchHandler');
const userController = require("../controllers/user");

const router = express.Router();

// 查找用户列表
router.get('/list', catchHandler(userController.getUserList));

module.exports = router;
