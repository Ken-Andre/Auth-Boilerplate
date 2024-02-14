const express = require('express');
const router = express.Router();
const WelcomeController = require('../../../controller/client/v1/WelcomeController');    
const auth = require('../../../middleware/auth');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/welcome').get(auth(PLATFORM.CLIENT),
  WelcomeController.printlistoftrips);
    
module.exports = router;
