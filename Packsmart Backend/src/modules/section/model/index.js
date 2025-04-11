const { mongoose } = require("mongoose");
const Product = require("../../product/model");

const sectionSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'Name should be unique'],
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    }
}, {
    timestamps: true
})
sectionSchema.pre('deleteOne', { document: false, query: true }, async function () {
    const doc = await this.model.findOne(this.getFilter());
    await Product.deleteMany({ sectionId: doc._id })
});

const Section = mongoose.model('section', sectionSchema)
module.exports = Section