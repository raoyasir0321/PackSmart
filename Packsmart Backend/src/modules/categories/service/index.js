const { default: mongoose } = require("mongoose")
const CustomErrorApi = require("../../../error")
const { requiredFieldsPresent, createDocument, updateSingleDocument, extractFields, getAll, deleteOne, validateFieldsForUpdate, applyJoin, getById } = require("../../../utils")
const Section = require("../../section/model")
const Category = require('../model/index')
class CategoryService {
    constructor(model) {
        this.model = model
        this.fields = ["_id", "name", "description", "createdAt","imageUrl"]
    }

    async createCategory(data) {
        const { isValid, message } = requiredFieldsPresent(['name', 'description', 'imageUrl'], data)
        if (!isValid) throw new CustomErrorApi(message, 400)
        const exists = await this.model.findOne({ name: data.name })
        if (exists) throw new CustomErrorApi("Name Already exists", 400)
        const category = await createDocument(data, this.model)
        if (!category) throw new CustomErrorApi("Failed to create a document", 400)
        return category
    }

    async updateCategory(filterParam, data) {
        validateFieldsForUpdate(data, ['name', 'description'])
        const category = await updateSingleDocument(filterParam, data, this.model)
        return extractFields(category, this.fields)
    }

    async getAllCategories() {
        const categories = await getAll(this.model)
        return extractFields(categories, this.fields)
    }

    async deleteCategory(id) {
        const session = await mongoose.startSession();
        try {
            session.startTransaction();
            let category = await getById(id, this.model)
            const [categoriesWithSection] = await applyJoin(this.model, 'section', category._id)
            const promise = categoriesWithSection.sections.map(async section => await Section.deleteOne({ _id: section._id }))
            await Promise.all(promise)
            await deleteOne(id, this.model)
            await session.commitTransaction();
            session.endSession();

        } catch (error) {
            await session.abortTransaction();
            session.endSession();
        }
    }

    async getAllCategoryWithSection() {
        const categories = await applyJoin(Category, 'section')
        let field = this.fields
        field.push('sections')
        return extractFields(categories, field)
    }

    async getCategoryWithSection(id) {
        let category = await getById(id, this.model)
        category = await applyJoin(Category, 'section', category._id)
        let field = this.fields
        field.push('sections')
        return extractFields(category, field)
    }
}

module.exports = new CategoryService(Category)