const CustomErrorApi = require("../../../error")
const { requiredFieldsPresent, createDocument, getAll, validateOrder, getAllByField, applyJoin, getById } = require("../../../utils")
const Order = require("../model")
const Product = require("../../product/model")
const mongoose = require('mongoose')
const ProductSize = require("../../productSizes/model")

class OrderService {
    constructor(model) {
        this.model = model
        this.fields = ["_id", "totalPrice", "totalQuantity", "status", "createdAt"]
    }
    async createOrder(body, user, context) {
        const session = await mongoose.startSession();
        try {
            const { orderItem, type, promotionPrice, promotionId } = body
            let { isValid, message } = requiredFieldsPresent(['orderItem'], body)
            if (!isValid) throw new CustomErrorApi(message, 400)
            session.startTransaction();
            let { valid, orderMessage, totalPrice, totalQuantity } = await validateOrder(body)
            if (!valid) throw new CustomErrorApi(orderMessage, 400)
            let payload;
            if (type) {
                payload = { status: 'INITIATED', userId: user.id, promotionDetail: { promotionId }, totalPrice: promotionPrice, totalQuantity, statusHistory: [{ status: 'INITIATED' }] }
                const order = await createDocument(payload, this.model)
                await session.commitTransaction();
                session.endSession();
                return { order }
            } else {
                payload = { status: 'INITIATED', userId: user.id, totalPrice, totalQuantity, statusHistory: [{ status: 'INITIATED' }] }
            }
            const order = await createDocument(payload, this.model)
            const orderItems = await context.orderItemService.createOrderItem(order, orderItem)
            const promises = orderItems.map(async item => {
                if (item.size) {
                    await ProductSize.findOneAndUpdate({ productId: item.productId, "sizes.name": item.size }, { $inc: { "sizes.$.quantity": -item.quantity } }
                    )
                } else {
                    await Product.findByIdAndUpdate({ _id: item.productId }, { $inc: { quantity: -item.quantity } })
                }
            })
            await Promise.all(promises)
            await session.commitTransaction();
            session.endSession();
            return { order, orderItems }
        } catch (error) {
            await session.abortTransaction();
            session.endSession()
            throw new CustomErrorApi(error, 400)
        }
    }
    async updateOrderStatus(orderId, { status }) {
        try {
            const order = await this.model.findById(orderId);
            if (!order) {
                return { error: true, message: "Order not found" };
            }
            if (order.status === status) {
                return { error: false, message: "The order status has already been set to this value." };
            }
            const validTransitions = {
                'INITIATED': ['PLACED'],
                'PLACED': ['DELIVERED'],
                'DELIVERED': ['COMPLETED'],
                'COMPLETED': []
            };
            if (!validTransitions[order.status].includes(status)) {
                return { error: true, message: `Invalid status transition from ${order.status} to ${status}` };
            }
            const updateQuery = {
                $set: { status: status, paid: true },
                $push: { statusHistory: { status: status, date: new Date() } }
            };
            const updatedOrder = await this.model.findByIdAndUpdate(orderId, updateQuery, { new: true, runValidators: true });
            return updatedOrder
        } catch (error) {
            throw new CustomErrorApi("Failed to update order status", 400)
        }
    }

    async getAllUserOrders({ userId }) {
        const data = await Order.aggregate([
            { $match: { userId } },
            {
                "$lookup": {
                    "from": "orderitems",
                    "localField": "_id",
                    "foreignField": "orderId",
                    "as": "orderitems"
                }
            },
            {
                "$unwind": {
                    "path": "$orderitems",
                    "preserveNullAndEmptyArrays": true
                }
            },
            {
                "$lookup": {
                    "from": "products",
                    "localField": "orderitems.productId",
                    "foreignField": "_id",
                    "as": "orderitems.product"
                }
            },
            {
                "$unwind": {
                    "path": "$orderitems.product",
                    "preserveNullAndEmptyArrays": true
                }
            },
            {
                "$group": {
                    "_id": "$_id",
                    "userId": { "$first": "$userId" },
                    "totalPrice": { "$first": "$totalPrice" },
                    "totalQuantity": { "$first": "$totalQuantity" },
                    "status": { "$first": "$status" },
                    "paid": { "$first": "$paid" },
                    "statusHistory": { "$first": "$statusHistory" },
                    "createdAt": { "$first": "$createdAt" },
                    "updatedAt": { "$first": "$updatedAt" },
                    "__v": { "$first": "$__v" },
                    "orderitems": {
                        "$push": {
                            "_id": "$orderitems._id",
                            "orderId": "$orderitems.orderId",
                            "productId": "$orderitems.productId",
                            "quantity": "$orderitems.quantity",
                            "price": "$orderitems.price",
                            "size": "$orderitems.size",
                            "product": {
                                "_id": "$orderitems.product._id",
                                "name": "$orderitems.product.name",
                                "description": "$orderitems.product.description",
                                "price": "$orderitems.product.price",
                                "sectionId": "$orderitems.product.sectionId",
                                "imageUrl": "$orderitems.product.imageUrl",
                                "quantity": "$orderitems.product.quantity",
                                "currencyCode": "$orderitems.product.currencyCode"
                            }
                        }
                    }
                }
            }
        ])
        return data
    }

