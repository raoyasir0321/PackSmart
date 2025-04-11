const Router = require('express')
const wishesController = require('../controller')
const { authMiddleware } = require('../../../middlewares')
const router = Router()

router.route('/create-wish').post(authMiddleware, wishesController.saveWishes)
router.route('/get-wish').get(authMiddleware, wishesController.getWishes)

module.exports = router