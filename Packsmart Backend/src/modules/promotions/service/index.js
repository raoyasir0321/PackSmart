const { default: mongoose } = require("mongoose");
const CustomErrorApi = require("../../../error");
const {
  requiredFieldsPresent,
  createDocument,
  extractFields,
  updateSingleDocument,
  getAll,
  getById,
  deleteOne,
  validateFieldsForUpdate,
  applyJoin,
  populate,
} = require("../../../utils");
const Promotion = require("../model");

class PromotionService {
  constructor(model) {
    this.model = model;
  }
  async createPromotion(body) {
    const promotion = await createDocument(body, this.model);
    if (!promotion) throw new CustomErrorApi("Failed to create promotion", 404);
    return promotion;
  }

  async getAllPromotion() {
    const promotions = await Promotion.aggregate([
      {
        $match: { isActive: true },
      },
      {
        $unwind: "$prices",
      },
      {
        $lookup: {
          from: "products",
          localField: "prices.productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: {
          path: "$product",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "productSizes",
          localField: "product._id",
          foreignField: "productId",
          as: "productSize",
        },
      },
      {
        $unwind: {
          path: "$productSize",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          sizeDetails: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$productSize.sizes",
                  as: "size",
                  cond: { $eq: ["$$size.name", "$prices.sizeName"] },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          startDate: { $first: "$startDate" },
          endDate: { $first: "$endDate" },
          isActive: { $first: "$isActive" },
          imageUrl: { $first: "$imageUrl" },
          bannerImageUrl: { $first: "$bannerImageUrl" },
          products: {
            $push: {
              productId: "$product._id",
              productName: "$product.name",
              description: "$product.description",
              sectionId: "$product.sectionId",
              currencyCode: "$product.currencyCode",
              imageUrl: "$product.imageUrl",
              originalPrice: "$prices.originalPrice",
              discountedPrice: "$prices.discountedPrice",
              sizeName: "$prices.sizeName",
              sizeDetails: {
                name: "$sizeDetails.name",
                quantity: "$sizeDetails.quantity",
                isDefault: "$sizeDetails.isDefault",
              },
            },
          },
        },
      },
    ]);
    return promotions;
  }

  async getSinglePromotion(id) {
    const promotions = await Promotion.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      // {
      //     $match: { isActive: true }
      // },
      {
        $unwind: "$prices",
      },
      {
        $lookup: {
          from: "products",
          localField: "prices.productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: {
          path: "$product",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "productSizes",
          localField: "product._id",
          foreignField: "productId",
          as: "productSize",
        },
      },
      {
        $unwind: {
          path: "$productSize",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          sizeDetails: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$productSize.sizes",
                  as: "size",
                  cond: { $eq: ["$$size.name", "$prices.sizeName"] },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          startDate: { $first: "$startDate" },
          endDate: { $first: "$endDate" },
          isActive: { $first: "$isActive" },
          imageUrl: { $first: "$imageUrl" },
          bannerImageUrl: { $first: "$bannerImageUrl" },
          products: {
            $push: {
              productId: "$product._id",
              productName: "$product.name",
              description: "$product.description",
              sectionId: "$product.sectionId",
              currencyCode: "$product.currencyCode",
              imageUrl: "$product.imageUrl",
              originalPrice: "$prices.originalPrice",
              discountedPrice: "$prices.discountedPrice",
              sizeName: "$prices.sizeName",
              sizeDetails: {
                name: "$sizeDetails.name",
                quantity: "$sizeDetails.quantity",
                isDefault: "$sizeDetails.isDefault",
              },
            },
          },
        },
      },
    ]);
    return promotions;
  }

  async deletePromotion(id) {
    const promotion = await deleteOne(id, this.model);
    return promotion;
  }
}

module.exports = new PromotionService(Promotion);
