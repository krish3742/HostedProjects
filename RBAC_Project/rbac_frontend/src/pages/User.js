import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../redux/slice/AuthSlice";
import { logout } from "../redux/slice/AuthSlice";
import { post } from "../services/ApiEndpoint";
import { useNavigate } from "react-router-dom";

import Style from "./User.module.css";

function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const handleLogoutClick = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    await post("/auth/logout");
    dispatch(setLoading(false));
    dispatch(logout());
    navigate("/");
  };
  const handleAdminClick = (e) => {
    navigate("/admin");
  };
  return (
    <>
      <div className={Style.homeContainer}>
        <div className={Style.container}>
          <h2 className={Style.greet}>Welcome, {!!user && user.name}</h2>
          <button className={Style.logoutButton} onClick={handleLogoutClick}>
            Logout
          </button>
          {!!user && user.role === "Admin" && (
            <button className={Style.adminButton} onClick={handleAdminClick}>
              Go to Admin
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default User;
