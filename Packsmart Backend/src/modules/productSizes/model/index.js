const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSizeSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product ID is required'],
        unique: true
    },
    sizes: [{
        name: {
            type: String,
            required: [true, 'Product Size name is required'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required']
        },
        quantity: Number,
        isDefault: Boolean
    }]
}, {
    timestamps: true
});

const ProductSize = mongoose.model('ProductSize', productSizeSchema);
module.exports = ProductSize