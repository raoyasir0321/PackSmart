const Router = require('express').Router;
const { adminauthmiddleware } = require('../../../middlewares');
const promotionController = require('../controller');
const router = Router();

router.route('/create-promotion').post(adminauthmiddleware, promotionController.createPromotion)
router.route('/:id').get(promotionController.getSinglePromotion)
router.route('/:id').delete(adminauthmiddleware, promotionController.deletePromotion)
router.route('/').get(promotionController.getAllPromotion)



module.exports = router;
