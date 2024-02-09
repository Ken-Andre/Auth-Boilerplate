/**
 * index.js
 * @description :: index route file of client platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/client/auth',require('./auth'));
router.use(require('./tripuserRoutes'));
router.use(require('./userRoutes'));
router.use(require('./categoryRoutes'));
router.use(require('./bannerRoutes'));
router.use(require('./stateRoutes'));
router.use(require('./uploadRoutes'));

router.use('/',require('./WelcomeRoutes'));

module.exports = router;
