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

export const analyzeDocument = (token, documentId, question) => {
  return axios.post(`${API}/ai/analyze`, { documentId, question }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createCheckoutSession = (token, priceId) => {
  return axios.post(`${API}/payment/create-checkout-session`, { priceId }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
