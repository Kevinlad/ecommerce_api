const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createFoodsController, getAllFoodsController, getSingleFoodController, getFoodByResturantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require('../controller/foodsController');
const adminMiddleware = require("../middleware/adminController");
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

module.exports = router;