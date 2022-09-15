const express = require("express");
const router = express.Router();

const porductController = require("../controllers/product.controller");
router
  .route("/")
  .get(porductController.getProducts)
  .post(porductController.createProduct);

module.exports = router;
