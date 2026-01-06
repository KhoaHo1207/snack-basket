const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
} = require("../controllers/product.controller");

router.get("/", getAllProducts);
router.post("/create", createProduct);
router.get("/:id", getProductById);

module.exports = router;
