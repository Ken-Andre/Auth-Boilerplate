/**
 * index.js
 * @description :: index route file of device platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/device/auth',require('./auth'));
router.use(require('./TripRoutes'));
router.use(require('./metadataRoutes'));
router.use(require('./tripuserRoutes'));
router.use(require('./userRoutes'));
router.use(require('./stateRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
