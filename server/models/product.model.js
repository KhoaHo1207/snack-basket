const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    sale: {
      type: Number,
    },
    image: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
    },
    reviewCount: {
      type: Number,
    },
    averageRating: {
      type: Number,
    },
    sold: {
      type: Number,
    },
    stock: {
      type: Number,
    },
    categoryName: {
      type: String,
    },
    description: {
      type: String,
    },
    specs: {
      type: Array,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
