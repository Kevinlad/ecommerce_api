const express = require('express');
const router = express.Router();
const Cart = require('../models/cartmodel.js');
const { addtocart, getCartItem, addOrder, getUserOrders } = require('../controller/addToCart.js');
const authMiddleware = require('../middleware/authMiddleware.js');


router.post('/add-to-cart', authMiddleware,addtocart);

router.get('/cart/:userId',authMiddleware,getCartItem);
router.post('/placeorder', authMiddleware,addOrder);
router.get('/userorders/:userId', getUserOrders);


module.exports = router;