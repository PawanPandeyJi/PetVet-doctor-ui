import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import DoctorRegister from "./pages/DoctorRegister";
import DoctorProfile from "./pages/DoctorProfile";
import Appointments from "./pages/Appointments";
import { useEffect } from "react";
import { setupSocketConnection } from "./socket";
import { useLoginUserDataQuery } from "./store/api/auth-api";
import { socket } from "./socket";
import Prescription from "./pages/CreatePrescription";
import PrescriptionView from "./components/PrescriptioniewPage";
import Prescriptions from "./pages/Prescriptions";

function App() {
  const { data: loggedInUserData } = useLoginUserDataQuery();
  useEffect(() => {
    if (loggedInUserData) {
      socket.emit("USER", { userId: loggedInUserData.id });
      setupSocketConnection();
    }
  }, [loggedInUserData]);

  return (
    <>
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<DoctorProfile />} />
          <Route path="/register" element={<DoctorRegister />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/prescription/:appointmentId" element={<Prescription />} />
          <Route path="/prescriptions/:prescriptionId" element={<PrescriptionView />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/view" element={<PrescriptionView />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
