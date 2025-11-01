


const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");
const pdfParse = require("pdf-parse-fixed");
const Document = require("../models/Document");
const { analyzeText } = require("../utils/aiService");



exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // 1️⃣ Extract text from file
    let text = "";
    if (req.file.mimetype === "application/pdf") {
  console.log("📘 Extracting from PDF (using pdf-parse-fixed)");
  const pdfData = await pdfParse(req.file.buffer);
  text = pdfData.text;
}



else if (req.file.mimetype.includes("wordprocessingml.document")) {
      const result = await mammoth.extractRawText({ buffer: req.file.buffer });
      text = result.value;
    } else {
      text = req.file.buffer.toString("utf8");
    }

    // 2️⃣ Save file locally
    const uploadDir = path.join(__dirname, "..", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, req.file.originalname);
    fs.writeFileSync(filePath, req.file.buffer);

    // 3️⃣ Analyze text using Groq AI
    const aiResult = await analyzeText(text);

    // 4️⃣ Save document metadata to MongoDB
    const doc = await Document.create({
      user: req.user._id,
      name: req.file.originalname,
      url: `/uploads/${req.file.originalname}`, // accessible path
      text,
      aiResult,
    });

    res.status(201).json({
      message: "Document uploaded successfully",
      document: doc,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
}
exports.getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(docs);
  } catch (error) {
    console.error("Get Documents Error:", error);
    res.status(500).json({ message: "Failed to fetch documents", error: error.message });
  }
};
;
