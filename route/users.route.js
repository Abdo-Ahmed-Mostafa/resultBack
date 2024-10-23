const express = require("express");
const router = express.Router();
const multer = require("multer");
const appError = require("../utils/appError");
const { ERROR } = require("../utils/massageText");
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const fileName = `users-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});
const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType === "image") {
    return cb(null, true);
  } else {
    return cb(appError.create("file must be an image ", 400), false);
  }
};
const upload = multer({ storage: diskStorage, fileFilter });
const {
  getAllUser,
  login,
  register,
} = require("../controller/user.controller");

router.route("/").get(getAllUser);
router.route("/register").post(upload.single("avatar"), register);
router.route("/login").post(login);

module.exports = router;
