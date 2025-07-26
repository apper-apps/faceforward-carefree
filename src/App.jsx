import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/organisms/Layout";
import HeadshotEditor from "@/components/pages/HeadshotEditor";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HeadshotEditor />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;