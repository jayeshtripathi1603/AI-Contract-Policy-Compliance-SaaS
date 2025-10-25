const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { createCheckoutSession, webhook } = require("../controllers/paymentController");

// Stripe requires raw body for webhook
router.post("/create-checkout-session", protect, createCheckoutSession);
router.post("/webhook", express.raw({ type: "application/json" }), webhook);

module.exports = router;
