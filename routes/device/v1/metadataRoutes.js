/**
 * metadataRoutes.js
 * @description :: CRUD API routes for metadata
 */

const express = require('express');
const router = express.Router();
const metadataController = require('../../../controller/device/v1/metadataController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

module.exports = router;
