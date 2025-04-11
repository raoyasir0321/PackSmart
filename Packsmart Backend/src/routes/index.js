
module.exports = (app) => {
  app.use('/api/user', require('../modules/user/routes'));
  app.use('/api/auth', require('../modules/auth/routes'));
  app.use('/api/admin', require('../modules/admin/routes'))
  app.use('/api/category', require('../modules/categories/routes'))
  app.use('/api/section', require('../modules/section/routes'))
  app.use('/api/product', require('../modules/product/routes'))
  app.use('/api/order', require('../modules/order/routes'))
  app.use('/api/productSuggestion', require('../modules/productSuggestion/routes'))
  app.use('/api/product-size', require('../modules/productSizes/routes'))
  app.use('/api/promotion', require('../modules/promotions/routes'))
  app.use('/api/recommendation', require('../modules/recommendedProducts/routes'))
  app.use('/api/paypal', require('../modules/paypal/router'))
  app.use('/api/analytics', require("../modules/analytics/routes"))
  app.use('/api/filter', require("../modules/filter/routes"))
  app.use('/api/wishes', require('../modules/wishes/routes'))
  app.use('/upload-image', require('./image-upload-route'))
}

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });