/* eslint-disable node/no-unsupported-features/es-syntax */
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserController {
  static async registerUser(req, res) {
    try {
      const {firstName, lastName, email, phoneNumber, password, gender, address} = req.body;

      const existingUser = await User.findOne({email});

      if(existingUser){
        throw new Error(`User with this email already exists!`);
      }
      const passwordHash = await bcrypt.hash(password, 10);

      const user = await User.create({
        email,
        phoneNumber,
        firstName,
        lastName,
        gender,
        address,
        password: passwordHash
      });

      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        address: user.address,
      };

      const jwtToken = jwt.sign({ user: safeUser }, process.env.SECRET, {
        expiresIn: 86400,
      });

      return res.status(201).json({
        status: 'success',
        message: 'User Registered',
        token: `Bearer ${jwtToken}`,
        user: safeUser,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new Error(`Incorrect Parameters!`);
      }
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error(`User does not exist!`);
      }
      const result = await bcrypt.compare(password, user.password);
      if (!result) {
        throw new Error(`Password does not match our records!`);
      }
      const safeUser = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      };
      const jwtToken = jwt.sign({ user: safeUser }, process.env.SECRET, {
        expiresIn: 86400,
      });
      return res.status(200).json({
        status: 'success',
        message: 'User Logged In',
        token: `Bearer ${jwtToken}`,
      });
    } catch (err) {
      res.status(500).json({
        error: err,
        message: err.message,
      });
    }
  }
}

module.exports = UserController;