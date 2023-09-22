require("dotenv").config();

const connectDB = require("./db/connect");

const Project = require("./model/Project");
const Ticket = require("./model/Ticket");
const User = require("./model/User");

const mockData = require("./data/mock-users.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await User.deleteMany();
    await User.create(mockData);

    console.log("success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
