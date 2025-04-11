const expressAsyncHandler = require("express-async-handler")

module.exports = {
    createOrder: expressAsyncHandler(async (req, res) => {
        const { body, context, user } = req
        const order = await context.orderService.createOrder(body, user, context)
        return res.status(201).json({ data: { order } })
    }),
    updateStatus: expressAsyncHandler(async (req, res) => {
        const { params: { status, orderId: _id }, context } = req
        const order = await context.orderService.updateOrderStatus({ _id }, { status })
        return res.status(201).json({ data: { order } })
    }),
    getAllUserOrders: expressAsyncHandler(async (req, res) => {
        const { context, user } = req
        const order = await context.orderService.getAllUserOrders({ userId: user.id })
        return res.status(201).json({ data: { order } })
    }),
    getAllAdminOrders: expressAsyncHandler(async (req, res) => {
        const { context } = req
        const order = await context.orderService.getAllAdminOrders()
        return res.status(201).json({ data: { order } })
    }),
    getOrderStats: expressAsyncHandler(async (req, res) => {
        const { context, user } = req
        const order = await context.orderService.getOrderStats(({ userId: user.id }))
        return res.status(201).json({ data: { order } })
    }),
    getSingleOrder: expressAsyncHandler(async (req, res) => {
        const { context, params: { orderId } } = req
        const order = await context.orderService.getSingleOrder({ _id: orderId })
        return res.status(201).json({ data: { order } })
    })
}