require("dotenv").config();

const connectDB = require("./db/connect");

const Project = require("./model/Project");
const Ticket = require("./model/Ticket");
const User = require("./model/User");
const message = require("./model/Message");
const comment = require("./model/Comment");
const History = require("./model/History");

const ticketData = require("./data/mock-tickets.json");
const projectData = require("./data/mock-projects.json");
const userData = require("./data/mock-users.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    const val = [
      "685de0a18220b3b17048348a",
      "685de0a18220b3b170483489",
      "685de0a18220b3b17048348d",
      "685de52f5b35d095ffc7e2ee",
      null,
    ];

    const tickets = await Ticket.find({});
    for (const ticket of tickets) {
      const randomAssignedTo = val[Math.floor(Math.random() * val.length)];
      console.log(randomAssignedTo);
      ticket.assignedTo = randomAssignedTo;
      await ticket.save();
    }

    console.log("success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
