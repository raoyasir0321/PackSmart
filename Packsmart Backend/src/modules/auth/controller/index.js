const asynchandler = require("express-async-handler");

module.exports = {
    registerUser: asynchandler(async (req, res) => {
        const { body, context } = req
        const user = await context.authService.createUser(body, context)
        return res.status(201).json({ data: { user } })
    }),
    loginUser: asynchandler(async (req, res) => {
        const { body, context } = req
        const user = await context.authService.userLogin(body, context)
        return res.status(200).json({ data: { user } })
    }),
    loginAdmin: asynchandler(async (req, res) => {
        const { body, context } = req
        const admin = await context.authService.adminLogin(body, context)
        return res.status(200).json({ data: { admin } })
    }),
}
