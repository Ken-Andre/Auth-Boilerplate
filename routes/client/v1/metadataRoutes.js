/**
 * metadataRoutes.js
 * @description :: CRUD API routes for metadata
 */

const express = require('express');
const router = express.Router();
const metadataController = require('../../../controller/client/v1/metadataController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/metadata/create').post(auth(PLATFORM.CLIENT),checkRolePermission,metadataController.addMetadata);
router.route('/client/api/v1/metadata/list').post(auth(PLATFORM.CLIENT),checkRolePermission,metadataController.findAllMetadata);
router.route('/client/api/v1/metadata/count').post(auth(PLATFORM.CLIENT),checkRolePermission,metadataController.getMetadataCount);
router.route('/client/api/v1/metadata/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,metadataController.getMetadata);
router.route('/client/api/v1/metadata/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,metadataController.updateMetadata);    
router.route('/client/api/v1/metadata/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,metadataController.partialUpdateMetadata);
router.route('/client/api/v1/metadata/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,metadataController.softDeleteMetadata);
router.route('/client/api/v1/metadata/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,metadataController.softDeleteManyMetadata);
router.route('/client/api/v1/metadata/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,metadataController.bulkInsertMetadata);
router.route('/client/api/v1/metadata/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,metadataController.bulkUpdateMetadata);
router.route('/client/api/v1/metadata/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,metadataController.deleteMetadata);
router.route('/client/api/v1/metadata/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,metadataController.deleteManyMetadata);

module.exports = router;
