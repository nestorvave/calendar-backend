const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_CNN);
    console.log("db-online");
  } catch (error) {
    console.log(error);
    throw new Error("Error to connect to DB");
  }
};

module.exports = {
  dbConnection,
};
