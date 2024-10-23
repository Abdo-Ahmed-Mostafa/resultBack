const express = require("express");
const router = express.Router();
const Course = require("../model/courses.model");
const {
  getAllCourse,
  postCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
} = require("../controller/course-controller");
const verifyToken = require("../middleware/verifyToken");
const { validationCourse } = require("../middleware/validation.course");
const { ADMIN, MANGER } = require("../utils/user-roule");
const allowedTo = require("../middleware/allowedTo");
router.route("/").get(getAllCourse).post(validationCourse(), postCourse);
router
  .route("/:courseId")
  .get(getSingleCourse)
  .patch(updateCourse)
  .delete(verifyToken, allowedTo(ADMIN, MANGER), deleteCourse);
module.exports = router;
