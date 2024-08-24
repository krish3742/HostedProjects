import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Style from './Login.module.css';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [flag, setFlag] = useState(true);
    const [color, setColor] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(["testing"]);
    const [message, setMessage] = useState(location?.state?.message);
    function handleEmailChange(evt) { 
        setEmail(evt.target.value);
    }
    function handlePasswordChange(evt) { 
        setPassword(evt.target.value);
    }
    function handleLoginClick(evt) {
        evt.preventDefault();
        setMessage("");
        setErrors([]);
        setIsLoading(true);
        if(!email) {
            setErrors((oldArray) => {
                if(oldArray.includes("Please enter email")) {
                    return [...oldArray];
                }
                return [...oldArray, "Please enter email"]
            });
        }
        if(!password) {
            setErrors((oldArray) => { 
                if(oldArray.includes("Please enter password")) {
                    return [...oldArray];
                }
                return [...oldArray, "Please enter password"]
            })
        }
        setFlag(!flag);
        setColor("");
    }
    function handleForgotPasswordClick(evt) {
        evt.preventDefault();
        setMessage("");
        setIsLoading(true);
        if(!email) {
            setIsLoading(false);
            setErrors(["Please enter email"]);
        } else {
            axios
                .post(`http://${process.env.REACT_APP_BACKEND_URL}/auth/forgotpassword`, {email})
                .then((response) => {
                    setIsLoading(false);
                    setErrors(["An email has been sent on your account, verify"]);
                    setColor("black");
                })
                .catch((error) => {
                    const message = errors?.response?.data?.message;
                    setIsLoading(false);
                    if(error.response.status === 500) {
                        setErrors(["Try again after some time"])
                    }
                    if(message.includes("No user exist")) {
                        setErrors(["Account not registered, please register"])
                    }
                })
        }
    }
    useEffect(() => {
        if(errors.length === 0) {
            axios
                .post(`http://${process.env.REACT_APP_BACKEND_URL}/auth/login`, { email, password })
                .then((response) => {
                    setIsLoading(false);
                    const token = response?.data?.data?.token;
                    navigate('/auth/quiz', { state: { token }});
                })
                .catch((error) => {
                    const message = error?.response?.data?.message;
                    setIsLoading(false);
                    if(error.response.status === 500) {
                        setErrors(["Try again after some time"])
                    }
                    if(message.includes("Validation failed!")) {
                        setErrors((oldArray) => {
                            if(oldArray.includes("Invalid email or password")) {
                                return [...oldArray];
                            }
                            return [...oldArray, "Invalid email or password"]
                        });
                    }
                    if(message.includes("No user exist")) {
                        setErrors((oldArray) => {
                            if(oldArray.includes("Account not registered, please register")) {
                                return [...oldArray];
                            }
                            return [...oldArray, "Account not registered, please register"]
                        });
                    }
                    if(message.includes("Credential mismatch")) {
                        const subMessage = message.charAt(29);
                        setErrors((oldArray) => {
                            if(oldArray.includes(`Incorrect password, remaining try ${subMessage}`)) {
                                return [...oldArray];
                            }
                            return [...oldArray, `Incorrect password, remaining try ${subMessage}`];
                        });
                    }
                    if(message.includes("Your Account has been deactivated check your registered email for further instructions")) {
                        setErrors((oldArray) => {
                            if(oldArray.includes(`Your Account has been deactivated check your registered email for further instructions!`)) {
                                return [...oldArray];
                            }
                            return [...oldArray, `Your Account has been deactivated check your registered email for further instructions!`];
                        });
                    }
                    if(message.includes("Your account have been blocked due to multiple attempts for 24 hours")) {
                        setErrors((oldArray) => {
                            if(oldArray.includes(`Your account have been blocked due to multiple attempts for 24 hours`)) {
                                return [...oldArray];
                            }
                            return [...oldArray, `Your account have been blocked due to multiple attempts for 24 hours`];
                        });
                    }
                    if(message.includes("Your account is deactivated")) {
                        setErrors((oldArray) => {
                            if(oldArray.includes(`Account deactivated`)) {
                                return [...oldArray];
                            }
                            return [...oldArray, `Account deactivated`];
                        });
                    }
                    if(message.includes("Your account have been blocked due to multiple attempts!")) {
                        setErrors((oldArray) => {
                            if(oldArray.includes(message)) {
                                return [...oldArray];
                            }
                            return [...oldArray, message];
                        });
                    }
                    if(message.includes("Account is not Verified. Please verify your account")) {
                        setErrors((oldArray) => {
                            if(oldArray.includes("Account is not Verified. Please verify your account")) {
                                return [...oldArray];
                            }
                            return [...oldArray, "Account is not Verified. Please verify your account"];
                        });
                    }
                    if(message.includes("Account is deactivated!")) {
                        setErrors((oldArray) => {
                            if(oldArray.includes("Account is deactivated!")) {
                                return [...oldArray];
                            }
                            return [...oldArray, "Account is deactivated!"];
                        });
                    }
                })
        } else {
            setIsLoading(false);
        }
    }, [flag])
    return (
        <>
            <div className={Style.container}>
                <h2 className={Style.title}>Quizzard</h2>
                <button className={Style.RegisterButton}><Link to='/auth/register' className={Style.link}>Register</Link></button>
            </div>
            <div className={Style.linear}>
                <div className={Style.body}>
                    <h2 className={Style.heading}>Login yourself!</h2>
                    <div>
                        <label htmlFor='Email'></label>
                        <input type='text' id='Email' value={email} onChange={handleEmailChange} className={Style.input} placeholder='Email ID'></input>
                    </div>
                    <div>
                        <label htmlFor='Password'></label>
                        <input type='password' id='Password' value={password} onChange={handlePasswordChange} className={Style.input} placeholder='Password'></input>
                    </div>
                    <div className={Style.paraDiv}>
                        <p className={Style.para} onClick={handleForgotPasswordClick}>Forgot password?</p>
                    </div>
                    {errors.length > 0 && !errors.includes("testing") &&
                        <div className={Style.instructionParaDiv}>
                            <ul>
                                {errors.map(message =>  {
                                    return <li className={!!color ? Style.black : Style.red} key={message}>{message}</li>
                                })}
                            </ul>
                        </div>
                    }
                    {!!message &&
                        <div className={Style.instructionParaDiv}>
                            <ul>
                                <li className={Style.black}>{message}</li>
                            </ul>
                        </div>
                    }
                    <button type='submit' onClick={handleLoginClick} className={Style.LoginButton}>Login</button>
                </div>
                <div className={Style.imgDiv}>
                    <div className={Style.img}></div>
                </div>
            </div>
            {isLoading && 
                <div className={Style.loading}>
                    <div className={Style.loader}></div>
                </div>
            }
        </>
    )
};

export default Login;