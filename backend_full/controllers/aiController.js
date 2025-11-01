const { analyzeText } = require("../utils/aiService");
const Document = require("../models/Document");

exports.analyze = async (req, res) => {
  try {
    const { documentId, question } = req.body;
    console.log("📥 Incoming analyze request body:", req.body);

    if (!documentId) {
      return res.status(400).json({ message: "Missing documentId" });
    }

    const doc = await Document.findById(documentId);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    const userPrompt =
      question && question.trim() !== ""
        ? `User asked: "${question}". Use this document as context:\n\n${doc.text.slice(
            0,
            4000
          )}`
        : `Summarize this document clearly:\n\n${doc.text.slice(0, 4000)}`;

    const aiResponse = await analyzeText(userPrompt);
    console.log("🧾 Sending response to frontend:", aiResponse);

    // ✅ Make sure the response is returned properly
    return res.status(200).json({
      success: true,
      result: aiResponse,
    });
  } catch (err) {
    console.error("AI Controller Error:", err.message);
    return res
      .status(500)
      .json({ success: false, result: "AI analysis failed. Try again." });
  }
};
