const jwt = require("jsonwebtoken");
module.exports = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: "10m",
  });
  return token;
};
