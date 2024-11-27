import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function PublicLayout() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (user) {
      if (user.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    }
  }, [user, navigate]);
  return <Outlet />;
}

export default PublicLayout;
