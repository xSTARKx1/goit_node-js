const UserDB = require("./users.model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { createVerificationToken } = require("../services/token.service");

const registrationController = async (req, res, next) => {
  try {
    const { body } = req;
    if (!body.email || !body.password) {
      res.status(400).json({
        message: "Ошибка от Joi или другой валидационной библиотеки",
      });
      return;
    }

    const user = await UserDB.findUser(body.email);
    if (user) {
      res.status(409).json({
        message: "Email in use",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(body.password, +process.env.SALT);
    const newUser = await UserDB.createUser({
      ...body,
      password: hashedPassword,
    });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};

const loginController = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    if (!email || !password) {
      res.status(400).json({
        message: "Ошибка от Joi или другой валидационной библиотеки",
      });
      return;
    }
    const user = await UserDB.findUser(email);
    if (!user) {
      res.status(401).json({ message: "Email or password is wrong" });
      return;
    }

    const isPasswordsEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordsEqual) {
      res.status(401).json({ message: "Email or password is wrong" });
      return;
    }

    const token = await createVerificationToken({ id: user._id });
    await UserDB.updateToken(user._id, token);

    res.json({
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};

const logoutController = async (req, res, next) => {
  try {
    const user = await UserDB.findUserById(req.userInfo.id);
    if (!user) {
      res.status(401).json({
        message: "Not authorized",
      });
      return;
    }

    await UserDB.updateToken(req.userInfo.id, null);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

const getCurrentUserController = async (req, res, next) => {
  try {
    const user = await UserDB.findUserById(req.userInfo.id);
    if (!user) {
      res.status(401).json({
        message: "Not authorized",
      });
      return;
    }
    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
};
