const expressAsyncHandler = require("express-async-handler");

module.exports = {
    getSalesReport: expressAsyncHandler(async (req, res) => {
        const { context } = req
        let data = await context.analyticService.getSalesReport(context)
        return res.status(200).json({ data })
    }),
    getRevenueReport: expressAsyncHandler(async (req, res) => {
        const { context } = req
        let data = await context.analyticService.getRevenueReport(context)
        return res.status(200).json({ data })
    }),
    getNetReport: expressAsyncHandler(async (req, res) => {
        const { context } = req
        let data = await context.analyticService.getNetReport(context)
        return res.status(200).json({ data })
    }),
    getBestProductReport: expressAsyncHandler(async (req, res) => {
        const { context } = req
        let data = await context.analyticService.getBestProductReport(context)
        return res.status(200).json({ data })
    }),
    getLatestTransactionReport: expressAsyncHandler(async (req, res) => {
        const { context } = req
        let data = await context.analyticService.getLatestTransactionReport(context)
        return res.status(200).json({ data })
    }),
    getBestSectionReport: expressAsyncHandler(async (req, res) => {
        const { context } = req
        let data = await context.analyticService.getBestSectionReport(context)
        return res.status(200).json({ data })
    }),
    getBestCategoryReport: expressAsyncHandler(async (req, res) => {
        const { context } = req
        let data = await context.analyticService.getBestCategoryReport(context)
        return res.status(200).json({ data })
    })
}