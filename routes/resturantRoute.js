const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createResturantController, getAllResturant, getResturantById, deleteResturantController } = require('../controller/resturantController');
const { deleteProfileController } = require('../controller/userController');

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