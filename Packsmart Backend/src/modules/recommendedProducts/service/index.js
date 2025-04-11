const CustomErrorApi = require("../../../error");
const {
  createDocument,
  deleteOne,
  updateSingleDocument,
} = require("../../../utils");
const Recommendations = require("../model");

class Recommendation {
  constructor(model) {
    this.model = model;
  }

  async createRecommendation(body) {
    const recommendation = await createDocument(body, this.model);
    if (!recommendation) {
      throw new CustomErrorApi("Cannot create recommendations", 404);
    }
    return recommendation;
  }

  async getAllRecommendation() {
    const recommendations = await Recommendations.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $sort: { scale: 1 },
      },
      {
        $project: {
          _id: 1,
          productId: "$product._id",
          productName: "$product.name",
          description: "$product.description",
          sectionId: "$product.sectionId",
          currencyCode: "$product.currencyCode",
          imageUrl: "$product.imageUrl",
          price: "$product.price",
          quantity: "$product.quantity",
          scale: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    return recommendations;
  }

  async deleteRecommendation(id) {
    const deleted = await deleteOne(id, this.model);
    return deleted;
  }
  async updateRecommendation(id, data) {
    const recommendation = await updateSingleDocument(id, data, this.model);
    return recommendation;
  }
}

module.exports = new Recommendation(Recommendations);
