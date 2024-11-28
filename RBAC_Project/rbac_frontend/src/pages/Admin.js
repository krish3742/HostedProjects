import { setLoading, logout } from "../redux/slice/AuthSlice";
import { get, post } from "../services/ApiEndpoint";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Style from "./Admin.module.css";

function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [refresh, setRefresh] = useState(false);
  const getUsers = async () => {
    try {
      const request = await get("/admin/getuser");
      const response = request.data;
      if (request.status === 200) {
        dispatch(setLoading(false));
        setUsers(response.data);
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(logout());
      toast.error("Unauthorized");
      navigate("/");
    }
  };
  const handleLogoutClick = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    await post("/auth/logout");
    dispatch(setLoading(false));
    dispatch(logout());
    navigate("/");
  };
  const handleUserClick = (e) => {
    navigate("/user");
  };
  const handleRoleChange = async (id, e) => {
    try {
      dispatch(setLoading(true));
      const request = await post("/admin/updateuser", {
        id,
        role: e.target.value,
      });
      if (request.status === 200) {
        toast.success("User updated");
        setRefresh(!refresh);
      }
    } catch (error) {
      dispatch(setLoading(false));
      if (error.status === 409) {
        toast.error("You can not modify yourself!");
      } else {
        dispatch(logout());
        toast.error("Unauthorized");
        navigate("/");
      }
    }
  };
  const handleDeleteClick = async (id, e) => {
    try {
      e.preventDefault();
      dispatch(setLoading(true));
      const request = await post(`/admin/deleteuser/${id}`);
      if (request.status === 200) {
        toast.success("User deleted");
        setRefresh(!refresh);
      }
    } catch (error) {
      dispatch(setLoading(false));
      if (error.status === 409) {
        toast.error("You can not delete yourself!");
      } else {
        dispatch(logout());
        toast.error("Unauthorized");
        navigate("/");
      }
    }
  };
  useEffect(() => {
    dispatch(setLoading(true));
    getUsers();
  }, [refresh]);
  return (
    <>
      <div className={Style.overflow}>
        <div className={Style.adminContainer}>
          <div className={Style.container}>
            <h2 className={Style.heading}>Manage user</h2>
            <table className={Style.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {!!users &&
                  users.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <select
                            name="role"
                            id="role"
                            className={Style.select}
                            value={user.role}
                            onChange={(e) => handleRoleChange(user._id, e)}
                          >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                          </select>
                        </td>
                        <td>
                          <button
                            className={Style.button}
                            onClick={(e) => handleDeleteClick(user._id, e)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className={Style.buttonContainer}>
              <button
                className={Style.logoutButton}
                onClick={handleLogoutClick}
              >
                Logout
              </button>
              <button className={Style.button} onClick={handleUserClick}>
                Go to User
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
