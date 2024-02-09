/**
 * index.js
 * @description :: index route file of device platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/device/auth',require('./auth'));
router.use(require('./tripuserRoutes'));
router.use(require('./userRoutes'));
router.use(require('./categoryRoutes'));
router.use(require('./bannerRoutes'));
router.use(require('./stateRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
