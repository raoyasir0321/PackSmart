const { Router } = require('express')
const adminController = require('../controller')
const adminMiddleware = require('../../../middlewares/adminauthmiddleware')
const router = Router()

router.route('/').get(adminMiddleware, adminController.getAdmin).patch(adminMiddleware, adminController.updateAdmin)

module.exports = router