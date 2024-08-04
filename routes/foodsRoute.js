const express = require('express');
const authMiddleware = require('../middleware/authMiddleware.js');
const { createFoodsController, getAllFoodsController, getSingleFoodController, getFoodByResturantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController, getFoodBycategoryController, searchFunctionality } = require('../controller/foodsController.js');
const adminMiddleware = require("../middleware/adminController.js");
const router  = express.Router();

// CREATE THE CATEGORY
router.post('/create',authMiddleware,createFoodsController)

//GET ALL CATEGORY
router.get('/getAll',getAllFoodsController)

//GET SINGLE FOOD
router.get('/get/:id',getSingleFoodController)


//GET FOOD BY RESTURANT
router.get("/getByResturant/:id", getFoodByResturantController);


//UPDATE THE FOOD
router.put("/update/:id", authMiddleware, updateFoodController);


// DELETE FOOD
router.delete("/delete/:id", authMiddleware, deleteFoodController);

// PLACE ORDER
router.post("/placeorder", authMiddleware, placeOrderController);

// ORDER STATUS
router.post(
    "/orderStatus/:id",
    authMiddleware,
    adminMiddleware,
    orderStatusController
  );

router.get("/getfoodcategory/:id",getFoodBycategoryController); 


router.get('/search',searchFunctionality)
module.exports = router;