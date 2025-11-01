import axios from "axios";
const API = "http://localhost:5000/api";

export const uploadDocument = (token, file) => {
  const fd = new FormData();
  fd.append("file", file);
  return axios.post(`${API}/documents/upload`, fd, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getDocuments = (token) => {
  return axios.get(`${API}/documents`, { headers: { Authorization: `Bearer ${token}` } });
};

export const analyzeDocument = async (token, documentId, question) => {
  const response = await axios.post(
    "http://localhost:5000/api/ai/analyze",
    { documentId, question },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};


export const createCheckoutSession = (token, priceId) => {
  return axios.post(`${API}/payment/create-checkout-session`, { priceId }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
