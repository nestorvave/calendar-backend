const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();

//Server created
const app = express();

//DB
dbConnection()

//public directory

app.use(express.static("public"));

//Reading and parsing body

app.use(express.json());

//Routes
app.use("/api/auth", require("./routes/auth"));

//listener request
app.listen(process.env.PORT, () => {
  console.log(`Server running on localhost:${process.env.PORT}`);
});
