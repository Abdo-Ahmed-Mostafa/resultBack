const jwt = require("jsonwebtoken");
const { FAIL } = require("../utils/massageText");

const verifyToken = async (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader) {
    return res.status(401).json({ status: FAIL, message: "Token is required" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("currentUser", currentUser);
    req.currentUser = currentUser;

    next();
  } catch (error) {
    return res.status(401).json({ status: FAIL, message: "Token is invalid" });
  }
};

module.exports = verifyToken;
