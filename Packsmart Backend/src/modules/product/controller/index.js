const expressAsyncHandler = require("express-async-handler");

module.exports = {
    createProduct: expressAsyncHandler(async (req, res) => {
        const { body, context } = req
        const product = await context.productService.createProduct(body)
        return res.status(201).json({ data: { product } })
    }),
    updateProduct: expressAsyncHandler(async (req, res) => {
        const { _id } = req.params
        const { body, context } = req
        const product = await context.productService.updateProduct({ _id }, body)
        return res.status(201).json({ data: { product } })
    }),
    getAllProduct: expressAsyncHandler(async (req, res) => {
        const { context } = req
        const products = await context.productService.getAllProduct()
        return res.status(200).json({ data: { products } })
    }),
    deleteProduct: expressAsyncHandler(async (req, res) => {
        const { _id } = req.params
        const { context } = req
        const deleted = await context.productService.deleteProduct({ _id })
        return res.status(200).json({ data: { deleted } })
    }),
    getSingleProduct: expressAsyncHandler(async (req, res) => {
        const { _id } = req.params
        const { context } = req
        const product = await context.productService.singleProduct({ _id })
        return res.status(200).json({ data: { product } })
    }),
    getAllProductForAdmin: expressAsyncHandler(async (req, res) => {
        const { context } = req
        const products = await context.productService.getAllProduct(true)
        return res.status(200).json({ data: { products } })
    }),
    newArrivals: expressAsyncHandler(async (req, res) => { 
        const { context } = req
        const products = await context.productService.getLatest()
        return res.status(200).json({ data: { products } })
    })
}