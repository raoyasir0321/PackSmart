const Router = require("express").Router;
const { adminauthmiddleware } = require("../../../middlewares");
const recommendationController = require("../controller");
const router = Router();

router
  .route("/create-recommendation")
  .post(adminauthmiddleware, recommendationController.createRecommendation);
router
  .route("/update-recommendation/:id")
  .patch(adminauthmiddleware, recommendationController.updateRecommendation);
router
  .route("/:id")
  .delete(adminauthmiddleware, recommendationController.deleteRecommendation);
router.route("/").get(recommendationController.getAllRecommendation);

module.exports = router;
