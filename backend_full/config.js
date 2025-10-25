require("dotenv").config();
module.exports = {
  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ai-contract-saas",
  JWT_SECRET: process.env.JWT_SECRET || "changeme",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  CHROMA_URL: process.env.CHROMA_URL,
  PORT: process.env.PORT || 5000,
};
