/**
 * TripRoutes.js
 * @description :: CRUD API routes for Trip
 */

const express = require('express');
const router = express.Router();
const TripController = require('../../controller/admin/TripController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/trip/create').post(auth(PLATFORM.ADMIN),checkRolePermission,TripController.addTrip);
router.route('/admin/trip/list').post(auth(PLATFORM.ADMIN),checkRolePermission,TripController.findAllTrip);
router.route('/admin/trip/count').post(auth(PLATFORM.ADMIN),checkRolePermission,TripController.getTripCount);
router.route('/admin/trip/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,TripController.getTrip);
router.route('/admin/trip/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,TripController.updateTrip);    
router.route('/admin/trip/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,TripController.partialUpdateTrip);
router.route('/admin/trip/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,TripController.softDeleteTrip);
router.route('/admin/trip/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,TripController.softDeleteManyTrip);
router.route('/admin/trip/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,TripController.bulkInsertTrip);
router.route('/admin/trip/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,TripController.bulkUpdateTrip);
router.route('/admin/trip/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,TripController.deleteTrip);
router.route('/admin/trip/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,TripController.deleteManyTrip);

module.exports = router;
