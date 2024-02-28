/**
 * index.js
 * @description :: index route file of client platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/client/auth',require('./auth'));
router.use(require('./tripRoutes'));
router.use(require('./metadataRoutes'));
router.use(require('./userRoutes'));
router.use(require('./stateRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./projectRouteRoutes'));
router.use(require('./routeRoleRoutes'));
router.use(require('./userRoleRoutes'));
router.use(require('./uploadRoutes'));

router.use('/',require('./WelcomeRoutes'));

module.exports = router;
