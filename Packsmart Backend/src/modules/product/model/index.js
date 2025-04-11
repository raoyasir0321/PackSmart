const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        unique: [true, 'Product name must be unique'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    sectionId: {
        type: Schema.Types.ObjectId,
        ref: 'Section',
        required: [true, 'Section ID is required']
    },
    imageUrl: String,
    quantity: Number,
    currencyCode: {
        type: String,
        required: [true, 'Currency Code is required']
    },
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
productSchema.index({ name: "text" });
module.exports = Product