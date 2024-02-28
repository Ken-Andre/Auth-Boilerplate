/**
 * tripController.js
 * @description : exports action methods for trip.
 */

const Trip = require('../../../model/trip');
const tripSchemaKey = require('../../../utils/validation/tripValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
    
/**
 * @description : find all documents of Trip from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Trip(s). {status, message, data}
 */
const findAllTrip = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      tripSchemaKey.findFilterKeys,
      Trip.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Trip, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundTrips = await dbService.paginate( Trip,query,options);
    if (!foundTrips || !foundTrips.data || !foundTrips.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundTrips });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Trip from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Trip. {status, message, data}
 */
const getTrip = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundTrip = await dbService.findOne(Trip,query, options);
    if (!foundTrip){
      return res.recordNotFound();
    }
    return res.success({ data :foundTrip });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Trip.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getTripCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      tripSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedTrip = await dbService.count(Trip,where);
    return res.success({ data : { count: countedTrip } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate document of Trip from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Trip.
 * @return {Object} : deactivated Trip. {status, message, data}
 */
const softDeleteTrip = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedTrip = await dbService.updateOne(Trip, query, updateBody);
    if (!updatedTrip){
      return res.recordNotFound();
    }
    return res.success({ data:updatedTrip });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Trip from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Trip.
 * @return {Object} : number of deactivated documents of Trip. {status, message, data}
 */
const softDeleteManyTrip = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedTrip = await dbService.updateMany(Trip,query, updateBody);
    if (!updatedTrip) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedTrip } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  findAllTrip,
  getTrip,
  getTripCount,
  softDeleteTrip,
  softDeleteManyTrip    
};