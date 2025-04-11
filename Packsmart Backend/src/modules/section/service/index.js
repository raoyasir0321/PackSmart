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
const Section = require("../model");

class SectionService {
  constructor(model) {
    this.model = model;
    this.fields = ["_id", "name", "description", "createdAt"];
  }
  async createSection(body) {
    const { isValid, message } = requiredFieldsPresent(
      ["name", "categoryId", "description"],
      body
    );
    if (!isValid) throw new CustomErrorApi(message, 400);
    const exists = await this.model.findOne({ name: body.name });
    if (exists) throw new CustomErrorApi("Section exists with same name", 400);
    const section = await createDocument(body, this.model);
    return extractFields(section, this.fields);
  }
  async updateSection(id, data) {
    validateFieldsForUpdate(data, ["name", "categoryId", "description"]);
    const section = await updateSingleDocument(id, data, this.model);
    return extractFields(section, this.fields);
  }
  async getAllSection() {
    const section = await getAll(this.model);
    return extractFields(section, this.fields);
  }
  async singleSection(id) {
    const section = await getById(id, this.model);
    return extractFields(section, this.fields);
  }
  async deleteSection(id) {
    const deleted = await this.model.deleteOne(id);
    return deleted;
  }
  async getAllSectionWithCategory() {
    const sections = await populate(this.model, "categoryId");
    return sections.map((elem) => elem.toObject());
  }

  async getAllSectionWithProduct() {
    const products = await applyJoin(this.model, "Product");
    let field = this.fields;
    field.push("products");
    return extractFields(products, field);
  }

  async getSingleSectionWithProduct({ _id, limit }) {
    let limits = limit || 0;
    let section = await Section.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(_id) },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "sectionId",
          as: "products",
        },
      },
      {
        $unwind: { path: "$products", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "productsizes",
          localField: "products._id",
          foreignField: "productId",
          as: "products.sizes",
        },
      },
      { $sort: { "products.price": -1 } },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          description: { $first: "$description" },
          categoryId: { $first: "$categoryId" },
          products: {
            $push: {
              _id: "$products._id",
              name: "$products.name",
              description: "$products.description",
              price: "$products.price",
              imageUrl: "$products.imageUrl",
              quantity: "$products.quantity",
              currencyCode: "$products.currencyCode",
              sizes: { $arrayElemAt: ["$products.sizes.sizes", 0] },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          categoryId: 1,
          products:
            limits > 0 ? { $slice: ["$products", limits] } : "$products",
        },
      },
    ]);

    return section.length ? section[0] : null;
  }

  async getSingleSectionWithCategory(id) {
    let section = await getById(id, this.model);
    section = await populate(this.model, "categoryId", { _id: section._id });
    return section.map((section) => section.toObject());
  }
}

module.exports = new SectionService(Section);
