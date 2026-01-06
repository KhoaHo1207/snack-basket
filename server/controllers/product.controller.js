const Product = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      lessPrice,
      sale,
      image,
      images,
      reviewCount,
      averageRating,
      sold,
      stock,
      categoryName,
      description,
      specs,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }
    if (!price) {
      return res.status(400).json({
        success: false,
        message: "Price is required",
      });
    }
    if (!lessPrice) {
      return res.status(400).json({
        success: false,
        message: "Less price is required",
      });
    }
    if (!sale) {
      return res.status(400).json({
        success: false,
        message: "Sale is required",
      });
    }
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
    if (!images) {
      return res.status(400).json({
        success: false,
        message: "Images is required",
      });
    }
    if (!reviewCount) {
      return res.status(400).json({
        success: false,
        message: "Review count is required",
      });
    }
    if (!averageRating) {
      return res.status(400).json({
        success: false,
        message: "Average rating is required",
      });
    }
    if (!sold) {
      return res.status(400).json({
        success: false,
        message: "Sold is required",
      });
    }
    if (!stock) {
      return res.status(400).json({
        success: false,
        message: "Stock is required",
      });
    }
    if (!categoryName) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }
    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Description is required",
      });
    }
    if (!specs) {
      return res.status(400).json({
        success: false,
        message: "Specs is required",
      });
    }
    const product = await Product.create({
      title,
      price,
      lessPrice,
      sale,
      image,
      images,
      reviewCount,
      averageRating,
      sold,
      stock,
      categoryName,
      description,
      specs,
    });
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};
