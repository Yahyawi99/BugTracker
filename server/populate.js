require("dotenv").config();

const connectDB = require("./db/connect");

const Project = require("./model/Project");
const Ticket = require("./model/Ticket");

const mockData = require("./data/mock-tickets.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await Ticket.deleteMany();
    await Ticket.create(mockData);

    console.log("success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
