/**
 * tripuserController.js
 * @description : exports action methods for tripuser.
 */

const Tripuser = require('../../../model/tripuser');
const tripuserSchemaKey = require('../../../utils/validation/tripuserValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Tripuser in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Tripuser. {status, message, data}
 */ 
const addTripuser = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    dataToCreate = {
      ...{ 'user':(req && req.user && req.user.id ? req.user.id.toString() : null) },
      ...dataToCreate,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      tripuserSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Tripuser(dataToCreate);
    let createdTripuser = await dbService.create(Tripuser,dataToCreate);
    return res.success({ data : createdTripuser });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Tripuser in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Tripusers. {status, message, data}
 */
const bulkInsertTripuser = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...{ 'user':(req && req.user && req.user.id ? req.user.id.toString() : null) },
        ...dataToCreate[i],
      };
    }
    let createdTripusers = await dbService.create(Tripuser,dataToCreate);
    createdTripusers = { count: createdTripusers ? createdTripusers.length : 0 };
    return res.success({ data:{ count:createdTripusers.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Tripuser from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Tripuser(s). {status, message, data}
 */
const findAllTripuser = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      tripuserSchemaKey.findFilterKeys,
      Tripuser.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Tripuser, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundTripusers = await dbService.paginate( Tripuser,query,options);
    if (!foundTripusers || !foundTripusers.data || !foundTripusers.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundTripusers });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Tripuser from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Tripuser. {status, message, data}
 */
const getTripuser = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundTripuser = await dbService.findOne(Tripuser,query, options);
    if (!foundTripuser){
      return res.recordNotFound();
    }
    return res.success({ data :foundTripuser });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Tripuser.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getTripuserCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      tripuserSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedTripuser = await dbService.count(Tripuser,where);
    return res.success({ data : { count: countedTripuser } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Tripuser with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Tripuser.
 * @return {Object} : updated Tripuser. {status, message, data}
 */
const updateTripuser = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      tripuserSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTripuser = await dbService.updateOne(Tripuser,query,dataToUpdate);
    if (!updatedTripuser){
      return res.recordNotFound();
    }
    return res.success({ data :updatedTripuser });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Tripuser with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Tripusers.
 * @return {Object} : updated Tripusers. {status, message, data}
 */
const bulkUpdateTripuser = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...req.body.data,
        updatedBy : req.user.id
      };
    }
    let updatedTripuser = await dbService.updateMany(Tripuser,filter,dataToUpdate);
    if (!updatedTripuser){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedTripuser } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Tripuser with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Tripuser.
 * @return {obj} : updated Tripuser. {status, message, data}
 */
const partialUpdateTripuser = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      tripuserSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTripuser = await dbService.updateOne(Tripuser, query, dataToUpdate);
    if (!updatedTripuser) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedTripuser });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Tripuser from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Tripuser.
 * @return {Object} : deactivated Tripuser. {status, message, data}
 */
const softDeleteTripuser = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedTripuser = await dbService.updateOne(Tripuser, query, updateBody);
    if (!updatedTripuser){
      return res.recordNotFound();
    }
    return res.success({ data:updatedTripuser });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Tripuser from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Tripuser. {status, message, data}
 */
const deleteTripuser = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedTripuser = await dbService.deleteOne(Tripuser, query);
    if (!deletedTripuser){
      return res.recordNotFound();
    }
    return res.success({ data :deletedTripuser });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Tripuser in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyTripuser = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedTripuser = await dbService.deleteMany(Tripuser,query);
    if (!deletedTripuser){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedTripuser } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Tripuser from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Tripuser.
 * @return {Object} : number of deactivated documents of Tripuser. {status, message, data}
 */
const softDeleteManyTripuser = async (req,res) => {
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
    let updatedTripuser = await dbService.updateMany(Tripuser,query, updateBody);
    if (!updatedTripuser) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedTripuser } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addTripuser,
  bulkInsertTripuser,
  findAllTripuser,
  getTripuser,
  getTripuserCount,
  updateTripuser,
  bulkUpdateTripuser,
  partialUpdateTripuser,
  softDeleteTripuser,
  deleteTripuser,
  deleteManyTripuser,
  softDeleteManyTripuser    
};