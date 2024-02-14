/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Trip = require('../model/Trip');
let Metadata = require('../model/metadata');
let Tripuser = require('../model/tripuser');
let User = require('../model/user');
let State = require('../model/state');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteTrip = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Trip,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMetadata = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Metadata,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTripuser = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Tripuser,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const TripFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const TripCnt = await dbService.deleteMany(Trip,TripFilter);

      const metadataFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const metadataCnt = await dbService.deleteMany(Metadata,metadataFilter);

      const tripuserFilter = { $or: [{ user : { $in : user } },{ updatedBy : { $in : user } }] };
      const tripuserCnt = await dbService.deleteMany(Tripuser,tripuserFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt = await dbService.deleteMany(User,userFilter);

      const stateFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const stateCnt = await dbService.deleteMany(State,stateFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.deleteMany(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt = await dbService.deleteMany(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt = await dbService.deleteMany(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(User,filter);
      let response = {
        Trip :TripCnt,
        metadata :metadataCnt,
        tripuser :tripuserCnt,
        user :userCnt + deleted,
        state :stateCnt,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteState = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(State,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(Role,filter);
      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      let deleted  = await dbService.deleteMany(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countTrip = async (filter) =>{
  try {
    const TripCnt =  await dbService.count(Trip,filter);
    return { Trip : TripCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countMetadata = async (filter) =>{
  try {
    const metadataCnt =  await dbService.count(Metadata,filter);
    return { metadata : metadataCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countTripuser = async (filter) =>{
  try {
    const tripuserCnt =  await dbService.count(Tripuser,filter);
    return { tripuser : tripuserCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const TripFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const TripCnt =  await dbService.count(Trip,TripFilter);

      const metadataFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const metadataCnt =  await dbService.count(Metadata,metadataFilter);

      const tripuserFilter = { $or: [{ user : { $in : user } },{ updatedBy : { $in : user } }] };
      const tripuserCnt =  await dbService.count(Tripuser,tripuserFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt =  await dbService.count(User,userFilter);

      const stateFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const stateCnt =  await dbService.count(State,stateFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt =  await dbService.count(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt =  await dbService.count(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        Trip : TripCnt,
        metadata : metadataCnt,
        tripuser : tripuserCnt,
        user : userCnt,
        state : stateCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countState = async (filter) =>{
  try {
    const stateCnt =  await dbService.count(State,filter);
    return { state : stateCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTrip = async (filter,updateBody) =>{  
  try {
    const TripCnt =  await dbService.updateMany(Trip,filter);
    return { Trip : TripCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMetadata = async (filter,updateBody) =>{  
  try {
    const metadataCnt =  await dbService.updateMany(Metadata,filter);
    return { metadata : metadataCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTripuser = async (filter,updateBody) =>{  
  try {
    const tripuserCnt =  await dbService.updateMany(Tripuser,filter);
    return { tripuser : tripuserCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findMany(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const TripFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const TripCnt = await dbService.updateMany(Trip,TripFilter,updateBody);

      const metadataFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const metadataCnt = await dbService.updateMany(Metadata,metadataFilter,updateBody);

      const tripuserFilter = { '$or': [{ user : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const tripuserCnt = await dbService.updateMany(Tripuser,tripuserFilter,updateBody);

      const userFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userCnt = await dbService.updateMany(User,userFilter,updateBody);

      const stateFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const stateCnt = await dbService.updateMany(State,stateFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.updateMany(UserTokens,userTokensFilter,updateBody);

      const roleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const roleCnt = await dbService.updateMany(Role,roleFilter,updateBody);

      const projectRouteFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const projectRouteCnt = await dbService.updateMany(ProjectRoute,projectRouteFilter,updateBody);

      const routeRoleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(User,filter,updateBody);

      let response = {
        Trip :TripCnt,
        metadata :metadataCnt,
        tripuser :tripuserCnt,
        user :userCnt + updated,
        state :stateCnt,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteState = async (filter,updateBody) =>{  
  try {
    const stateCnt =  await dbService.updateMany(State,filter);
    return { state : stateCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.updateMany(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findMany(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.updateMany(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.updateMany(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.updateMany(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteTrip,
  deleteMetadata,
  deleteTripuser,
  deleteUser,
  deleteState,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countTrip,
  countMetadata,
  countTripuser,
  countUser,
  countState,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteTrip,
  softDeleteMetadata,
  softDeleteTripuser,
  softDeleteUser,
  softDeleteState,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
