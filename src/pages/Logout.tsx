import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/feature/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const disPatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    disPatch(logout());
    navigate("/login");
  }, [navigate, disPatch]);
  return null;
};

export default Logout;
