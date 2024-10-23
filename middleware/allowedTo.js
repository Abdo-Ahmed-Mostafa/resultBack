const { ERROR } = require("../utils/massageText");

module.exports = (...roles) => {
  console.log(roles);

  return (req, res, next) => {
    console.log("req.currentUser", !roles.includes(req.currentUser.role));

    if (!roles.includes(req.currentUser.role)) {
      return res
        .status(401)
        .json({ status: ERROR, massage: "this role is not authorized" });
    }
    next();
  };
};
