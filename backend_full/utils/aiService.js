const OpenAI = require("openai");
const { OPENAI_API_KEY } = require("../config");
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

exports.getEmbeddings = async text => {
  const resp = await openai.embeddings.create({ model: "text-embedding-3-small", input: text });
  return resp.data[0].embedding;
};

exports.analyzeWithContext = async (question, context) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a legal AI assistant analyzing contracts." },
      { role: "user", content: `Context: ${context.join("\n")} \nQuestion: ${question}` },
    ],
  });
  return response.choices[0].message.content;
};
