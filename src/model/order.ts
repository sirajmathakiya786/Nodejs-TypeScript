import mongoose, { Schema, Model } from "mongoose";

interface Order{
    amount:Number,
    currency: String,
    receipt: String,
    paymentId: String,
    paymentStatus: string;
}

const orderSchema = new Schema<Order, Model<Order>>({
    amount: {type: Number, required: false },
    currency: { type: String, required: false },
    receipt: { type: String, required: false },
    paymentId: { type: String, required: false },
    paymentStatus: { type: String, default: 'pending' },
}, {
    versionKey: false,
    timestamps: true
})

const Order = mongoose.model<Order>('Order',orderSchema);

export default Order;