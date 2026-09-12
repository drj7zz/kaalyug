const Wallet = require("../models/Wallet");
const Payment = require("../models/Payment");
const Transaction = require("../models/Transaction");
const crypto = require("crypto");

const generateRef = () => "TXN-" + crypto.randomBytes(6).toString("hex").toUpperCase();

// GET /api/wallet/balance/:userId
const getWalletBalance = async (req, res, next) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ status: false, message: "UserId is required!" });
        }
        let wallet = await Wallet.findOne({ userId });
        if (!wallet) {
            // Auto-create wallet with default balance
            wallet = await Wallet.create({ userId, balance: 500 });
        }
        return res.json({ status: true, message: "Wallet balance retrieved", balance: wallet.balance });
    } catch (error) {
        next(error);
    }
};

// POST /api/wallet/payment  — add funds
const addFunds = async (req, res, next) => {
    try {
        const { userId, amount } = req.body;
        if (!userId || !amount) {
            return res.status(400).json({ status: false, message: "UserId and amount are required!" });
        }
        if (amount <= 0) {
            return res.status(400).json({ status: false, message: "Amount must be greater than zero!" });
        }
        const updatedWallet = await Wallet.findOneAndUpdate(
            { userId },
            { $inc: { balance: amount } },
            { new: true, upsert: true }
        );

        const ref = generateRef();
        await Transaction.create({
            userId,
            reference: ref,
            type: "CREDIT",
            amount,
            description: "Funds added",
            balanceAfter: updatedWallet.balance,
        });

        return res.json({ status: true, message: "Funds added successfully", balance: updatedWallet.balance });
    } catch (error) {
        next(error);
    }
};

// POST /api/wallet/send  — transfer funds to another user
const sendFunds = async (req, res, next) => {
    try {
        const { fromUserId, toUserId, amount, description } = req.body;
        if (!fromUserId || !toUserId || !amount) {
            return res.status(400).json({ status: false, message: "fromUserId, toUserId, and amount are required!" });
        }
        if (amount <= 0) {
            return res.status(400).json({ status: false, message: "Amount must be greater than zero!" });
        }
        if (fromUserId === toUserId) {
            return res.status(400).json({ status: false, message: "Cannot send funds to yourself!" });
        }

        // Check sender balance
        const senderWallet = await Wallet.findOne({ userId: fromUserId });
        if (!senderWallet || senderWallet.balance < amount) {
            return res.status(400).json({ status: false, message: "Insufficient balance!" });
        }

        // Debit sender
        const updatedSender = await Wallet.findOneAndUpdate(
            { userId: fromUserId },
            { $inc: { balance: -amount } },
            { new: true }
        );

        // Credit receiver (auto-create if needed)
        const updatedReceiver = await Wallet.findOneAndUpdate(
            { userId: toUserId },
            { $inc: { balance: amount } },
            { new: true, upsert: true }
        );

        const ref = generateRef();
        const desc = description || "Fund transfer";

        // Record sender transaction
        await Transaction.create({
            userId: fromUserId,
            reference: ref + "-DEBIT",
            type: "DEBIT",
            amount: -amount,
            description: `Sent: ${desc}`,
            balanceAfter: updatedSender.balance,
        });

        // Record receiver transaction
        await Transaction.create({
            userId: toUserId,
            reference: ref + "-CREDIT",
            type: "CREDIT",
            amount,
            description: `Received: ${desc}`,
            balanceAfter: updatedReceiver.balance,
        });

        return res.json({
            status: true,
            message: "Transfer successful",
            balance: updatedSender.balance,
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/wallet/transactions/:userId  — transaction history
const getTransactionHistory = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 }).limit(50);
        return res.json({ status: true, data: transactions });
    } catch (error) {
        next(error);
    }
};

// GET /api/wallet/payments/:reference
const getPaymentByReference = async (req, res, next) => {
    try {
        const { reference } = req.params;
        const payment = await Payment.findOne({ reference });
        if (!payment) {
            return res.status(404).json({ status: false, message: "Payment not found" });
        }
        return res.json({ status: true, data: payment });
    } catch (error) {
        next(error);
    }
};

// GET /api/wallet/transaction/:reference
const getTransactionByReference = async (req, res, next) => {
    try {
        const { reference } = req.params;
        const transaction = await Transaction.findOne({ reference });
        if (!transaction) {
            return res.status(404).json({ status: false, message: "Transaction not found" });
        }
        return res.json({ status: true, data: transaction });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getWalletBalance,
    addFunds,
    sendFunds,
    getTransactionHistory,
    getPaymentByReference,
    getTransactionByReference,
};
