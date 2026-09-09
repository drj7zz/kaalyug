const mongoose = require("mongoose")

const walletShema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
            
        },
        balance: {
            type: Number,
            default: 500,
            required : true
        }
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model("Wallet",walletShema)