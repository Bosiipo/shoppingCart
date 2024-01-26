const jwt = require('jsonwebtoken');

class AuthController {
  static async decodeToken(req) {
    try {
      // Request for token
      const token = req.headers.authorization;
      if (!token) {
        throw new Error('Token not provided');
      }
      // Grab token
      const jwtToken = token.split(' ')[1];
      //   Decode token
      const decoded = await jwt.verify(jwtToken, process.env.SECRET);
      return decoded;
    } catch (e) {
      console.log(e.message);
      throw new Error('Invalid Auth Token');
    }
  }

  static async verifyAdmin(req, res, next) {
    try {
      const decoded = await AuthController.decodeToken(req);
      if (!decoded.isAdmin) {
        throw new Error('Unauthorized');
      }
      req.admin = decoded.admin;
      next();
      return true;
    } catch (err) {
      return res.status(401).json({
        status: 'error',
        message: err.message,
      });
    }
  }

  static async verifyUser(req, res, next) {
    try {
      const decoded = await AuthController.decodeToken(req);
      req.user = decoded.user;
      next();
      return true;
    } catch (error) {
      return res.status(401).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}

module.exports = AuthController;
