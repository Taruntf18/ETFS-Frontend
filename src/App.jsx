import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login_comp/Login";
import MainSection from "./components/Mainsection/Mainsection";
import NewFile from "./components/NewFile/NewFile";
import ReceivedFile from "./components/ReceivedFile/ReceivedFile";
import Status from "./components/Status/Status";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useUser } from "./components/UserContext/UserContext";
const App = () => {
  const { currentUserRole } = useUser();
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/mainsection" element={<MainSection />} />
          <Route path="/new-file" element={<NewFile />} />
          <Route path="/received-file" element={currentUserRole == "Divisional Office" ? (<ReceivedFile />) : (<Navigate to='/mainsection' />)} />
          <Route path="/status" element={<Status />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;