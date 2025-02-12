import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function DashboardLayout() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);
  return <Outlet />;
}

export default DashboardLayout;
