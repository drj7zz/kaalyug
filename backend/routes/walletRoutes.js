const express = require("express")
const {getWalletBalance,addFunds,getPaymentByReference,getTransactionByReference} = require("../controllers/walletController")
const router = express.Router()

router.get("/balance/:userId",getWalletBalance)
router.post("/payment",addFunds)
router.get("/payments/:reference", getPaymentByReference);
router.get("/transactions/:reference", getTransactionByReference);
module.exports = router