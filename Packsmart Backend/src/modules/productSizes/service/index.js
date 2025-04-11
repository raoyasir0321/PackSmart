const CustomErrorApi = require("../../../error")
const { createDocument, getAll, getAllByField, validateFieldsForUpdate, updateSingleDocument } = require("../../../utils")
const ProductSize = require("../model")

class ProductSizes {
    constructor(model) {
        this.model = model
    }

    async createSizes(body) {
        const sizes = await createDocument(body, this.model)
        if (!sizes) throw new CustomErrorApi("Cannot create sizes", 500)
        return sizes
    }

    async getSizes(productId) {
        const sizes = await getAllByField({ productId }, this.model)
        return sizes
    }

    async updateSizes(body, productId) {
        let filterParam = { productId }
        const sizes = await updateSingleDocument(filterParam, body, this.model)
        return sizes
    }
}

module.exports = new ProductSizes(ProductSize)