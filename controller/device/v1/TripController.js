/**
 * TripController.js
 * @description : exports action methods for Trip.
 */

const Trip = require('../../../model/Trip');
const TripSchemaKey = require('../../../utils/validation/TripValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');

const common = require('../../../utils/common');
   
/**
 * @description : create document of Trip in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Trip. {status, message, data}
 */ 
const addTrip = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validate = validation.validateParamsWithJoi(dataToCreate, TripSchemaKey.schemaKeys);
    if (!validate.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validate.message}` });
    } 
    let checkUniqueFields = await common.checkUniqueFieldsInDatabase(Trip,[ '_id' ],dataToCreate,'INSERT');
    if (checkUniqueFields.isDuplicate) {
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }
    dataToCreate = new Trip(dataToCreate);
    let createdResult = await dbService.create(Trip, dataToCreate);
    if (createdResult) {   
      return  res.success({ data : createdResult });
    }
    return res.badRequest();
  } 
  catch (error){ 
    return  res.status(500).send({
      message: 'Internal Server Error',
      data: null 
    });
  }

};
    
/**
 * @description : create multiple documents of Trip in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Trips. {status, message, data}
 */
const bulkInsertTrip = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdTrips = await dbService.create(Trip,dataToCreate);
    createdTrips = { count: createdTrips ? createdTrips.length : 0 };
    return res.success({ data:{ count:createdTrips.count || 0 } });
  } catch (error){
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
      TripSchemaKey.findFilterKeys,
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
      TripSchemaKey.findFilterKeys,
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
      TripSchemaKey.updateSchemaKeys
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
 * @description : update multiple records of Trip with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Trips.
 * @return {Object} : updated Trips. {status, message, data}
 */
const bulkUpdateTrip = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    delete dataToUpdate['addedBy'];
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...req.body.data,
        updatedBy : req.user.id
      };
    }
    let updatedTrip = await dbService.updateMany(Trip,filter,dataToUpdate);
    if (!updatedTrip){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedTrip } });
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
      TripSchemaKey.updateSchemaKeys
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
 * @description : delete document of Trip from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Trip. {status, message, data}
 */
const deleteTrip = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedTrip = await dbService.deleteOne(Trip, query);
    if (!deletedTrip){
      return res.recordNotFound();
    }
    return res.success({ data :deletedTrip });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Trip in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyTrip = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedTrip = await dbService.deleteMany(Trip,query);
    if (!deletedTrip){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedTrip } });
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
  addTrip,
  bulkInsertTrip,
  findAllTrip,
  getTrip,
  getTripCount,
  updateTrip,
  bulkUpdateTrip,
  partialUpdateTrip,
  softDeleteTrip,
  deleteTrip,
  deleteManyTrip,
  softDeleteManyTrip    
};