    async getAllAdminOrders() {
        const orders = await Order.aggregate([
            {
                "$lookup": {
                    "from": "users",
                    "localField": "userId",
                    "foreignField": "_id",
                    "as": "user"
                }
            },
            {
                "$unwind": {
                    "path": "$user",
                    "preserveNullAndEmptyArrays": true
                }
            },
            {
                "$lookup": {
                    "from": "orderitems",
                    "localField": "_id",
                    "foreignField": "orderId",
                    "as": "orderitems"
                }
            },
            {
                "$unwind": {
                    "path": "$orderitems",
                    "preserveNullAndEmptyArrays": true
                }
            },
            {
                "$lookup": {
                    "from": "products",
                    "localField": "orderitems.productId",
                    "foreignField": "_id",
                    "as": "orderitems.product"
                }
            },
            {
                "$unwind": {
                    "path": "$orderitems.product",
                    "preserveNullAndEmptyArrays": true
                }
            },
            {
                "$group": {
                    "_id": "$_id",
                    "user": {
                        "$first": {
                            "_id": "$user._id",
                            "name": "$user.name",
                            "email": "$user.email"
                        }
                    },
                    "totalPrice": { "$first": "$totalPrice" },
                    "totalQuantity": { "$first": "$totalQuantity" },
                    "status": { "$first": "$status" },
                    "paid": { "$first": "$paid" },
                    "statusHistory": { "$first": "$statusHistory" },
                    "createdAt": { "$first": "$createdAt" },
                    "updatedAt": { "$first": "$updatedAt" },
                    "__v": { "$first": "$__v" },
                    "orderitems": {
                        "$push": {
                            "_id": "$orderitems._id",
                            "orderId": "$orderitems.orderId",
                            "productId": "$orderitems.productId",
                            "quantity": "$orderitems.quantity",
                            "price": "$orderitems.price",
                            "size": "$orderitems.size",
                            "product": {
                                "_id": "$orderitems.product._id",
                                "name": "$orderitems.product.name",
                                "description": "$orderitems.product.description",
                                "price": "$orderitems.product.price",
                                "sectionId": "$orderitems.product.sectionId",
                                "imageUrl": "$orderitems.product.imageUrl",
                                "quantity": "$orderitems.product.quantity",
                                "currencyCode": "$orderitems.product.currencyCode"
                            }
                        }
                    }
                }
            }
        ]
        );

        return orders
    }

    async getOrderStats({ userId }) {
        const orders = await Order.aggregate([
            {
                $match: { userId }
            },
            {
                $group: {
                    _id: "$status",
                    orders: {
                        $push: {
                            _id: "$_id",
                            totalPrice: "$totalPrice",
                            totalQuantity: "$totalQuantity",
                            paid: "$paid",
                            createdAt: "$createdAt"
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        return orders;
    }

    async getSingleOrder({ _id }) {
        let aggregate = [
            {
                $match: { _id: new mongoose.Types.ObjectId(_id) }
            },
            {
                $lookup: {
                    from: "orderitems",
                    let: { orderId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$orderId", "$$orderId"] }
                            }
                        },
                        {
                            $lookup: {
                                from: "products",
                                let: { productId: "$productId" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: { $eq: ["$_id", "$$productId"] }
                                        }
                                    },
                                ],
                                as: "product"
                            }
                        },
                    ],
                    as: "orderItems"
                }
            }

        ]
        const order = await Order.aggregate(aggregate)

        return order
    }
}

module.exports = new OrderService(Order)