import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Worktable from "./pages/worktable/worktable";
import Notfound from "./pages/_notfound/notfound";
import Sprint from "./pages/sprint/sprint";
import Admin from "./pages/admin/admin";
import Header from "./header/header";
import { DataProvider } from "./context";
import "./application.scss";

function App() {
  return (
    <DataProvider>
      <Header />
      <Routes>
        <Route path="/worktable" element={<Worktable />} />
        <Route path="/sprint" element={<Sprint />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </DataProvider>
  );
}

export default App;
