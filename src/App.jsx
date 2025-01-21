import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login_comp/Login";
import MainSection from "./components/Mainsection/Mainsection";
import NewFile from "./components/NewFile/NewFile";
import ReceviedFile from "./components/ReceivedFile/ReceivedFile";


const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new-file" element={<NewFile />} />
        <Route path="/received-file" element={<ReceviedFile/>} />

      </Routes>
    </Router>
  );
};

export default App;
