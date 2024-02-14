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
   
/**
 * @description : create document of Metadata in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Metadata. {status, message, data}
 */ 
const addMetadata = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      metadataSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Metadata(dataToCreate);
    let createdMetadata = await dbService.create(Metadata,dataToCreate);
    return res.success({ data : createdMetadata });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Metadata in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Metadatas. {status, message, data}
 */
const bulkInsertMetadata = async (req,res)=>{
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
    let createdMetadatas = await dbService.create(Metadata,dataToCreate);
    createdMetadatas = { count: createdMetadatas ? createdMetadatas.length : 0 };
    return res.success({ data:{ count:createdMetadatas.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Metadata from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Metadata(s). {status, message, data}
 */
const findAllMetadata = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      metadataSchemaKey.findFilterKeys,
      Metadata.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Metadata, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundMetadatas = await dbService.paginate( Metadata,query,options);
    if (!foundMetadatas || !foundMetadatas.data || !foundMetadatas.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundMetadatas });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Metadata from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Metadata. {status, message, data}
 */
const getMetadata = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundMetadata = await dbService.findOne(Metadata,query, options);
    if (!foundMetadata){
      return res.recordNotFound();
    }
    return res.success({ data :foundMetadata });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Metadata.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getMetadataCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      metadataSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedMetadata = await dbService.count(Metadata,where);
    return res.success({ data : { count: countedMetadata } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Metadata with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Metadata.
 * @return {Object} : updated Metadata. {status, message, data}
 */
const updateMetadata = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      metadataSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedMetadata = await dbService.updateOne(Metadata,query,dataToUpdate);
    if (!updatedMetadata){
      return res.recordNotFound();
    }
    return res.success({ data :updatedMetadata });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Metadata with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Metadatas.
 * @return {Object} : updated Metadatas. {status, message, data}
 */
const bulkUpdateMetadata = async (req,res)=>{
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
    let updatedMetadata = await dbService.updateMany(Metadata,filter,dataToUpdate);
    if (!updatedMetadata){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedMetadata } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Metadata with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Metadata.
 * @return {obj} : updated Metadata. {status, message, data}
 */
const partialUpdateMetadata = async (req,res) => {
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
      metadataSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedMetadata = await dbService.updateOne(Metadata, query, dataToUpdate);
    if (!updatedMetadata) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedMetadata });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Metadata from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Metadata.
 * @return {Object} : deactivated Metadata. {status, message, data}
 */
const softDeleteMetadata = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedMetadata = await dbService.updateOne(Metadata, query, updateBody);
    if (!updatedMetadata){
      return res.recordNotFound();
    }
    return res.success({ data:updatedMetadata });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Metadata from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Metadata. {status, message, data}
 */
const deleteMetadata = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedMetadata = await dbService.deleteOne(Metadata, query);
    if (!deletedMetadata){
      return res.recordNotFound();
    }
    return res.success({ data :deletedMetadata });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Metadata in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyMetadata = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedMetadata = await dbService.deleteMany(Metadata,query);
    if (!deletedMetadata){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedMetadata } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Metadata from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Metadata.
 * @return {Object} : number of deactivated documents of Metadata. {status, message, data}
 */
const softDeleteManyMetadata = async (req,res) => {
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
    let updatedMetadata = await dbService.updateMany(Metadata,query, updateBody);
    if (!updatedMetadata) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedMetadata } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addMetadata,
  bulkInsertMetadata,
  findAllMetadata,
  getMetadata,
  getMetadataCount,
  updateMetadata,
  bulkUpdateMetadata,
  partialUpdateMetadata,
  softDeleteMetadata,
  deleteMetadata,
  deleteManyMetadata,
  softDeleteManyMetadata    
};