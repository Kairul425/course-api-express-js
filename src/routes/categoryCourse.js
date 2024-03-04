const express = require("express");
const categoryController = require("../controllers/categoryCourse");
const upload = require("../middleware/multer");

const router = express.Router();

router.get("/", categoryController.getAllCategory);

router.get("/:id", categoryController.getCategoryById);

router.post("/", upload.single("image"), categoryController.createNewCategory);

router.patch("/:id", upload.single("image"), categoryController.updateCategory);

router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
