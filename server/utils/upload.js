const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: "snack-basket",
    format: file.mimetype.split("/")[1], // jpg, png
    transformation: [
      { width: 800, height: 800, crop: "limit" },
      { quality: "auto" },
    ],
  }),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = upload;
