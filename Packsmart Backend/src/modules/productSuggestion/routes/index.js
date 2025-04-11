const Router = require('express').Router;
const { authMiddleware } = require('../../../middlewares');
const suggestionComtroller = require('../controller');
const router = Router();

router.route('/').post(authMiddleware, suggestionComtroller.getSuggestion)
module.exports = router;
