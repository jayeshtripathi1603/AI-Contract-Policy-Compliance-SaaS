const User = require("../models/User");
const Document = require("../models/Document");

exports.getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const docs = await Document.countDocuments();
    const proUsers = await User.countDocuments({ subscription: "Pro" });
    res.json({ users, proUsers, documents: docs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
