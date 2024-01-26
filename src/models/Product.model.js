"use strict";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
   productName: {
    type: String,
    required: true, 
   },
   price: {
    type: String,
    required: true, 
   },
   productImage: {
    type: String,
    required: true, 
   },
   addedBy: {
    type: mongoose.Types.ObjectId
   },
   deletedAt: {
    type: Date
   },
   deletedBy: {
    type: mongoose.Types.ObjectId
   }
  },
  {
    timestamps: true,
  }
);

ProductSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = new Date();
  next();
});

const Product = mongoose.model("products", ProductSchema);

module.exports = Product;