/**
 * tripuserRoutes.js
 * @description :: CRUD API routes for tripuser
 */

const express = require('express');
const router = express.Router();
const tripuserController = require('../../controller/admin/tripuserController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/tripuser/create').post(auth(PLATFORM.ADMIN),checkRolePermission,tripuserController.addTripuser);
router.route('/admin/tripuser/list').post(auth(PLATFORM.ADMIN),checkRolePermission,tripuserController.findAllTripuser);
router.route('/admin/tripuser/count').post(auth(PLATFORM.ADMIN),checkRolePermission,tripuserController.getTripuserCount);
router.route('/admin/tripuser/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,tripuserController.getTripuser);
router.route('/admin/tripuser/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,tripuserController.updateTripuser);    
router.route('/admin/tripuser/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,tripuserController.partialUpdateTripuser);
router.route('/admin/tripuser/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,tripuserController.softDeleteTripuser);
router.route('/admin/tripuser/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,tripuserController.softDeleteManyTripuser);
router.route('/admin/tripuser/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,tripuserController.bulkInsertTripuser);
router.route('/admin/tripuser/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,tripuserController.bulkUpdateTripuser);
router.route('/admin/tripuser/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,tripuserController.deleteTripuser);
router.route('/admin/tripuser/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,tripuserController.deleteManyTripuser);

module.exports = router;
