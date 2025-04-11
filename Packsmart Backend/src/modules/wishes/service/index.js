const CustomErrorApi = require("../../../error");
const { getByField } = require("../../../utils");
const Product = require("../../product/model");
const Wishes = require("../model");

class WishesService {
    constructor(model) {
        this.model = model
    }

    async saveWishes(body, user) {
        const wishes = await this.model.findOneAndUpdate(
            { userId: user.id },
            { $set: body },
            { new: true, runValidators: true, upsert: true }
        )
        return wishes
    }

    async getWishes(user) {
        let aggregate = [
            {
                $match: {
                    userId: user.id
                }
            },
            {
                $unwind: { path: "$productId" }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "product"
                }
            }
        ]
        return await this.model.aggregate(aggregate)
    }
}

module.exports = new WishesService(Wishes)