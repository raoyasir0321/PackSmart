const mongoose = require('mongoose');
const { Schema } = mongoose;

const recommendationSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        unique: true
    },
    scale: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Recommendations = mongoose.model('Recommendation', recommendationSchema);
module.exports = Recommendations;
