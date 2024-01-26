"use strict";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
   firstName: {
    type: String,
    required: true, 
   },
   lastName: {
    type: String,
    required: true, 
   },
   email: {
    type: String,
    required: true, 
   },
   password: {
    type: String,
    required: true, 
   },
   phoneNumber: {
    type: String,
   },
   gender: {
    type: String,
   },
   address: {
    type: String
   }
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = new Date();
  next();
});

const User = mongoose.model("users", UserSchema);

module.exports = User;