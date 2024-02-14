/**
 * TripRoutes.js
 * @description :: CRUD API routes for Trip
 */

const express = require('express');
const router = express.Router();
const TripController = require('../../../controller/client/v1/TripController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/trip/create').post(auth(PLATFORM.CLIENT),checkRolePermission,TripController.addTrip);
router.route('/client/api/v1/trip/list').post(auth(PLATFORM.CLIENT),checkRolePermission,TripController.findAllTrip);
router.route('/client/api/v1/trip/count').post(auth(PLATFORM.CLIENT),checkRolePermission,TripController.getTripCount);
router.route('/client/api/v1/trip/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,TripController.getTrip);
router.route('/client/api/v1/trip/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,TripController.updateTrip);    
router.route('/client/api/v1/trip/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,TripController.partialUpdateTrip);
router.route('/client/api/v1/trip/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,TripController.softDeleteTrip);
router.route('/client/api/v1/trip/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,TripController.softDeleteManyTrip);
router.route('/client/api/v1/trip/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,TripController.bulkInsertTrip);
router.route('/client/api/v1/trip/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,TripController.bulkUpdateTrip);
router.route('/client/api/v1/trip/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,TripController.deleteTrip);
router.route('/client/api/v1/trip/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,TripController.deleteManyTrip);

module.exports = router;
