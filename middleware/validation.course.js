const { body } = require("express-validator");

const validationCourse = () => {
  return [
    body("title").isLength({ min: 1 }).withMessage("title is required"),
    body("price").isLength({ min: 1 }).withMessage("price is required"),
  ];
};

module.exports = { validationCourse };
