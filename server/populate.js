require("dotenv").config();

const connectDB = require("./db/connect");

const Project = require("./model/Project");
const Ticket = require("./model/Ticket");
const User = require("./model/User");

const ticketData = require("./data/mock-tickets.json");
const projectData = require("./data/mock-projects.json");
const userData = require("./data/mock-users.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    // await Ticket.deleteMany();
    // await Ticket.create(ticketData);

    // await Project.deleteMany();
    // await Project.create(projectData);

    await User.deleteMany();
    await User.create(userData);

    console.log("success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
