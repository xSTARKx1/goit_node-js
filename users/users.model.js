const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    subscription: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free",
    },
    token: String,
  },
  { versionKey: false }
);

class User {
  constructor() {
    this.db = mongoose.model("Users", userSchema);
  }

  createUser = async (userData) => {
    return await this.db.create(userData);
  };

  findUser = async ({ query }) => {
    return await this.db.findOne(query);
  };

  findUserById = async (userId) => {
    return await this.db.findById(userId);
  };

  updateToken = async (userId, newToken) => {
    return await this.db.findByIdAndUpdate(userId, {
      token: newToken,
    });
  };
}

module.exports = new User();
