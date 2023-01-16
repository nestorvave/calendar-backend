const express = require("express");
require("dotenv").config();

//Server created
const app = express();

//public directory

app.use(express.static("public"));

//Routes
app.use("/api/auth", require("./routes/auth"));

//listener request
app.listen(process.env.PORT, () => {
  console.log(`Server running on localhost:${process.env.PORT}`);
});
