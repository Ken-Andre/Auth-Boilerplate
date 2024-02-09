/**
 * @description :: exports API action methods
 */

/** 
 * @description : 
 * @param {Object} req : request for printlistoftrips
 * @param {Object} res : response for printlistoftrips
 * @return {Object} : response for printlistoftrips
 */
const printlistoftrips = async (req,res)=>{
  try {
    // add your code here
    let result = true;
    if (result){
      return res.success({ data:result });
    }
  } catch (error) {
    if (error.name && error.name == 'validationError') {
      return res.validationError({ message: error.message });
    } else {
      return res.internalServerError({ message:error.message });
    }
  }
};    

module.exports = { printlistoftrips, };
