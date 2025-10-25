const mongoose = require("mongoose");
const documentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  url: String,
  text: String,
  chunks: [{ chunkId: String, text: String }],
  result: String,
});
module.exports = mongoose.model("Document", documentSchema);
