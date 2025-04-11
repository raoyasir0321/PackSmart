const { Router } = require("express");
const userController = require("../controller");
const authMiddleware = require("../../../middlewares/authmiddleware");
const router = Router();

router
  .route("/")
  .get(authMiddleware, userController.getUser)
  .patch(authMiddleware, userController.updateUser);
router
  .route("/updatePassword")
  .patch(authMiddleware, userController.updatePassword);

module.exports = router;
