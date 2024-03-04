require("dotenv").config();
const express = require("express");
const cors = require("cors");

const categoryRoutes = require("./routes/categoryCourse");
const courseRoutes = require("./routes/course");

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/category", categoryRoutes);
app.use("/course", courseRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    error: err,
  });
  next();
});

app.listen(port, () => {
  console.log("Server up and running in port " + port);
});
