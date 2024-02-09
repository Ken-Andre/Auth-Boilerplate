/**
 * tripuserRoutes.js
 * @description :: CRUD API routes for tripuser
 */

const express = require('express');
const router = express.Router();
const tripuserController = require('../../../controller/device/v1/tripuserController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/tripuser/create').post(auth(PLATFORM.DEVICE),checkRolePermission,tripuserController.addTripuser);
router.route('/device/api/v1/tripuser/list').post(auth(PLATFORM.DEVICE),checkRolePermission,tripuserController.findAllTripuser);
router.route('/device/api/v1/tripuser/count').post(auth(PLATFORM.DEVICE),checkRolePermission,tripuserController.getTripuserCount);
router.route('/device/api/v1/tripuser/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,tripuserController.getTripuser);
router.route('/device/api/v1/tripuser/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,tripuserController.updateTripuser);    
router.route('/device/api/v1/tripuser/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,tripuserController.partialUpdateTripuser);
router.route('/device/api/v1/tripuser/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,tripuserController.softDeleteTripuser);
router.route('/device/api/v1/tripuser/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,tripuserController.softDeleteManyTripuser);
router.route('/device/api/v1/tripuser/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,tripuserController.bulkInsertTripuser);
router.route('/device/api/v1/tripuser/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,tripuserController.bulkUpdateTripuser);
router.route('/device/api/v1/tripuser/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,tripuserController.deleteTripuser);
router.route('/device/api/v1/tripuser/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,tripuserController.deleteManyTripuser);

module.exports = router;
