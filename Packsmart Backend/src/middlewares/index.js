const adminauthmiddleware = require("./adminauthmiddleware");
const authMiddleware = require("./authmiddleware");
const uploadMiddleware = require("./imagemiddleware")
module.exports = {
    authMiddleware,
    adminauthmiddleware,
    uploadMiddleware
}