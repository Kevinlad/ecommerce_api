const express = require('express');
const { getController, updateController, updatePasswordController, resetPasswordController, deleteProfileController } = require('../controller/userController.js');
const authmiddleware = require('../middleware/authMiddleware.js');

const router  = express.Router();
//GET USER
router.get("/getuser",authmiddleware,getController)

// UPDATE PROFILE
router.put('/updateUser',authmiddleware,updateController),

// UPDATE USER PASSWORD
router.post('/updatePassword',authmiddleware,updatePasswordController);

// RESET PASSWORD
router.post('/resetPassword',authmiddleware,resetPasswordController);

// DELETE USER
router.delete('/deleteUser/:id',authmiddleware,deleteProfileController);
module.exports = router;