const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");

const NAME = config.get("DB_NAME");
const PASSWORD = config.get("DB_PASSWORD");

mongoose
  .connect(
    `mongodb+srv://${NAME}:${PASSWORD}@cluster0.aqumabl.mongodb.net/business_card_app?retryWrites=true&w=majority`
  )
  .then(() => console.log(chalk.magentaBright("connected to MongoDB Atlas!")))
  .catch(error =>
    console.log(chalk.redBright.bold(`could not connect to mongoDb: ${error}`))
  );