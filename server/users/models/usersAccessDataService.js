const DB = process.env.DB || "MONGODB";
const User = require("./mongodb/User");
const lodash = require("lodash");
const { comparePassword } = require("../helpers/bcrypt");
const { generateAuthToken } = require("../../auth/Providers/jwt");
const { handleBadRequest } = require("../../utils/handleErrors");


const registerUser= async normalizeUser => {
  if (DB === "MONGODB") {
    try {
      const { email } = normalizeUser;
      let user = await User.findOne({ email });
      if (user) throw new Error("User already registered");
      user = new User(normalizeUser);
      user = await user.save();
      user = lodash.pick(user, ["name", "email", "_id"]);
      return Promise.resolve(user);
    } catch (error) {
      return handleBadRequest("Mongoose", error);
    }
  }

  return Promise.resolve({});
};

const loginUser = async ({ email, password }) => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findOne({ email });
      if (!user)
        throw new Error("Authentication Error: Invalid email or password");

      const validPassword = comparePassword(password, user.password);
      if (!validPassword)
        throw new Error("Authentication Error: Invalid email or password");
      const token = generateAuthToken(user);
      return Promise.resolve(token);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("loginUser user not in mongodb");
};

const getUsers = async () => {
  if (DB === "MONGODB") {
    try {
      const users = User.find({}, { password: 0, __v: 0 });

      //   throw new Error("Opss... i did it again!");
      return Promise.resolve(users);
    } catch (error) {
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve({});
};

const getUser = async (userId) => {
  if (DB === "MONGODB") {
    try {
      const user = User.findById({ userId }, { password: 0, __v: 0 });

      //   throw new Error("Opss... i did it again!");
      return Promise.resolve(user);
    } catch (error) {
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get user not in mongodb");
};

const updateUser = async (userId, normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      const user = User.findByIdAndUpdate(userId, normalizedUser, {
        new: true,
      });

      if (!user)
        throw new Error(
          "Could not update this user because a user with this ID cannot be found in the database"
        );
      return Promise.resolve(user);
    } catch (error) {
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card update not in mongodb");
};

const changeUserBusinessStatus = async (userId) => {
  if (DB === "MONGODB") {
    try {
      const pipeline = [{ $set: { isBusiness: { $not: "$isBusiness" } } }];
      const user = await User.findByIdAndUpdate(id, pipeline, {
        new: true,
      });
      return Promise.resolve(user);
    } catch (error) {
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card updated!");
};

const deleteUser = async (userId) => {
  if (DB === "MONGODB") {
    try {
      let user = await User.findByIdAndDelete(id, { password: 0, __v: 0 });
      if (!user)
        throw new Error(
          "Could not delete this user because a user with this ID cannot be found in the database"
        );
      return Promise.resolve(user);
    } catch (error) {
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card deleted not in mongodb");
};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.changeUserBusinessStatus = changeUserBusinessStatus;
exports.deleteUser = deleteUser;
