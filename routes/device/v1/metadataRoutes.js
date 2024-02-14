/**
 * metadataRoutes.js
 * @description :: CRUD API routes for metadata
 */

const express = require('express');
const router = express.Router();
const metadataController = require('../../../controller/device/v1/metadataController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/metadata/create').post(auth(PLATFORM.DEVICE),checkRolePermission,metadataController.addMetadata);
router.route('/device/api/v1/metadata/list').post(auth(PLATFORM.DEVICE),checkRolePermission,metadataController.findAllMetadata);
router.route('/device/api/v1/metadata/count').post(auth(PLATFORM.DEVICE),checkRolePermission,metadataController.getMetadataCount);
router.route('/device/api/v1/metadata/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,metadataController.getMetadata);
router.route('/device/api/v1/metadata/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,metadataController.updateMetadata);    
router.route('/device/api/v1/metadata/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,metadataController.partialUpdateMetadata);
router.route('/device/api/v1/metadata/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,metadataController.softDeleteMetadata);
router.route('/device/api/v1/metadata/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,metadataController.softDeleteManyMetadata);
router.route('/device/api/v1/metadata/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,metadataController.bulkInsertMetadata);
router.route('/device/api/v1/metadata/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,metadataController.bulkUpdateMetadata);
router.route('/device/api/v1/metadata/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,metadataController.deleteMetadata);
router.route('/device/api/v1/metadata/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,metadataController.deleteManyMetadata);

module.exports = router;
