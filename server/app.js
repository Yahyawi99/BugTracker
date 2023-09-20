require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// middlewares
const NotFoundMiddleware = require("./middlewares/not-found");
const errHandlerMiddleware = require("./middlewares/err-handler");

// DB
const connectDB = require("./db/connect");

// Routers
const AuthRoutes = require("./routes/authRoutes");

app.use(express.json());

// ========================================
// ========================================
app.use("/api/v1", AuthRoutes);

app.use(NotFoundMiddleware);
app.use(errHandlerMiddleware);

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
