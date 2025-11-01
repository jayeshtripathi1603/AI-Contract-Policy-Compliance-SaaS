const axios = require("axios");
const GROQ_API_KEY = process.env.GROQ_API_KEY;

exports.analyzeText = async (text) => {
  try {
    console.log("🤖 Sending text to Groq AI...");
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant that summarizes and analyzes documents.",
          },
          { role: "user", content: text },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiText =
      response.data?.choices?.[0]?.message?.content?.trim() ||
      "No AI response received from Groq.";

    console.log("✅ Groq AI response received");
    console.log("🧠 AI Output:", aiText);
    return aiText;
  } catch (error) {
    console.error("Groq AI Error:", error.response?.data || error.message);
    throw new Error("Groq AI request failed");
  }
};
