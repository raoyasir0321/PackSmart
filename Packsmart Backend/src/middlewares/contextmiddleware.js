const userService = require('../modules/user/service');
const authService = require('../modules/auth/service')
const adminService = require('../modules/admin/service')
const categoryService = require('../modules/categories/service')
const sectionService = require('../modules/section/service')
const productService = require('../modules/product/service')
const orderService = require('../modules/order/service')
const orderItemService = require('../modules/orderItem/service')
const productSuggestionService = require('../modules/productSuggestion/service')
const productSizes = require('../modules/productSizes/service')
const promotionService = require('../modules/promotions/service')
const recommendationService = require('../modules/recommendedProducts/service')
const analyticService = require('../modules/analytics/service')
const filterService = require('../modules/filter/service')
const wishesService = require('../modules/wishes/service')

module.exports = function attachServices(req, res, next) {
    if (!req.context) req.context = {};
    req.context.userService = userService;
    req.context.authService = authService;
    req.context.adminService = adminService
    req.context.categoryService = categoryService
    req.context.sectionService = sectionService
    req.context.productService = productService
    req.context.orderService = orderService
    req.context.orderItemService = orderItemService
    req.context.productSuggestionService = productSuggestionService
    req.context.promotionService = promotionService
    req.context.recommendationService = recommendationService
    req.context.productSizes = productSizes
    req.context.analyticService = analyticService
    req.context.filterService = filterService
    req.context.wishesService = wishesService
    next();
};
