/**
 * tripRoutes.js
 * @description :: CRUD API routes for trip
 */

const express = require('express');
const router = express.Router();
const tripController = require('../../../controller/client/v1/tripController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/trip/list').post(auth(PLATFORM.CLIENT),checkRolePermission,tripController.findAllTrip);
router.route('/client/api/v1/trip/count').post(auth(PLATFORM.CLIENT),checkRolePermission,tripController.getTripCount);
router.route('/client/api/v1/trip/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,tripController.getTrip);
router.route('/client/api/v1/trip/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,tripController.softDeleteTrip);
router.route('/client/api/v1/trip/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,tripController.softDeleteManyTrip);

module.exports = router;
