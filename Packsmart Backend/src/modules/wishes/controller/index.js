const expressAsyncHandler = require("express-async-handler");

module.exports = {
    saveWishes: expressAsyncHandler(async (req, res) => {
        const { context, body, user } = req
        const wish = await context.wishesService.saveWishes(body, user)
        return res.status(201).json({ data: wish })
    }),
    getWishes: expressAsyncHandler(async (req, res) => {
        const { context, user } = req
        const wish = await context.wishesService.getWishes(user)
        return res.status(201).json({ data: wish })
    })
}