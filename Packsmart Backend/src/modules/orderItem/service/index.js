const CustomErrorApi = require("../../../error")
const { bulkCreate } = require("../../../utils")
const OrderItem = require("../model")

class OrderItemService {
    constructor(model) {
        this.model = model
    }
    async createOrderItem(orderId, orderItemsArray) {
        let orderItemPayload = []
        orderItemsArray.forEach(elem => {
            if (elem.size) {
                elem.size.forEach(item => {
                    orderItemPayload.push({
                        orderId,
                        productId: elem.productId,
                        quantity: item.quantity,
                        price: item.price,
                        size: item.name
                    })
                })
            } else {
                orderItemPayload.push({
                    orderId,
                    productId: elem.productId,
                    quantity: elem.quantity,
                    price: elem.price,
                    size: "No Size"
                })
            }
        });
        const orderItems = await bulkCreate(orderItemPayload, this.model)
        if (orderItems.length < 1) throw new CustomErrorApi("Failed to create Order Items", 400)
        return orderItems
    }
}

module.exports = new OrderItemService(OrderItem)