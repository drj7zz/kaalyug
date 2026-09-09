const express = require("express")
const { getWalletBalance, addFunds, getPaymentByReference, getTransactionByReference } = require("../controllers/walletController")
const router = express.Router()

// Quick health/check endpoint (no auth) — also keeps the route alive.
router.get("/ping", (req, res) => {
    res.json({
        status: true,
        message: "Wallet service is running!",
        balance: 500
    })
})

router.get("/balance/:userId", getWalletBalance)
router.post("/payment", addFunds)
router.get("/payments/:reference", getPaymentByReference)
router.get("/transactions/:reference", getTransactionByReference)

module.exports = router
