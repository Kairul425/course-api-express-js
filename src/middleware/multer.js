const multer = require("multer");
const path = require("path");

// Filter untuk hanya menerima file gambar
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("File bukan gambar!"), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 3000000 },
  fileFilter: imageFilter,
});

module.exports = upload;
