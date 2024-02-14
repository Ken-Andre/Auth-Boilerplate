/**
 * TripRoutes.js
 * @description :: CRUD API routes for Trip
 */

const express = require('express');
const router = express.Router();
const TripController = require('../../../controller/device/v1/TripController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/trip/create').post(auth(PLATFORM.DEVICE),checkRolePermission,TripController.addTrip);
router.route('/device/api/v1/trip/list').post(auth(PLATFORM.DEVICE),checkRolePermission,TripController.findAllTrip);
router.route('/device/api/v1/trip/count').post(auth(PLATFORM.DEVICE),checkRolePermission,TripController.getTripCount);
router.route('/device/api/v1/trip/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,TripController.getTrip);
router.route('/device/api/v1/trip/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,TripController.updateTrip);    
router.route('/device/api/v1/trip/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,TripController.partialUpdateTrip);
router.route('/device/api/v1/trip/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,TripController.softDeleteTrip);
router.route('/device/api/v1/trip/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,TripController.softDeleteManyTrip);
router.route('/device/api/v1/trip/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,TripController.bulkInsertTrip);
router.route('/device/api/v1/trip/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,TripController.bulkUpdateTrip);
router.route('/device/api/v1/trip/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,TripController.deleteTrip);
router.route('/device/api/v1/trip/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,TripController.deleteManyTrip);

module.exports = router;
