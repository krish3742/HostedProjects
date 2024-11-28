import { setLoading } from "../redux/slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { post } from "../services/ApiEndpoint";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Style from "./RegisterLogin.module.css";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [flag, setFlag] = useState(true);
  const initialValues = { name: "", email: "", password: "", role: "User" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrorsExist, setFormErrorsExist] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const validate = (values) => {
    let error = false;
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!regex.test(values.email)) {
      error = true;
      toast.error("Invalid email");
    }
    return error;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setFormErrorsExist(validate(formValues));
    setFlag(!flag);
  };
  const register = async () => {
    try {
      const user = await post("/auth/register", { ...formValues });
      if (user.status === 200) {
        dispatch(setLoading(false));
        toast.success("Registered successfully");
        navigate("/");
      }
    } catch (error) {
      dispatch(setLoading(false));
      if (error.status === 409) {
        toast.error("User already registered!");
      } else {
        toast.error("Internal server error!");
      }
    }
  };
  useEffect(() => {
    if (!formErrorsExist) {
      dispatch(setLoading(true));
      register();
    }
  }, [formErrorsExist, flag]);
  return (
    <>
      <div className={Style.loginRegisterContainer}>
        <div className={Style.container}>
          <div>
            <p className={Style.heading}>Register</p>
          </div>
          <form onSubmit={onSubmit} className={Style.form}>
            <div className={Style.inputContainer}>
              <label htmlFor="name" className={Style.labels}>
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formValues.name}
                onChange={handleChange}
                required
                className={Style.input}
              ></input>
            </div>
            <div className={Style.inputContainer}>
              <label htmlFor="email" className={Style.labels}>
                Email
              </label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
                required
                className={Style.input}
              ></input>
            </div>
            <div className={Style.inputContainer}>
              <label htmlFor="password" className={Style.labels}>
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
                required
                className={Style.input}
              ></input>
            </div>
            <div className={Style.inputContainer}>
              <label htmlFor="role" className={Style.labels}>
                Role:
              </label>
              <select
                name="role"
                id="role"
                className={Style.input}
                onChange={handleChange}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button type="submit" className={Style.button}>
              Register
            </button>
          </form>
          <p className={Style.linkmessage}>
            Already registered?{" "}
            <a href="/" className={Style.link}>
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
