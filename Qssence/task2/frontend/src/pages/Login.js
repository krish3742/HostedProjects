import { setLoading } from "../redux/slice/AuthSlice";
import { setToken } from "../redux/slice/AuthSlice";
import { post } from "../services/ApiEndpoint";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Style from "./RegisterLogin.module.css";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(true);
  const initialValues = { email: "", password: "" };
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
  const loginUser = async () => {
    try {
      const login = await post("/auth/login", { ...formValues });
      const response = login.data;
      if (login.status === 200) {
        dispatch(setLoading(false));
        dispatch(setToken(response.data.token));
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(setLoading(false));
      if (error.status === 404) {
        toast.error("Invalid credentials!");
      } else if (error.status === 401) {
        toast.error("User not registered!");
      } else {
        toast.error("Internal server error!");
      }
    }
  };
  useEffect(() => {
    if (!formErrorsExist) {
      dispatch(setLoading(true));
      loginUser();
    }
  }, [formErrorsExist, flag]);
  return (
    <>
      <div className={Style.loginRegisterContainer}>
        <div className={Style.container}>
          <div>
            <p className={Style.heading}>Login</p>
          </div>
          <form onSubmit={onSubmit} className={Style.form}>
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
            <button type="submit" className={Style.button}>
              Login
            </button>
          </form>
          <p className={Style.linkmessage}>
            Not registered?{" "}
            <a href="/register" className={Style.link}>
              Register here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
