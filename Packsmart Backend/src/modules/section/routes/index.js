const Router = require("express").Router;
const { adminauthmiddleware, authMiddleware } = require("../../../middlewares");
const sectionController = require("../controller");
const router = Router();

router
  .route("/category")
  .get(authMiddleware, sectionController.getAllSectionWithCategory);
router
  .route("/product")
  .get(authMiddleware, sectionController.getAllSectionWithProduct);
router
  .route("/:sectionId/product")
  .get(authMiddleware, sectionController.getSingleSectionWithProduct);
router
  .route("/:sectionId/category")
  .get(sectionController.getSingleSectionWithCategory);

router.route("/").get(sectionController.getAllSection);
router.route("/:_id/related-items").get(sectionController.getRelatedtems);
router.route("/:_id").get(sectionController.getSingleSection);

router
  .route("/add-section")
  .post(adminauthmiddleware, sectionController.createSection);
router
  .route("/update-section/:_id")
  .patch(adminauthmiddleware, sectionController.updateSection);
router
  .route("/delete-section/:_id")
  .delete(adminauthmiddleware, sectionController.deleteSection);

module.exports = router;
