const { Router } = require("express");
const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
} = require("../users/users.controller");
const { checkAuthTokenMiddleware } = require("../middlewares/auth.middleware");

const usersRouter = Router();

usersRouter.post("/registration", registrationController);

usersRouter.post("/login", loginController);

usersRouter.post("/logout", checkAuthTokenMiddleware, logoutController);

usersRouter.get("/current", checkAuthTokenMiddleware, getCurrentUserController);

module.exports = usersRouter;
