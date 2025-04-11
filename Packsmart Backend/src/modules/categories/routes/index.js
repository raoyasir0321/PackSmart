const Router = require("express");
const { adminauthmiddleware } = require("../../../middlewares");
const categoryController = require("../controller");
const router = Router();

router
  .route("/add-category")
  .post(adminauthmiddleware, categoryController.createCategory);
router
  .route("/update-category/:_id")
  .patch(adminauthmiddleware, categoryController.updateCategory);
router.route("/").get(categoryController.getAllCategory);
router
  .route("/delete-category/:_id")
  .delete(adminauthmiddleware, categoryController.deleteCategory);
router.route("/section").get(categoryController.getAllCategoryWithSection);
router
  .route("/:categoryId/section")
  .get(categoryController.getCategoryWithSection);

module.exports = router;
