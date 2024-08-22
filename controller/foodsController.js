const foodModal = require("../models/foodModal.js");
const orderModel = require("../models/orderModel.js");
const resturantModel = require("../models/resturantModel.js");


const createFoodsController = async (req, res) => {
    try {
      const {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        resturnat,
        rating,
        categoryId,
      } = req.body;
  
      if (!title || !description || !price || !resturnat) {
        return res.status(500).send({
          success: false,
          message: "Please Provide all fields",
        });
      }
      const newFood = new foodModal({
        title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        resturnat,
        rating,categoryId
      });
  
      await newFood.save();
      res.status(201).send({
        success: true,
        message: "New Food Item Created",
        newFood,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in create food api",
        error,
      });
    }
  };

  // GET ALLL FOODS
const getAllFoodsController = async (req, res) => {
    try {
      const foods = await foodModal.find({});
      if (!foods) {
        return res.status(404).send({
          success: false,
          message: "no food items was found",
        });
      }
      res.status(200).send({
        success: true,
        totalFoods: foods.length,
        foods,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erro In Get ALL Foods API",
        error,
      });
    }
  };

  // GET SINGLE FOOD
const getSingleFoodController = async (req, res) => {
    try {
      const foodId = req.params.id;
      if (!foodId) {
        return res.status(404).send({
          success: false,
          message: "please provide id",
        });
      }
      const food = await foodModal.findById(foodId);
      if (!food) {
        return res.status(404).send({
          success: false,
          message: "No Food Found with htis id",
        });
      }
      res.status(200).send({
        success: true,
        food,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In get SIngle Food API",
        error,
      });
    }
  };
  
  const getFoodByResturantController = async (req, res) => {
    try {
      const resturantId = req.params.id;
      if (!resturantId) {
        return res.status(404).send({
          success: false,
          message: "please provide id",
        });
      }
      const food = await foodModal.find({ resturnat: resturantId });
      if (!food) {
        return res.status(404).send({
          success: false,
          message: "No Food Found with this id",
        });
      }
      res.status(200).send({
        success: true,
        message: "food base on restuatrn",
        food,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In get Single Food API",
        error,
      });
    }
  };
  const getFoodBycategoryController = async (req, res) => {
    try {
      const cateoryId = req.params.id;
      if (!cateoryId) {
        return res.status(404).send({
          success: false,
          message: "please provide id",
        });
      }
      const food = await foodModal.find({ categoryId: cateoryId });
      if (!food) {
        return res.status(404).send({
          success: false,
          message: "No Food Found with this id",
        });
      }
      res.status(200).send({
        success: true,
        message: "food base on category",
        food,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In get Single Food API",
        error,
      });
    }
  };
  
  const updateFoodController = async (req, res) => {
    try {
      const foodID = req.params.id;
      if (!foodID) {
        return res.status(404).send({
          success: false,
          message: "no food id was found",
        });
      }
      const food = await foodModal.findById(foodID);
      if (!food) {
        return res.status(404).send({
          success: false,
          message: "No Food Found",
        });
      }
      const {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        resturnat,
        rating,
      } = req.body;
      const updatedFood = await foodModal.findByIdAndUpdate(
        foodID,
        {
          title,
          description,
          price,
          imageUrl,
          foodTags,
          catgeory,
          code,
          isAvailabe,
          resturnat,
          rating,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Food Item Was Updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr In Update Food API",
        error,
      });
    }
  };
  const deleteFoodController = async (req, res) => {
    try {
      const foodId = req.params.id;
      if (!foodId) {
        return res.status(404).send({
          success: false,
          message: "provide food id",
        });
      }
      const food = await foodModal.findById(foodId);
      if (!food) {
        return res.status(404).send({
          success: false,
          message: "No Food Found with id",
        });
      }
      await foodModal.findByIdAndDelete(foodId);
      res.status(200).send({
        success: true,
        message: "Food Item Dleeted ",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror In Delete Food APi",
        error,
      });
    }
  };
  
  // PLACE ORDER
const placeOrderController = async (req, res) => {
    try {
      const { cart } = req.body;
      if (!cart) {
        return res.status(500).send({
          success: false,
          message: "please food cart or payemnt method",
        });
      }
      let total = 0;
      //cal
      cart.map((i) => {
        total += i.price;
      });
  
      const newOrder = new orderModel({
        foods: cart,
        payment: total,
        buyer: req.body.id,
      });
      await newOrder.save();
      res.status(201).send({
        success: true,
        message: "Order Placed successfully",
        newOrder,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr In Place Order API",
        error,
      });
    }
  };

  // CHANGE ORDER STATUS
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide valid order id",
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Order Status Updated",
      order
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Order Status API",
      error,
    });
  }
};


searchFunctionality =  async (req, res) => {
  try {
    const searchTerm = req.query.q;
    if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    // Fetch all restaurants
    const allRestaurants = await resturantModel.find().lean(); // Use lean() for better performance

    // Filter restaurants that start with the search term (case-insensitive)
    const filteredRestaurants = allRestaurants.filter(restaurant =>
        restaurant.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    res.status(200).send({
      success:true,
      filteredRestaurants,
      
    })
} catch (error) {
  console.log(error); 
    res.status(500).json({ error: error.message });
}
}
const getFoodByController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(400).send({
        success: false,
        message: "Please provide a valid food ID",
      });
    }

    const food = await foodModal.findOne({ _id: foodId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with this ID",
      });
    }

    res.status(200).send({
      success: true,
      message: "Food details retrieved successfully",
      food,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in getting food details",
      error,
    });
  }
};

module.exports = {createFoodsController,getFoodByController,getAllFoodsController,getSingleFoodController,getFoodByResturantController,updateFoodController,deleteFoodController,placeOrderController,orderStatusController,getFoodBycategoryController,searchFunctionality};