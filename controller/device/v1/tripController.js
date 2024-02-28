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
 * @description : create document of Trip in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Trip. {status, message, data}
 */ 
const addTrip = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      tripSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Trip(dataToCreate);
    let createdTrip = await dbService.create(Trip,dataToCreate);
    return res.success({ data : createdTrip });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
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
 * @description : update document of Trip with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Trip.
 * @return {Object} : updated Trip. {status, message, data}
 */
const updateTrip = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      tripSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTrip = await dbService.updateOne(Trip,query,dataToUpdate);
    if (!updatedTrip){
      return res.recordNotFound();
    }
    return res.success({ data :updatedTrip });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : partially update document of Trip with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Trip.
 * @return {obj} : updated Trip. {status, message, data}
 */
const partialUpdateTrip = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    delete req.body['addedBy'];
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      tripSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTrip = await dbService.updateOne(Trip, query, dataToUpdate);
    if (!updatedTrip) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedTrip });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

module.exports = {
  addTrip,
  findAllTrip,
  getTrip,
  getTripCount,
  updateTrip,
  partialUpdateTrip    
};