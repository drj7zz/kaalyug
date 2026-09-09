const Wallet = require("../models/Wallet")
const Payment = require("../models/Payment");
const Transaction = require("../models/Transaction");

const getWalletBalance = async (req,res,next)=>{
    try {
        const {userId} = req.params
        if(!userId){
            return res.status(400).json({
                message: "UserId is required!"
            })
        }
        const walletBalance = await Wallet.findOne({userId: userId})
        if(!walletBalance){
            return res.status(404).json({
                status: false,
                message: "Wallet not found",
            })
        }

        return res.json({
            status: true,
            message: "You have a good balance",
            balance: walletBalance.balance
        })

    } catch (error) {
        next(error)
    }
}
const addFunds = async (req, res, next) => {
    try {
        const { userId, amount } = req.body;

        // Validation
        if (!userId || !amount) {
            return res.status(400).json({
                status: false,
                message: "UserId and amount are required!"
            });
        }

        if (amount <= 0) {
            return res.status(400).json({
                status: false,
                message: "Amount must be greater than zero!"
            });
        }
        const updatedWallet = await Wallet.findOneAndUpdate(
            { userId: userId },
            { $inc: { balance: amount } },
            { new: true, upsert: true }
        );

        return res.json({
            status: true,
            message: "Funds added successfully",
            balance: updatedWallet.balance
        });

    } catch (error) {
        next(error);
    }
}
const getPaymentByReference = async (req, res, next) => {
    try {
        const { reference } = req.params;

        const payment = await Payment.findOne({ reference });
        if (!payment) {
            return res.status(404).json({
                status: false,
                message: "Payment not found"
            });
        }

        return res.json({
            status: true,
            data: payment
        });
    } catch (error) {
        next(error);
    }
}
const getTransactionByReference = async (req, res, next) => {
    try {
        const { reference } = req.params;

        const transaction = await Transaction.findOne({ reference });
        if (!transaction) {
            return res.status(404).json({
                status: false,
                message: "Transaction not found"
            });
        }

        return res.json({
            status: true,
            data: transaction
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getWalletBalance,
    addFunds,
    getPaymentByReference,
    getTransactionByReference
}
