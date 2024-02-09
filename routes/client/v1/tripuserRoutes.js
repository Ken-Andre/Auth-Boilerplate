/**
 * tripuserRoutes.js
 * @description :: CRUD API routes for tripuser
 */

const express = require('express');
const router = express.Router();
const tripuserController = require('../../../controller/client/v1/tripuserController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/tripuser/create').post(auth(PLATFORM.CLIENT),checkRolePermission,tripuserController.addTripuser);
router.route('/client/api/v1/tripuser/list').post(auth(PLATFORM.CLIENT),checkRolePermission,tripuserController.findAllTripuser);
router.route('/client/api/v1/tripuser/count').post(auth(PLATFORM.CLIENT),checkRolePermission,tripuserController.getTripuserCount);
router.route('/client/api/v1/tripuser/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,tripuserController.getTripuser);
router.route('/client/api/v1/tripuser/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,tripuserController.updateTripuser);    
router.route('/client/api/v1/tripuser/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,tripuserController.partialUpdateTripuser);
router.route('/client/api/v1/tripuser/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,tripuserController.softDeleteTripuser);
router.route('/client/api/v1/tripuser/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,tripuserController.softDeleteManyTripuser);
router.route('/client/api/v1/tripuser/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,tripuserController.bulkInsertTripuser);
router.route('/client/api/v1/tripuser/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,tripuserController.bulkUpdateTripuser);
router.route('/client/api/v1/tripuser/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,tripuserController.deleteTripuser);
router.route('/client/api/v1/tripuser/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,tripuserController.deleteManyTripuser);

module.exports = router;
