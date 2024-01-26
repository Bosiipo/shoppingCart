"use strict";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartItemSchema = new Schema(
  {
   productId: {
    type: mongoose.Types.ObjectId,
   },
   userId: {
    type: mongoose.Types.ObjectId,
   },
   quantity: {
    type: String
   }
  },
  {
    timestamps: true,
  }
);

CartItemSchema.pre("findOneAndUpdate", function (next) {
 this._update.updatedAt = new Date();
 next();
});

const CartItem = mongoose.model("cartitems", CartItemSchema);

module.exports = CartItem;