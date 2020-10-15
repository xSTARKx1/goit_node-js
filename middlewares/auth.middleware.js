const { verifyToken } = require("../services/token.service");
const UserDB = require("../users/users.model");

const checkAuthTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) {
      res.status(401).json({
        message: "Not authorized",
      });
      return;
    }
    const data = await verifyToken(token);
    req.userId = data.id;
    const userInfo = await UserDB.findUserById(data.id);
    req.userInfo = {
      email: userInfo.email,
      id: userInfo._id,
      subscription: userInfo.subscription,
    };
    next();
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { checkAuthTokenMiddleware };
