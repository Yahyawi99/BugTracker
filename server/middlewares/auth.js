const CustomErrors = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.access_token;

  if (!token) {
    throw new CustomErrors.UnauthorizedEror("Authentication Invalid");
  }

  try {
    const { name, userId, role } = isTokenValid(token);

    req.user = { name, userId, role };

    next();
  } catch (error) {
    throw new CustomErrors.UnauthorizedEror("Authentication Invalid");
  }
};

module.exports = authenticateUser;
