const express = require("express");
const router = express.Router();

const porductController = require("../controllers/product.controller");
router
  .route("/")
  .get(porductController.getProducts)
  .post(porductController.createProduct);

router.route("/bulk-update").patch(porductController.bulkUpdateProduct);

router.route("/:id").patch(porductController.updateProduct);

module.exports = router;
