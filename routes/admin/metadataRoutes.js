/**
 * metadataRoutes.js
 * @description :: CRUD API routes for metadata
 */

const express = require('express');
const router = express.Router();
const metadataController = require('../../controller/admin/metadataController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/metadata/create').post(auth(PLATFORM.ADMIN),checkRolePermission,metadataController.addMetadata);
router.route('/admin/metadata/list').post(auth(PLATFORM.ADMIN),checkRolePermission,metadataController.findAllMetadata);
router.route('/admin/metadata/count').post(auth(PLATFORM.ADMIN),checkRolePermission,metadataController.getMetadataCount);
router.route('/admin/metadata/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,metadataController.getMetadata);
router.route('/admin/metadata/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,metadataController.updateMetadata);    
router.route('/admin/metadata/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,metadataController.partialUpdateMetadata);
router.route('/admin/metadata/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,metadataController.softDeleteMetadata);
router.route('/admin/metadata/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,metadataController.softDeleteManyMetadata);
router.route('/admin/metadata/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,metadataController.bulkInsertMetadata);
router.route('/admin/metadata/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,metadataController.bulkUpdateMetadata);
router.route('/admin/metadata/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,metadataController.deleteMetadata);
router.route('/admin/metadata/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,metadataController.deleteManyMetadata);

module.exports = router;
