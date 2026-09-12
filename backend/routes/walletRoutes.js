const express = require("express");
const {
    getWalletBalance,
    addFunds,
    sendFunds,
    getTransactionHistory,
    getPaymentByReference,
    getTransactionByReference,
} = require("../controllers/walletController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Health check
router.get("/ping", (_req, res) => {
    res.json({ status: true, message: "Wallet service is running!" });
});

// Protected routes
router.get("/balance/:userId", protect, getWalletBalance);
router.post("/payment", protect, addFunds);
router.post("/send", protect, sendFunds);
router.get("/history/:userId", protect, getTransactionHistory);

// Reference lookups
router.get("/payments/:reference", protect, getPaymentByReference);
router.get("/transactions/:reference", protect, getTransactionByReference);

module.exports = router;
