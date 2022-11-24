const DB = process.env.DB || "MONGODB";
const normalizeUser = require("../helpers/normalizeUser");
const User = require("./mongodb/User");
const { handleBadRequest } = require("../../utils/handleErrors");

const registerUser = async (normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      normalizedUser._id = "123456";
      //   throw new Error("Opss... i did it again!");
      return Promise.resolve(normalizedUser);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("registerUser new user not in mongodb");
};

const loginUser = async (normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      const { email, password } = normalizedUser;
      const user = User.findOne({ email });
      if (!user) throw new Error("Invalid email or password");
      if (!user.password === password)
        throw new Error("Invalid email or password");
      return Promise.resolve("user is login in");
    } catch (error) {
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve({});
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
