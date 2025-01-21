import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/feature/auth/authSlice";

const Logout = () => {
  const disPatch = useDispatch();
  useEffect(() => {
    disPatch(logout());
    window.location.href = "/login";
  }, [disPatch]);
  return null;
};

export default Logout;
