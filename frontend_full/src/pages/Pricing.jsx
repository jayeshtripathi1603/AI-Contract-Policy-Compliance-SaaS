import React from "react";

export default function Pricing() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold">Free</h2>
          <p>Basic contract uploads and limited AI analysis</p>
        </div>
        <div className="p-4 border rounded bg-yellow-100">
          <h2 className="text-xl font-bold">Pro</h2>
          <p>Unlimited analysis, priority AI, export features</p>
        </div>
      </div>
    </div>
  );
}
