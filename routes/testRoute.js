const express = require('express');
const { testController } = require('../controller/testController');

//router Object
const router = express.Router();

router.get('/test-api',testController)





module.exports = router;