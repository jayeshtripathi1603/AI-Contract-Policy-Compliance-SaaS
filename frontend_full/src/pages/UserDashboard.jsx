import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { uploadDocument, getDocuments, analyzeDocument, createCheckoutSession } from "../api/apiCalls";

export default function UserDashboard() {
  const { user } = useContext(AuthContext);
  const [docs, setDocs] = useState([]);
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    if (!user) return;
    (async () => {
      const res = await getDocuments(user.token);
      setDocs(res.data);
    })();
  }, [user]);

  const upload = async () => {
    if (!file) return alert("Choose a file");
    await uploadDocument(user.token, file);
    const res = await getDocuments(user.token);
    setDocs(res.data);
  };

  const analyze = async (id) => {
    const res = await analyzeDocument(user.token, id, question);
    setDocs(prev => prev.map(d => d._id === id ? { ...d, result: res.data.result } : d));
  };

  const upgrade = async () => {
    const priceId = prompt("Enter Stripe Price ID (e.g. price_xxx)");
    const res = await createCheckoutSession(user.token, priceId);
    window.location.href = res.data.url;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex gap-3 mb-4">
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button onClick={upload} className="bg-blue-600 text-white px-3 py-1 rounded">Upload</button>
        <button onClick={upgrade} className="bg-yellow-400 text-black px-3 py-1 rounded">Upgrade</button>
      </div>
      <textarea className="w-full p-2 border mb-4" placeholder="Optional AI question..." value={question} onChange={e => setQuestion(e.target.value)} />
      {docs.map(doc => (
        <div key={doc._id} className="border p-3 rounded mb-4">
          <h3 className="font-semibold">{doc.name}</h3>
          <button onClick={() => analyze(doc._id)} className="bg-indigo-600 text-white px-2 py-1 rounded mt-2">Analyze</button>
          {doc.result && <pre className="bg-gray-100 p-2 mt-3 text-sm whitespace-pre-wrap">{doc.result}</pre>}
        </div>
      ))}
    </div>
  );
}
