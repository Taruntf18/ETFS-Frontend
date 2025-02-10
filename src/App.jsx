import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login_comp/Login";
import MainSection from "./components/Mainsection/Mainsection";
import NewFile from "./components/NewFile/NewFile";
import Status from "./components/Status/Status";
import ReceivedFile from "./components/ReceivedFile/ReceivedFile";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/mainsection" element={<MainSection />} />
        <Route path="/" element={<Login />} />
        <Route path="/new-file" element={<NewFile />} />
        <Route path="/status" element={<Status/>} />
        <Route path="/received-file" element={<ReceivedFile />} />

      </Routes>
    </Router>
  );
};

export default App;
