const express = require('express');
const catchHandler = require("../utils/catchHandler");
const photoController = require("../controllers/photo");
const parseFile = require("../middleware/handleFile");
const validateQueryParams = require("../middleware/validateQueryParams");
const validateRequiredFields = require("../middleware/validateRequiredFields");

const router = express.Router();

router.post('/upload', parseFile, catchHandler(photoController.upload));
router.post('/list', validateRequiredFields(['userId']), catchHandler(photoController.getPhotoList))

router.get('/remove', validateQueryParams(['id']), catchHandler(photoController.removePhoto))

module.exports = router;
