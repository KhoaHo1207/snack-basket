const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Images are required",
      });
    }

    const images = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
      format: file.format,
      size: file.size,
    }));

    return res.status(201).json({
      success: true,
      message: "Upload images successfully",
      data: images,
    });
  } catch (error) {
    console.error("Upload multiple images failed:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { uploadMultipleImages };
