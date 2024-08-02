const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
        foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Foods', required: true },
      quantity: { type: Number, required: true },
      totalPrice: { type: Number },
    },
  ],
  totalCartPrice: { type: Number }, 
});

const Cart = mongoose.model('Cart', cartItemSchema);

module.exports = Cart;
