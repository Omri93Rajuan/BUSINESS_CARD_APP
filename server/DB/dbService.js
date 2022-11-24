const ENVIRONMENT = undefined || "development";

const connectToDb = () => {
  if (ENVIRONMENT === "development")
    require("./mongodb/connectToMongodbLocally");
  if (ENVIRONMENT === "production") require("./mongodb/connectToAtlas");
};

module.exports = connectToDb;
