require("dotenv").config();

const express = require("express");
const app = express();

// DB
const connectDB = require("./db/connect");

// Start
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    app.listen(port, () => {
      console.log(`Listening on port : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
