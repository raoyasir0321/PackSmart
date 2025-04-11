const Router = require("express").Router;
const { authMiddleware, adminauthmiddleware } = require("../../../middlewares");
const orderController = require("../controller");
const router = Router();

router.route("/create").post(authMiddleware, orderController.createOrder);
router
  .route("/:orderId/status/:status")
  .patch(adminauthmiddleware, orderController.updateStatus);
router.route("/").get(authMiddleware, orderController.getAllUserOrders);
router
  .route("/user/order-numbers")
  .get(authMiddleware, orderController.getOrderStats);
router
  .route("/admin/")
  .get(adminauthmiddleware, orderController.getAllAdminOrders);
router.route("/:orderId/").get(orderController.getSingleOrder);

module.exports = router;
