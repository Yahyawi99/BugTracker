require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const cloudinary = require("cloudinary").v2;

// middlewares
const NotFoundMiddleware = require("./middlewares/not-found");
const errHandlerMiddleware = require("./middlewares/err-handler");

// DB
const connectDB = require("./db/connect");

// Routers
const AuthRoutes = require("./routes/authRoutes");
const ProjectRoutes = require("./routes/projectRoutes");
const TicketRoutes = require("./routes/ticketRoutes");
const UserRoutes = require("./routes/userRoutes");
const CommentRoutes = require("./routes/commentRoutes");
const MessageRoutes = require("./routes/messageRoutes");

// ========================================
// app.use(express.static(path.join(__dirname, "build")));
app.use(cors());

// ========================================
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/", // Set the directory for temporary files
  })
);
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use("/api/v1", AuthRoutes);
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/project", ProjectRoutes);
app.use("/api/v1/ticket", TicketRoutes);
app.use("/api/v1/comment", CommentRoutes);
app.use("/api/v1/message", MessageRoutes);

// Serve HTML file for all routes
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

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
