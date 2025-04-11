const Router = require('express')
const { authMiddleware } = require("../../../middlewares");
const { orders, trackOrder } = require('../controller');
// const { orders, trackOrder } = require("../controller/paypal");
const router = Router()

router.route("/orders").post( orders);
router
    .route("/capture-paypal-order")
    .post(trackOrder);

module.exports = router;