/**
 * stateRoutes.js
 * @description :: CRUD API routes for state
 */

const express = require('express');
const router = express.Router();
const stateController = require('../../../controller/client/v1/stateController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/client/api/v1/state/create').post(stateController.addState);
router.route('/client/api/v1/state/addBulk').post(stateController.bulkInsertState);
router.route('/client/api/v1/state/list').post(stateController.findAllState);
router.route('/client/api/v1/state/count').post(stateController.getStateCount);
router.route('/client/api/v1/state/:id').get(stateController.getState);
router.route('/client/api/v1/state/update/:id').put(stateController.updateState);    
router.route('/client/api/v1/state/partial-update/:id').put(stateController.partialUpdateState);
router.route('/client/api/v1/state/updateBulk').put(stateController.bulkUpdateState);
router.route('/client/api/v1/state/softDelete/:id').put(stateController.softDeleteState);
router.route('/client/api/v1/state/softDeleteMany').put(stateController.softDeleteManyState);
router.route('/client/api/v1/state/delete/:id').delete(stateController.deleteState);
router.route('/client/api/v1/state/deleteMany').post(stateController.deleteManyState);

module.exports = router;
