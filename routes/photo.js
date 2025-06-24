const express = require('express');
const catchHandler = require("../utils/catchHandler");
const photoController = require("../controllers/photo");
const multer = require("../middleware/multer");
const validateQueryParams = require("../middleware/validateQueryParams");
const validateRequiredFields = require("../middleware/validateRequiredFields");

const router = express.Router();

router.get('/remove', validateQueryParams(['id']), catchHandler(photoController.removePhoto))

router.post('/upload', multer, catchHandler(photoController.upload));
router.post('/list', validateRequiredFields(['userId']), catchHandler(photoController.getPhotoList))

module.exports = router;
