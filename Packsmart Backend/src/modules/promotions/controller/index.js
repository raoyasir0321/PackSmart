const expressAsyncHandler = require("express-async-handler")

module.exports = {
    createPromotion: expressAsyncHandler(async (req, res) => {
        const { context, body } = req
        const promotion = await context.promotionService.createPromotion(body)
        return res.status(201).json({ data: promotion })
    }),
    getAllPromotion: expressAsyncHandler(async (req, res) => {
        const { context } = req
        const promotion = await context.promotionService.getAllPromotion()
        return res.status(201).json({ data: promotion })
    }),
    getSinglePromotion: expressAsyncHandler(async (req, res) => {
        const { context, params: { id } } = req
        const promotion = await context.promotionService.getSinglePromotion(id)
        return res.status(201).json({ data: promotion })
    }),
    deletePromotion: expressAsyncHandler(async (req, res) => {
        const { context, params: { id } } = req
        const promotion = await context.promotionService.deletePromotion(id)
        return res.status(201).json({ data: promotion })
    })

}