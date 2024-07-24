const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { categoryController, updateCategory, getAllController, deleteCategory } = require('../controller/categoryController');

const router  = express.Router();

// CREATE THE CATEGORY
router.post('/create',authMiddleware,categoryController)

//GET ALL CATEGORY
router.get('/getAll',getAllController)

//UPDATE THE CATEGORY
router.put('/update/:id',authMiddleware,updateCategory)

//DELETE THE CATEGORY
router.delete('/delete/:id',authMiddleware,deleteCategory)


module.exports = router;