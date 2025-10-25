const Document = require("../models/Document");
const { queryRelevantChunks } = require("../utils/vectorDB");
const { analyzeWithContext } = require("../utils/aiService");

exports.analyze = async (req, res) => {
  const { documentId, question } = req.body;
  const doc = await Document.findById(documentId);
  if (!doc) return res.status(404).json({ message: "Not found" });
  const context = (await queryRelevantChunks(doc.text, 3)).map(c => c.text);
  const result = await analyzeWithContext(question || "Analyze this contract.", context);
  doc.result = result;
  await doc.save();
  res.json({ result });
};
