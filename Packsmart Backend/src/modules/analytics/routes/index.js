const Router = require('express')
const { adminauthmiddleware } = require('../../../middlewares')
const analyticController = require('../controller')
const router = Router()

router.route('/get-sales-report').get(adminauthmiddleware, analyticController.getSalesReport)
router.route('/get-revenue-report').get(adminauthmiddleware, analyticController.getRevenueReport)
router.route('/get-net-report').get(adminauthmiddleware, analyticController.getNetReport)
router.route('/get-product-report').get(adminauthmiddleware, analyticController.getBestProductReport)
router.route('/get-section-report').get(adminauthmiddleware, analyticController.getBestSectionReport)
router.route('/get-category-report').get(adminauthmiddleware, analyticController.getBestCategoryReport)
router.route('/get-transaction-report').get(adminauthmiddleware, analyticController.getLatestTransactionReport)

module.exports = router