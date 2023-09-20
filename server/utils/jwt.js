const jwt = require("jsonwebtoken");

// Create JWT
const createJWT = (payload) => jwt.sign(payload, process.env.JWT_SECRET);

// Is token valid
const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

// attach Cookie To Response
const attachCookieToResponse = ({ res, user }) => {
  const token = createJWT(user);

  const oneDay = 24 * 60 * 60 * 1000;

  res.cookie("access_token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = { attachCookieToResponse, createJWT };
