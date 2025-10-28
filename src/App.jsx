import React from "react";
import ExpertSystemCFUI from "./ExpertSystemCFUI";

export default function App() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* ===== Konten Utama ===== */}
      <main className="flex-grow">
        <ExpertSystemCFUI />
      </main>
    </div>
  );
}
