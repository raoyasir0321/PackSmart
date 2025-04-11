const expressAsyncHandler = require("express-async-handler");

module.exports = {
    getAdmin: expressAsyncHandler(async (req, res) => {
        const { id: _id } = req.user
        const { context } = req
        const admin = await context.adminService.getAdminById({ _id }, context)
        return res.status(200).json({ data: admin })
    }),
    updateAdmin: expressAsyncHandler(async (req, res) => {
        const { id: _id } = req.user
        const { body, context } = req
        const admin = await context.adminService.updateUser({ _id },body, context)
        return res.status(200).json({ data: admin })
    }),
}
