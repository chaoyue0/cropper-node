const express = require('express');
const userController = require('../controllers/auth');
const validateRequiredFields = require('../middleware/validateRequiredFields');
const validateQueryParams = require('../middleware/validateQueryParams');
const catchHandler = require('../utils/catchHandler');

const router = express.Router();

router.get('/remove', validateQueryParams(['id']), catchHandler(userController.destroy));

router.post('/register', validateRequiredFields(['name', 'password']), catchHandler(userController.register));
router.post('/modifyName', validateRequiredFields(['name', 'id']), catchHandler(userController.modifyName));

module.exports = router;
