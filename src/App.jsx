import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login_comp/Login";
import MainSection from "./components/Mainsection/Mainsection";
import NewFile from "./components/NewFile/NewFile";


const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<MainSection />} />
        <Route path="/new-file" element={<NewFile />} />

      </Routes>
    </Router>
  );
};

export default App;
