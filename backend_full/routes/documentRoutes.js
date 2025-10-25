const express = require("express");
const router = express.Router();
const multer = require("multer");
const protect = require("../middleware/authMiddleware");
const { uploadDocument, getDocuments } = require("../controllers/documentController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", protect, upload.single("file"), uploadDocument);
router.get("/", protect, getDocuments);

module.exports = router;
