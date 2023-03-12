const jwt = require("jsonwebtoken");
const userUtilities = require("../utilities/userUtilities");

const userAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await userUtilities.findUserById(decoded.userId);
      next();
    } catch (error) {
      res.status(401);
      console.log(error);
      throw new Error("Not authorized, token fail");
    }
  }
  if (!token) {
    res.status(401);

    throw new Error("Not Authorized");
  }
};

module.exports = {
  userAuth,
};
