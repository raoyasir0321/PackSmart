const expressAsyncHandler = require("express-async-handler");

module.exports = {
    createCategory: expressAsyncHandler(async (req, res) => {
        const { body, context } = req
        const category = await context.categoryService.createCategory(body)
        return res.status(201).json({ data: { category } })
    }),
    updateCategory: expressAsyncHandler(async (req, res) => {
        const { _id } = req.params
        const { body, context } = req
        const category = await context.categoryService.updateCategory({ _id }, body)
        return res.status(201).json({ data: { category } })
    }),
    getAllCategory: expressAsyncHandler(async (req, res) => {
        const { context } = req
        const categories = await context.categoryService.getAllCategories()
        return res.status(200).json({ data: { categories } })
    }),
    deleteCategory: expressAsyncHandler(async (req, res) => {
        const { _id } = req.params
        const { context } = req
        const deleted = await context.categoryService.deleteCategory({ _id })
        return res.status(200).json({ data: { deleted } })
    }),
    getAllCategoryWithSection: expressAsyncHandler(async (req, res) => {
        const { context } = req
        const categories = await context.categoryService.getAllCategoryWithSection()
        return res.status(200).json({ data: { categories } })
    }),
    getCategoryWithSection: expressAsyncHandler(async (req, res) => {
        const { categoryId: _id } = req.params
        const { context } = req
        const category = await context.categoryService.getCategoryWithSection({ _id })
        return res.status(200).json({ data: { category } })
    })
}