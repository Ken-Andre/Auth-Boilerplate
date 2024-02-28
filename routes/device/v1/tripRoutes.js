/**
 * tripRoutes.js
 * @description :: CRUD API routes for trip
 */

const express = require('express');
const router = express.Router();
const tripController = require('../../../controller/device/v1/tripController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/trip/create').post(auth(PLATFORM.DEVICE),checkRolePermission,tripController.addTrip);
router.route('/device/api/v1/trip/list').post(auth(PLATFORM.DEVICE),checkRolePermission,tripController.findAllTrip);
router.route('/device/api/v1/trip/count').post(auth(PLATFORM.DEVICE),checkRolePermission,tripController.getTripCount);
router.route('/device/api/v1/trip/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,tripController.getTrip);
router.route('/device/api/v1/trip/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,tripController.updateTrip);    
router.route('/device/api/v1/trip/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,tripController.partialUpdateTrip);

module.exports = router;
