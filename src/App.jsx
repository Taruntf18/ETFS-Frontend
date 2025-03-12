import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import MainSection from "./components/Mainsection/Mainsection";
import NewFile from "./components/NewFile/NewFile";
import ReceivedFile from "./components/ReceivedFile/ReceivedFile";
import Status from "./components/Status/Status";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SelectDivision from "./components/SelectRole/SelectDivision";
import { useUser } from "./components/UserContext/UserContext";
import HodStaff from "./components/HodStaff/HodStaff";
import PrintFile from "./components/PrintFileComponent/PrintFile";
import ChangePassword from './components/ChangePassword/ChangePassword'

const App = () => {
  const { user } = useUser();
  const { currentUserRole } = useUser();
  const { division } = useUser();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/mainsection" element={<MainSection />} />
            <Route path="/new-file" element={<NewFile />} />
            <Route path="/received-file" element={currentUserRole == "Divisional Office" ? (<ReceivedFile />) : (<Navigate to='/mainsection' />)} />
            <Route path="/status" element={<Status />} />
            <Route path="/SelectDivision" element={<SelectDivision />} />
            <Route path="/hod" element={user.hod != null ? (<HodStaff />) : (<Navigate to='/mainsection' />)} />
            <Route path="/printFile" element={<PrintFile/>}/> 
            <Route path="/changePassword" element={<ChangePassword/>}/>
          </Route>
        </Routes>
      </Router>
      {/* <PrintFile/> */}
      {/* <HodStaff/> */}
    </>
  );
};

export default App;