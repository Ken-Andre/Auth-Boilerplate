/**
 * categoryRoutes.js
 * @description :: CRUD API routes for category
 */

const express = require('express');
const router = express.Router();
const categoryController = require('../../../controller/device/v1/categoryController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

module.exports = router;
