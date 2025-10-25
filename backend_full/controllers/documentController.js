const pdf = require("pdf-parse");
const mammoth = require("mammoth");
const Document = require("../models/Document");
const { uploadBufferToS3 } = require("../utils/fileUpload");
const { addDocumentToVectorDB } = require("../utils/vectorDB");

// Upload document
exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file" });

    let text = "";

    // Extract text depending on file type
    if (req.file.mimetype === "application/pdf") {
      const pdfData = await pdf(req.file.buffer);
      text = pdfData.text;
    } else if (req.file.mimetype.includes("wordprocessingml.document")) {
      const result = await mammoth.extractRawText({ buffer: req.file.buffer });
      text = result.value;
    } else {
      text = req.file.buffer.toString("utf8");
    }

    // Upload file to S3 (optional)
    const url = await uploadBufferToS3(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    // Save document to DB
    const doc = await Document.create({
      user: req.user._id,
      name: req.file.originalname,
      text,
      url,
    });

    // Split into chunks (for vector embedding)
    const chunks = text.match(/.{1,1000}/g)?.map((t, i) => ({
      chunkId: i,
      text: t,
    })) || [];

    doc.chunks = chunks;
    await doc.save();

    // Add to vector DB
    await addDocumentToVectorDB(doc._id.toString(), chunks);

    res.status(201).json(doc);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Missing export added here
exports.getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    console.error("Get documents error:", err);
    res.status(500).json({ message: err.message });
  }
};

