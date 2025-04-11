const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalPrice: {
        type: Number,
        required: [true, "Total Price is Required"]
    },
    totalQuantity: {
        type: Number,
        required: [true, "Total Quantity is Required"]
    },
    status: {
        type: String,
        enum: ['INITIATED', 'PLACED', 'DELIVERED', 'COMPLETED'],
        default: 'INITIATED',
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    statusHistory: [{
        status: {
            type: String,
            enum: ['INITIATED', 'PLACED', 'DELIVERED', 'COMPLETED'],
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    promotionDetail: {
        promotionId: {
            type: Schema.Types.ObjectId,
            ref: 'Promotion',
        }
    },
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
