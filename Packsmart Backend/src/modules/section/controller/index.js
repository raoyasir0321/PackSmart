const expressAsyncHandler = require("express-async-handler")

module.exports = {
    createSection: expressAsyncHandler(async (req, res) => {
        const { body, context } = req
        const section = await context.sectionService.createSection(body)
        return res.status(201).json({ data: { section } })
    }),
    updateSection: expressAsyncHandler(async (req, res) => {
        const { _id } = req.params
        const { body, context } = req
        const section = await context.sectionService.updateSection({ _id }, body)
        return res.status(201).json({ data: { section } })
    }),
    getAllSection: expressAsyncHandler(async (req, res) => {
        const { context } = req
        const section = await context.sectionService.getAllSection()
        return res.status(200).json({ data: { section } })
    }),
    deleteSection: expressAsyncHandler(async (req, res) => {
        const { _id } = req.params
        const { context } = req
        const deleted = await context.sectionService.deleteSection({ _id })
        return res.status(200).json({ data: { deleted } })
    }),
    getSingleSection: expressAsyncHandler(async (req, res) => {
        const { _id } = req.params
        const { context } = req
        const section = await context.sectionService.singleSection({ _id })
        return res.status(200).json({ data: { section } })
    }),
    getAllSectionWithCategory: expressAsyncHandler(async (req, res) => {
        const { context } = req
        const section = await context.sectionService.getAllSectionWithCategory()
        return res.status(200).json({ data: { section } })
    }),
    getSingleSectionWithCategory: expressAsyncHandler(async (req, res) => {
        const { sectionId: _id } = req.params
        const { context } = req
        const section = await context.sectionService.getSingleSectionWithCategory({ _id })
        return res.status(200).json({ data: { section } })
    }),
    getAllSectionWithProduct: expressAsyncHandler(async (req, res) => {
        const { context } = req
        const section = await context.sectionService.getAllSectionWithProduct()
        return res.status(200).json({ data: { section } })
    }),
    getSingleSectionWithProduct: expressAsyncHandler(async (req, res) => {
        const { sectionId: _id } = req.params
        const { context } = req
        const section = await context.sectionService.getSingleSectionWithProduct({ _id })
        return res.status(200).json({ data: { section } })
    }),
    getRelatedtems: expressAsyncHandler(async (req, res) => {
        const { _id } = req.params
        const { context } = req
        const section = await context.sectionService.getSingleSectionWithProduct({ _id, limit: 4 })
        return res.status(200).json({ data: { section } })
    })
}