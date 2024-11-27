import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function UserLayout() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  return <Outlet />;
}

export default UserLayout;
