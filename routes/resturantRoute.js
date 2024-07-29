const express = require('express');
const authMiddleware = require('../middleware/authMiddleware.js');
const { createResturantController, getAllResturant, getResturantById, deleteResturantController } = require('../controller/resturantController.js');
const { deleteProfileController } = require('../controller/userController.js');

const router  = express.Router();
//CREATE RESTURANT || POST
router.post('/create',authMiddleware,createResturantController)

//GET
router.get('/getAll',getAllResturant);

// GET RESTURANT BY ID
router.get('/get/:id',getResturantById);

//DELETE THE RESTURANT
router.delete('/deleteResturant/:id',deleteResturantController);
module.exports = router;