const express = require("express")
const router = express.Router()

router.get("/balance",(req,res,next)=>{
    res.json({
        status: true,
        message: "Wallet balance is running successfully!",
        balance: 500
    })
})

module.exports = router