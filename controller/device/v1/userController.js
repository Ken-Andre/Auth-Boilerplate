/**
 * userController.js
 * @description : exports action methods for user.
 */

const User = require('../../../model/user');
const userSchemaKey = require('../../../utils/validation/userValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const auth = require('../../../services/auth');
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');

/**
 * @description : get information of logged-in User.
 * @param {Object} req : authentication token is required
 * @param {Object} res : Logged-in user information
 * @return {Object} : Logged-in user information {status, message, data}
 */
const getLoggedInUserInfo = async (req, res) => {
  try {
    const query = {
      _id: req.user.id,
      isDeleted: false 
    };
    query.isActive = true;
    let foundUser = await dbService.findOne(User, query);
    if (!foundUser) {
      return res.recordNotFound();
    }
    return res.success({ data: foundUser });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
   
/**
 * @description : create document of User in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created User. {status, message, data}
 */ 
const addUser = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      userSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new User(dataToCreate);
    let createdUser = await dbService.create(User,dataToCreate);
    return res.success({ data : createdUser });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : update document of User with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated User.
 * @return {Object} : updated User. {status, message, data}
 */
const updateUser = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      userSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = {
      _id: {
        $eq: req.params.id,
        $ne: req.user.id
      }
    };
    let updatedUser = await dbService.updateOne(User,query,dataToUpdate);
    if (!updatedUser){
      return res.recordNotFound();
    }
    return res.success({ data :updatedUser });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of User with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Users.
 * @return {Object} : updated Users. {status, message, data}
 */
const bulkUpdateUser = async (req,res)=>{
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
    let updatedUser = await dbService.updateMany(User,filter,dataToUpdate);
    if (!updatedUser){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedUser } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of User with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated User.
 * @return {obj} : updated User. {status, message, data}
 */
const partialUpdateUser = async (req,res) => {
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
      userSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = {
      _id: {
        $eq: req.params.id,
        $ne: req.user.id
      }
    };
    let updatedUser = await dbService.updateOne(User, query, dataToUpdate);
    if (!updatedUser) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUser });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : change password
 * @param {Object} req : request including user credentials.
 * @param {Object} res : response contains updated user document.
 * @return {Object} : updated user document {status, message, data}
 */
const changePassword = async (req, res) => {
  try {
    let params = req.body;
    if (!req.user.id || !params.newPassword || !params.oldPassword) {
      return res.validationError({ message : 'Please Provide userId, new Password and Old password' });
    }
    let result = await auth.changePassword({
      ...params,
      userId:req.user.id
    });
    if (result.flag){
      return res.failure({ message :result.data });
    }
    return res.success({ message : result.data });
  } catch (error) {
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update user profile.
 * @param {Object} req : request including user profile details to update in request body.
 * @param {Object} res : updated user document.
 * @return {Object} : updated user document. {status, message, data}
 */
const updateProfile = async (req, res) => {
  try {
    let data = req.body;
    let validateRequest = validation.validateParamsWithJoi(
      data,
      userSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    delete data.password;
    delete data.createdAt;
    delete data.updatedAt;
    if (data.id) delete data.id;
    let result = await dbService.updateOne(User,{ _id:req.user.id },data,{ new:true });
    if (!result){
      return res.recordNotFound();
    }            
    return res.success({ data :result });
  } catch (error){
    if (error.name === 'ValidationError'){
      return res.validationError({ message : `Invalid Data, Validation Failed at ${ error.message}` });
    }
    if (error.code && error.code === 11000){
      return res.validationError({ message : 'Data duplication found.' });
    }
    return res.internalServerError({ message:error.message });
  }
};
module.exports = {
  getLoggedInUserInfo,
  addUser,
  updateUser,
  bulkUpdateUser,
  partialUpdateUser,
  changePassword,
  updateProfile    
};