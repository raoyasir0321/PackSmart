const { mongoose } = require("mongoose");
const { Schema } = mongoose;


const wishesSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'User ID is required'],
        unique: true
    },
    productId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Products',
            required: [true, 'Product ID is required'],
            unique: true
        }
    ]
})

const Wishes = mongoose.model('Wishes', wishesSchema)
module.exports = Wishes