const express = require('express');
const UserController = require('../controllers/user.controller');
const AuthController = require('../controllers/auth.controller');
const ProductController = require('../controllers/product.controller');
const CartItemController = require('../controllers/cartitem.controller');

const Router = express.Router();

Router.get('/', (req, res) => {
  return res.json({
    message: 'Test Default Running'
  });
});

Router.post('/register', UserController.registerUser);
Router.post('/login', UserController.loginUser);
Router.post('/create-product', AuthController.verifyUser, ProductController.createProduct);
Router.get('/get-product', AuthController.verifyUser, ProductController.getProduct);
Router.put('/update-product', AuthController.verifyUser, ProductController.updateProduct);
Router.delete('/delete-product', AuthController.verifyUser, ProductController.deleteProduct);
Router.post('/add-to-cart', AuthController.verifyUser, CartItemController.addToCart);
Router.put('/remove-from-cart', AuthController.verifyUser, CartItemController.removeFromCart);

module.exports = Router;