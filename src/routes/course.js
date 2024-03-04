const express = require("express");
const courseController = require("../controllers/course");
const upload = require("../middleware/multer");

const router = express.Router();

router.get("/", courseController.getAllCourse);

router.get("/:id", courseController.getCourseById);

router.post("/", upload.single("image"), courseController.createNewCourse);

router.patch("/:id", upload.single("image"), courseController.updateCourse);

router.delete("/:id", courseController.deleteCourse);

module.exports = router;
