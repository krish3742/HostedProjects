import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import User from "./pages/User";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Loader from "./components/Loader";
import UserLayout from "./layout/UserLayout";
import AdminLayout from "./layout/AdminLayout";
import PublicLayout from "./layout/PublicLayout";

function App() {
  const loading = useSelector((state) => state.auth.loading);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<User />}></Route>
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />}></Route>
        </Route>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
      {loading && <Loader />}
    </BrowserRouter>
  );
}

export default App;
