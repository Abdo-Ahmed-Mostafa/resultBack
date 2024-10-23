const express = require("express");
const mongoose = require("mongoose");
const courseRoute = require("./route/courses.route");
const userRoute = require("./route/users.route");
const { ERROR } = require("./utils/massageText");
const path = require("path");
const app = express();
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected the mongodb successfully");
});

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/courses/", courseRoute);
app.use("/api/users", userRoute);
app.use("*", (req, res, next) => {
  res.status(404).json({ status: ERROR, massage: "Route Not Found" });
});
app.use((err, req, res, next) => {
  res.status(400).json({ status: ERROR, massage: err.message });
  next(err);
});
app.listen(process.env.PORT, () => {
  console.log("project run in localhost 5000");
});
