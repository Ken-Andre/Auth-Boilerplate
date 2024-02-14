/**
 * stateRoutes.js
 * @description :: CRUD API routes for state
 */

const express = require('express');
const router = express.Router();
const stateController = require('../../controller/admin/stateController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/state/create').post(auth(PLATFORM.ADMIN),checkRolePermission,stateController.addState);
router.route('/admin/state/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,stateController.bulkInsertState);
router.route('/admin/state/list').post(stateController.findAllState);
router.route('/admin/state/count').post(stateController.getStateCount);
router.route('/admin/state/:id').get(stateController.getState);
router.route('/admin/state/update/:id').put(stateController.updateState);    
router.route('/admin/state/partial-update/:id').put(stateController.partialUpdateState);
router.route('/admin/state/updateBulk').put(stateController.bulkUpdateState);
router.route('/admin/state/softDelete/:id').put(stateController.softDeleteState);
router.route('/admin/state/softDeleteMany').put(stateController.softDeleteManyState);
router.route('/admin/state/delete/:id').delete(stateController.deleteState);
router.route('/admin/state/deleteMany').post(stateController.deleteManyState);

module.exports = router;
