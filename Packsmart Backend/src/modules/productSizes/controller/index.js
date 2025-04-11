const expressAsyncHandler = require("express-async-handler")

module.exports = {
    createProductSizes: expressAsyncHandler(async (req, res) => {
        const { body, context } = req
        const sizes = await context.productSizes.createSizes(body)
        return res.status(201).json({ data: sizes })
    }),
    getProductSizes: expressAsyncHandler(async (req, res) => {
        const { context, params: { productId } } = req
        const sizes = await context.productSizes.getSizes(productId)
        return res.status(200).json({ data: sizes })
    }),
    updateProductSizes: expressAsyncHandler(async (req, res) => {
        const { body, context, params: { productId } } = req
        const sizes = await context.productSizes.updateSizes(body, productId)
        return res.status(201).json({ data: sizes })
    }),
}