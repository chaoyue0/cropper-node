const express = require('express');
const authController = require('../controllers/auth');
const validateRequiredFields = require('../middleware/validateRequiredFields');
const validateQueryParams = require('../middleware/validateQueryParams');
const catchHandler = require('../utils/catchHandler');

const router = express.Router();

router.get('/remove', validateQueryParams(['id']), catchHandler(authController.destroy));

router.post('/register', validateRequiredFields(['name', 'password']), catchHandler(authController.register));
router.post('/login', validateRequiredFields(['name', 'password']), catchHandler(authController.login));
router.post('/modifyName', validateRequiredFields(['name', 'id']), catchHandler(authController.modifyName));

module.exports = router;
