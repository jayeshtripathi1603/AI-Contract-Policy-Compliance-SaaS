const mongoose = require("mongoose");

const embeddingSchema = new mongoose.Schema(
  {
    documentId: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
    chunkId: String,
    text: String,
    embedding: { type: [Number], default: [] },
    metadata: { type: Object, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Embedding", embeddingSchema);
