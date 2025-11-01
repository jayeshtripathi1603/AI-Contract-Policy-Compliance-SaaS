// backend_full/utils/fileUpload.js
const fs = require("fs");
const path = require("path");

exports.uploadBufferToS3 = async (buffer, originalname, mimetype) => {
  try {
    // Create uploads folder if it doesn't exist
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Save file locally
    const filename = `${Date.now()}_${originalname}`;
    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);

    // Return relative file URL
    return `/uploads/${filename}`;
  } catch (err) {
    console.error("Local upload failed:", err);
    throw err;
  }
};
