const Router = require('express')
const { adminauthmiddleware } = require('../../../middlewares')
const productController = require('../controller')
const router = Router()

router.route('/admin/').get(productController.getAllProductForAdmin)
router.route('/add-product').post(adminauthmiddleware, productController.createProduct)
router.route('/update-product/:_id').patch(adminauthmiddleware, productController.updateProduct)
router.route('/new-arrivals').get(productController.newArrivals)
router.route('/').get(productController.getAllProduct)
router.route('/:_id').get(productController.getSingleProduct)
router.route('/delete-product/:_id').delete(adminauthmiddleware, productController.deleteProduct)

module.exports = router