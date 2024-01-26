/* eslint-disable node/no-unsupported-features/es-syntax */
const Product = require('../models/Product.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const AuthController = require('./auth.controller');

class ProductController {
  static async createProduct(req, res) {
    try {
      const {productName, price, productImage} = req.body;

      const existingProduct = await Product.findOne({productName});

      if(existingProduct){
        throw new Error(`Product with this name already exists!`);
      }

      const product = await Product.create({
        productName,
        price,
        productImage,
        createdAt: new Date(),
        addedBy: new mongoose.Types.ObjectId(req.user.id)
      });

      return res.status(201).json({
        status: 'success',
        message: 'Product Created',
        product
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }

  static async getProduct(req, res) {
    try {
      const { productId } = req.body;

      if (!productId) {
        throw new Error(`ProductId required!`);
      }

      const product = await Product.findById(productId);

      if (!product) {
        throw new Error(`Product does not exist!`);
      }

      return res.status(200).json({
        status: 'success',
        message: 'Product returned successfully',
        product
      });
    } catch (err) {
      res.status(500).json({
        error: err,
        message: err.message,
      });
    }
  }

  static async updateProduct(req, res) {
   try {
     const {productId, productName, price, productImage} = req.body;

     const product = await Product.findById(productId);

     if (!product) {
       throw new Error(`Product not found!`);
     }

     product.productName = productName ? productName : product.productName;
     product.productImage = productImage ? productImage : product.productImage;
     product.price = price ? price : product.price;

     product.save();

     return res.status(200).json({
       status: 'success',
       message: 'Product updated successfully',
       product
     });
   } catch (err) {
     res.status(500).json({
       error: err,
       message: err.message,
     });
   }
 }

 static async deleteProduct(req, res) {
  try {
   const {productId} = req.body;

   if(!productId){
    throw new Error("ProductId not found!");
   }

   let deletedProduct = await Product.findOneAndDelete({_id: new mongoose.Types.ObjectId(productId)});

   return res.status(200).json({
     status: 'success',
     message: 'Product deleted successfully',
     deletedProduct
   });
 } catch (err) {
   res.status(500).json({
     error: err,
     message: err.message,
   });
 }
 }
}

module.exports = ProductController;