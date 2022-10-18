const express = require("express");
const router = express.Router();

const porductController = require("../controllers/product.controller");

router.route("/bulk-update").patch(porductController.bulkUpdateProduct);
router.route("/bulk-delete").delete(porductController.bulkDeleteProduct);

router
  .route("/")
  .get(porductController.getProducts)
  .post(porductController.createProduct);

router
  .route("/:id")
  .patch(porductController.updateProduct)
  .delete(porductController.deleteProductById);

module.exports = router;
