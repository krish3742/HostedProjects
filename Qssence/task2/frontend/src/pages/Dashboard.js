import { useState, useEffect } from "react";

import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { delet, get, post, put } from "../services/ApiEndpoint";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { setLoading, logout } from "../redux/slice/AuthSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [editingBranch, setEditingBranch] = useState(null);
  const [newBranch, setNewBranch] = useState({
    name: "",
    location: "",
    logo: null,
  });
  const fetchBranch = async () => {
    dispatch(setLoading(true));
    try {
      const response = await get("/api/getAllBranches");
      setData(response.data.data);
      dispatch(setLoading(false));
    } catch (error) {
      toast.error("Internal server error, Try again!");
      handleLogoutClick();
    }
  };

  const handleAddBranch = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      formData.append("name", newBranch.name);
      formData.append("location", newBranch.location);
      formData.append("logo", newBranch.logo);
      if (editingBranch) {
        await put(`/api/updateBranch/${editingBranch._id}`, formData);
        setEditingBranch(null);
      } else {
        await post("/api/createBranch", formData);
      }
      setNewBranch({ name: "", location: "", logo: null });
      fetchBranch();
    } catch (error) {
      dispatch(setLoading(false));
      if (error.status === 403) {
        toast.error("You are not authorized!");
        dispatch(setLoading(false));
      } else if (
        error.status === 404 &&
        error.response.data.message === "Branch not found"
      ) {
        toast.error("Branch not found!");
        dispatch(setLoading(false));
      } else if (
        error.status === 404 &&
        error.response.data.message === "All fields required"
      ) {
        toast.error("All fields are required!");
        dispatch(setLoading(false));
      } else {
        toast.error("Internal server error!");
        handleLogoutClick();
      }
    }
  };

  const handleDeleteBranch = async (id) => {
    dispatch(setLoading(true));
    try {
      await delet(`/api/deleteBranch/${id}`);
      fetchBranch();
    } catch (error) {
      if (error.status === 403) {
        toast.error("You are not authorized!");
        dispatch(setLoading(false));
      } else if (error.status === 404) {
        toast.error("Branch not found!");
        dispatch(setLoading(false));
      } else {
        toast.error("Internal server error, Try again!");
        handleLogoutClick();
      }
    }
  };

  const handleEditBranch = (branch) => {
    setNewBranch({
      name: branch.name,
      location: branch.location,
      logo: branch.logo,
    });
    setEditingBranch(branch);
  };

  const handleLogoutClick = async (e) => {
    dispatch(logout());
    dispatch(setLoading(false));
    navigate("/");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size should not exceed 2MB.");
      return;
    }
    const fileType = file.type;
    if (fileType === "image/png" || fileType === "image/jpeg") {
      setNewBranch({ ...newBranch, logo: file });
    } else {
      toast.error("Only PNG and JPG files are allowed!");
    }
  };

  useEffect(() => {
    fetchBranch();
  }, []);

  return (
    <div className="dashboard">
      <main className="main-content">
        <div className="heading-button">
          <h1>Branch Manager</h1>
          <button className="logout-button" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
        <h2>{editingBranch ? "Edit Branch" : "Add Branch"}</h2>
        <form onSubmit={handleAddBranch} className="branch-form">
          <input
            type="text"
            placeholder="Branch Name"
            value={newBranch.name}
            onChange={(e) =>
              setNewBranch({ ...newBranch, name: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Branch Location"
            value={newBranch.location}
            onChange={(e) =>
              setNewBranch({ ...newBranch, location: e.target.value })
            }
            required
          ></input>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
          <button type="submit">
            {editingBranch ? "Update Branch" : "Add Branch"}
          </button>
        </form>
        <h2>Branch List</h2>
        <table className="branch-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Logo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((branch) => (
              <tr key={branch._id}>
                <td>{branch.name}</td>
                <td>{branch.location}</td>
                <td>
                  {branch.logo ? (
                    <img
                      src={branch.logo}
                      alt={branch.name}
                      className="image"
                    />
                  ) : (
                    "No Logo"
                  )}
                </td>
                <td className="button-container">
                  <button onClick={() => handleEditBranch(branch)}>Edit</button>
                  <button onClick={() => handleDeleteBranch(branch._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Dashboard;
