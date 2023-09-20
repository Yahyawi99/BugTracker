const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const CustomErrors = require('../errors')

const authenvticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "You're not authorized to access this route." });
  }
};

const authenticationMiddleware = async(req,res,next)=>{
const authHeader = req.headers.authorization

if(!authHeader||!authHeader.includes("Bearer ")){
  throw 
}
}

module.exports = authenticationMiddleware;
