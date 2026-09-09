const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            index: true
        },
        reference: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: "YUG",
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "success", "failed"],
            default: "pending"
        },
        gatewayResponse: {
            type: Object,
            default: {}
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);