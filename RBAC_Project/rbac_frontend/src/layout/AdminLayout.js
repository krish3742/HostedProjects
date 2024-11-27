import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function AdminLayout() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (!user || user.role !== "Admin") {
      navigate("/");
    }
  }, [user]);
  return <Outlet />;
}

export default AdminLayout;
