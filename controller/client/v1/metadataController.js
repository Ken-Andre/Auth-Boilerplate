/**
 * metadataController.js
 * @description : exports action methods for metadata.
 */

const Metadata = require('../../../model/metadata');
const metadataSchemaKey = require('../../../utils/validation/metadataValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');

module.exports = {};