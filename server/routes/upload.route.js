const express = require("express");
const router = express.Router();

const { uploadMultipleImages } = require("../controllers/upload.controller");
const upload = require("../utils/upload");

router.post(
  "/",
  (req, res, next) => {
    upload.array("images", 10)(req, res, (err) => {
      if (err) {
        console.error("🔥 MULTER ERROR:", err);

        return res.status(400).json({
          success: false,
          message: err.message || "Upload failed",
        });
      }

      next();
    });
  },
  uploadMultipleImages
);

module.exports = router;
