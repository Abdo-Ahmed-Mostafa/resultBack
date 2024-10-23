const { validationResult } = require("express-validator");
const asyncWrapper = require("../middleware/asyncWrapper");
const Course = require("../model/courses.model");
const { ERROR, SUCCESS, FAIL, NotFOUND } = require("../utils/massageText");

const getAllCourse = asyncWrapper(async (req, res) => {
  const limit = req.query.limit || 2;
  const page = req.query.page || 2;
  const skip = limit * (page - 1);
  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  if (!courses) {
    return res.status(404).json({ data: ERROR });
  }
  res.status(200).json({ status: SUCCESS, data: { course: courses } });
});

const getSingleCourse = asyncWrapper(async (req, res) => {
  const _id = req.params.courseId;
  const courses = await Course.findOne({ _id }, { __v: false });
  if (!courses) {
    res.status(200).json({ status: FAIL, data: { course: NotFOUND } });
  }
  res.status(200).json({ status: SUCCESS, data: { course: courses } });
});
const postCourse = asyncWrapper(async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.json({ errors: result.array() });
  }

  const body = req.body;

  const course = new Course(body);
  await course.save();
  res.status(201).json({ status: SUCCESS, data: { course: course } });
});
const updateCourse = asyncWrapper(async (req, res) => {
  const _id = req.params.courseId;
  const body = req.body;

  const courses = await Course.findOne({ _id });
  if (!courses) {
    res.status(404).json({ status: FAIL, data: { course: NotFOUND } });
  }
  courses.set(body);
  await courses.save();
  res.status(200).json({ status: SUCCESS, data: { course: courses } });
});
const deleteCourse = asyncWrapper(async (req, res) => {
  const _id = req.params.courseId;
  const course = await Course.findOne({ _id });

  const courses = await Course.deleteOne({ _id });
  if (!course) {
    res.status(404).json({ status: FAIL, data: { course: NotFOUND } });
  }
  res
    .status(200)
    .json({ status: SUCCESS, data: { course: "courses Delete Successfully" } });
});
module.exports = {
  getAllCourse,
  getSingleCourse,
  postCourse,
  updateCourse,
  deleteCourse,
};
