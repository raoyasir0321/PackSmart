const CustomErrorApi = require("../../../error");
const {
  requiredFieldsPresent,
  createDocument,
  updateSingleDocument,
  extractFields,
  getAll,
  deleteOne,
  getById,
  validateFieldsForUpdate,
  getAllByField,
  applyJoin,
} = require("../../../utils");
const Product = require("../model");
class ProductService {
  constructor(model) {
    this.model = model;
    this.fields = [
      "_id",
      "name",
      "description",
      "price",
      "imageUrl",
      "quantity",
      "currencyCode",
      "createdAt",
    ];
  }

  async createProduct(data) {
    const { isValid, message } = requiredFieldsPresent(
      [
        "name",
        "description",
        "price",
        "sectionId",
        "imageUrl",
        "quantity",
        "currencyCode",
      ],
      data
    );
    if (!isValid) throw new CustomErrorApi(message, 400);
    const exists = await this.model.findOne({ name: data.name });
    if (exists) throw new CustomErrorApi("Name Already exists", 400);
    const product = await createDocument(data, this.model);
    if (!product) throw new CustomErrorApi("Failed to create a document", 400);
    return extractFields(product, this.fields);
  }

  async updateProduct(filterParam, data) {
    validateFieldsForUpdate(data, [
      "name",
      "price",
      "imageUrl",
      "quantity",
      "currencyCode",
    ]);
    let product;
    if (data["quantity"]) {
      product = await getById(filterParam, this.model);
      data.quantity += product.quantity;
    }
    product = await updateSingleDocument(filterParam, data, this.model);
    return extractFields(product, this.fields);
  }

  async getAllProduct(isAdmin) {
    let products;
    if (!isAdmin) {
      products = await getAllByField({ quantity: { $gt: 0 } }, this.model);
    } else {
      products = await getAll(this.model);
    }
    const product = await applyJoin(this.model, "ProductSize");
    return product;
  }

  async deleteProduct(id) {
    const deleted = deleteOne(id, this.model);
    return deleted;
  }

  async singleProduct(id) {
    const product = await getById(id, this.model);
    const productSizes = await applyJoin(
      this.model,
      "ProductSize",
      product._id
    );
    return productSizes;
  }

  async getLatest(limit = 4) {
    const result = await Product.aggregate([
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "productsizes",
          localField: "_id",
          foreignField: "productId",
          as: "sizes",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          imageUrl: 1,
          quantity: 1,
          currencyCode: 1,
          createdAt: 1,
          sectionId: 1,
          sizes: { $arrayElemAt: ["$sizes.sizes", 0] },
        },
      },
    ]);

    return result;
  }
}

module.exports = new ProductService(Product);
