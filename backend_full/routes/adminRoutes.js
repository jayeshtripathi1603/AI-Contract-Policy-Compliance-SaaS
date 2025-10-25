const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { getStats, listUsers } = require("../controllers/adminController");

router.get("/stats", protect, role("admin"), getStats);
router.get("/users", protect, role("admin"), listUsers);

module.exports = router;
