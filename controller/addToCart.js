const Cart = require("../models/cartmodel.js");
const Foods = require("../models/foodModal.js");

const Order = require('../models/placeorderModel.js');
const addtocart = async (req, res) => {
  const { userId, items } = req.body;

  try {
    console.log('Request Body:', req.body); // Log the entire request body

    // Fetch the cart or create a new one if it doesn't exist
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Iterate through the items to update or add them
    for (const newItem of items) {
      console.log('New Item:', newItem); // Log each new item to check the structure

      if (!newItem.foodId) {
        console.log('Missing foodId for item:', newItem);
        return res.status(400).send({ message: 'Missing foodId for item' });
      }

      // Find the food item from the Foods collection
      const food = await Foods.findById(newItem.foodId);

      if (!food) {
        console.log('Food item not found:', newItem.foodId);
        return res.status(404).send({ message: 'Food item not found' });
      }

      const itemIndex = cart.items.findIndex(item => item.foodId.toString() === newItem.foodId.toString());

      if (itemIndex > -1) {
        // Update existing item
        cart.items[itemIndex].quantity += newItem.quantity;
        cart.items[itemIndex].totalPrice = cart.items[itemIndex].quantity * food.price;
      } else {
        // Add new item
        cart.items.push({
          foodId: newItem.foodId,
          quantity: newItem.quantity,
          totalPrice: newItem.quantity * food.price,
        });
      }
    }

    // Calculate totalCartPrice
    const totalCartPrice = cart.items.reduce((total, item) => total + item.totalPrice, 0);
    cart.totalCartPrice = totalCartPrice;

    // Save the cart
    await cart.save();

    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};


getCartItem = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.foodId');
    res.status(200).send(cart);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

const addOrder = async (req, res) => {
  const { userId } = req.body;

  try {
    // Fetch the cart for the user
    const cart = await Cart.findOne({ userId }).populate('items.foodId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).send({ message: 'Cart is empty' });
    }

    // Create a new order
    const order = new Order({
      userId: cart.userId,
      items: cart.items,
      totalOrderPrice: cart.totalCartPrice,
    });

    // Save the order
    await order.save();

    // Clear the cart after order is placed
    cart.items = [];
    cart.totalCartPrice = 0;
    await cart.save();

    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const getUserOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId }).populate('items.foodId');

    if (!orders || orders.length === 0) {
      return res.status(404).send({ message: 'No orders found for this user' });
    }

    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};


module.exports = {addtocart,getCartItem,addOrder,getUserOrders};
