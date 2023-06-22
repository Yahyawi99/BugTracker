require("dotenv").config();
require("express-async-errors");

const cors = require("cors");

const express = require("express");
const app = express();

// login route
const loginRoute = require("./routes/Login");
const mainRoutes = require("./routes/main");

// middleware
// app.use(express.static("./public"));
app.use(express.json());
app.use(cors());

app.use("/", [loginRoute, mainRoutes]);

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
