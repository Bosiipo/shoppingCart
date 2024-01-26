/* eslint-disable node/no-unsupported-features/es-syntax */
const CartItem = require('../models/CartItem.model');
const mongoose = require('mongoose');

class CartItemController {
  static async addToCart(req, res) {
    try {
     const { productId, quantity } = req.body;

     const userId = req.user.id;
   
     // Check if the item is already in the cart for the user
     const existingItem = await CartItem.findOne({ productId, userId });
   
     if (existingItem) {
       // If the item exists, update the quantity
       existingItem.quantity += quantity;
       await existingItem.save();
     } else {
       // If the item doesn't exist, create a new cart item
       await CartItem.create({ productId: new mongooseTypes.ObjectId(productId), quantity, userId: new mongoose.Types.ObjectId(userId) });
     }
   
     return res.status(201).json({
       status: 'success',
       message: 'Successfully added item to cart!'
     });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }

  static async removeFromCart(req, res) {
    try {
     const { productId } = req.body;

     const userId = req.user.id;
   
     // Find and remove the item from the cart
     await CartItem.findOneAndRemove({ productId, userId });

     return res.status(200).json({
       status: 'success',
       message: 'Item successfully removed from cart'
     });
    } catch (err) {
      res.status(500).json({
        error: err,
        message: err.message,
      });
    }
  }
}

module.exports = CartItemController;