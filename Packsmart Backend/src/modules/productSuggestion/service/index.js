const mongoose = require("mongoose");
const Product = require("../../product/model");

class ProductSuggestionService {
    async getAllproductsForSuggestion(body, context) {
        const { sectionIds, maxBudget } = body;
        if (!Array.isArray(sectionIds) || sectionIds.length === 0) {
            throw new CustomErrorApi("Section IDs must be a non-empty array.", 400);
        }
        if (maxBudget <= 0) {
            throw new CustomErrorApi("Max budget must be greater than zero.", 400);
        }
        const sectionObjectIds = sectionIds.map(id => new mongoose.Types.ObjectId(id));
        const aggregationPipeline = [
            {
                $match: {
                    sectionId: { $in: sectionObjectIds },
                    quantity: { $gt: 0 }
                }
            },
            {
                $lookup: {
                    from: "sections",
                    localField: "sectionId",
                    foreignField: "_id",
                    as: "section"
                }
            },
            {
                $addFields: {
                    valueToPriceRatio: { $divide: ["$quantity", "$price"] }
                }
            },
            {
                $sort: { valueToPriceRatio: -1 }
            },
            {
                $group: {
                    _id: null,
                    products: { $push: "$$ROOT" }
                }
            },
            {
                $project: {
                    selectedProducts: {
                        $let: {
                            vars: {
                                budget: maxBudget,
                                selected: [],
                                totalPrice: 0
                            },
                            in: {
                                $reduce: {
                                    input: "$products",
                                    initialValue: { selected: [], totalPrice: 0 },
                                    in: {
                                        $cond: {
                                            if: { 
                                                $lte: [{ $add: ["$$value.totalPrice", "$$this.price"] }, "$$budget"]
                                            },
                                            then: {
                                                selected: { $concatArrays: ["$$value.selected", ["$$this"]] },
                                                totalPrice: { $add: ["$$value.totalPrice", "$$this.price"] }
                                            },
                                            else: "$$value"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    productsSelected: "$selectedProducts.selected",
                    estimation: "$selectedProducts.totalPrice",
                    selectedProducts: {
                        $map: {
                            input: "$selectedProducts.selected",
                            as: "product",
                            in: {
                                $concat: [
                                    "$$product.name",
                                    " - Price: ",
                                    { $toString: "$$product.price" },
                                    " ",
                                    "$$product.currencyCode"
                                ]
                            }
                        }
                    }
                }
            }
        ];
        const result = await Product.aggregate(aggregationPipeline)
        if (!result.length || result[0].productsSelected.length === 0) {
            throw new CustomErrorApi("No available products found within the specified budget.", 404);
        }
        return result[0];
    }
}

module.exports = new ProductSuggestionService()