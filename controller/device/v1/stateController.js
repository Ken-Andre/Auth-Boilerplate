/**
 * stateController.js
 * @description : exports action methods for state.
 */

const State = require('../../../model/state');
const stateSchemaKey = require('../../../utils/validation/stateValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');

module.exports = {};