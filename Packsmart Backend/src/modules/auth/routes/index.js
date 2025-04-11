const { Router } = require('express')
const authController = require('../controller')
const router = Router()

router.route('/register').post(authController.registerUser)
router.route('/login').post(authController.loginUser)
router.route('/admin/login').post(authController.loginAdmin)

module.exports = router