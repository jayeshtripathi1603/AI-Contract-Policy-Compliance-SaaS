const { getEmbeddings } = require("./aiService");
exports.addDocumentToVectorDB = async (docId, chunks) => {
  console.log("Vector store mock for", docId);
};
exports.queryRelevantChunks = async (text, k) => [{ text }];
