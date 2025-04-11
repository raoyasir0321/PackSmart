const Router = require("express");
const { adminauthmiddleware } = require("../../../middlewares");
const sizeController = require("../controller");
const router = Router();

router
  .route("/create-size")
  .post(adminauthmiddleware, sizeController.createProductSizes);
router.route("/:productId/get-size").get(sizeController.getProductSizes);
router
  .route("/:productId/update-size")
  .put(adminauthmiddleware, sizeController.updateProductSizes);
module.exports = router;
