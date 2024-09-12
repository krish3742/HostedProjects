import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from './Navbar';

import 'react-toastify/dist/ReactToastify.css';
import Style from './Account.module.css';

function ChangeName() {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [flag, setFlag] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const token = location?.state?.token;
    const notify = (message) => toast.error(message);
    const headers = {'Authorization': `Bearer ${token}`};
    function handleNameChange(evt) {
        setName(evt.target.value);
    }
    function handleNameSubmitClick(evt) {
        evt.preventDefault();
        setIsLoading(true);
        if(!name) {
            notify('Please enter name!');
            setIsLoading(false);
        } else {
            setFlag(true);
        }
    }
    function handleDeactivateAccountClick(evt) {
        evt.preventDefault();
        setIsLoading(true);
        axios
            .patch(`${process.env.REACT_APP_BACKEND_URL}/user/deactivate`, {}, { headers })
            .then((response) => {
                setIsLoading(false);
                navigate('/auth/user/deactivateaccount', { state: { token }})
            })
            .catch((error) => {
                setIsLoading(false);
                const message = error?.response?.data?.message;
                if(message.includes("Resend OTP after")) {
                    const minute = message.charAt(17);
                    if(minute == 0) {
                        notify('Try again after 1 minute');
                    } else {
                        notify(`Try again after ${minute} minutes`);
                    }
                } else {
                    navigate('/auth/login');
                }
            })
    }
    function handleChangePasswordClick(evt) {
        navigate('/auth/user/change-password', { state: { token }});
    }
    useEffect(() => {
        if(!!token) {
            axios
                .get(`${process.env.REACT_APP_BACKEND_URL}/user`, { headers })
                .then((response) => {
                    setIsLoading(false);
                    const data = response.data.data;
                    setEmail(data.email);
                })
                .catch((error) => {
                    setIsLoading(false);
                    navigate('/auth/register');
                })
        }
        if(flag) {
            axios
                .put(`${process.env.REACT_APP_BACKEND_URL}/user`, { name }, { headers })
                .then((response) => {
                    setIsLoading(false);
                    navigate('/auth/user/my-account', { state: { token }})
                })
                .catch((error) => {
                    setIsLoading(false);
                    navigate('/auth/login')
                })
        }
    }, [flag]);
    if(!token) {
        return <Navigate to='/auth/login' />
    }
    return (
        <>
            <Navbar headers={headers} token={token} />
            <div className="heroContainer">
                <h2 className="pageTitle">Login and Security</h2>
                <div className={Style.container}> 
                    <div className={Style.buttonContainerDiv}>
                        <div>
                            <h4 className="heroTitle">Name</h4>
                            <label htmlFor='Name'></label>
                            <input type='text' placeholder='Enter name' value={name} onChange={handleNameChange} className={Style.input}></input>
                        </div>
                        <button className={Style.button} onClick={handleNameSubmitClick}>Submit</button>
                    </div>
                    <div className={Style.line}></div>
                    <div className="heroContainerContent">
                        <div>
                            <h4 className="heroTitle">Email</h4>
                            <p className={Style.para}>{email}</p>
                        </div>
                    </div>
                    <div className={Style.line}></div>
                    <div className={Style.buttonContainerDiv}>
                        <div>
                            <h4 className="heroTitle">Password</h4>
                            <p className={Style.para}>**********</p>
                        </div>
                        <button className={Style.button} onClick={handleChangePasswordClick}>Edit</button>
                    </div>
                    <div className={Style.line}></div>
                    <div className={Style.deactivateAccountDiv}>
                        <button className={Style.deactivateAccountButton} onClick={handleDeactivateAccountClick}>Deactivate account!</button>
                    </div>   
                </div>
            </div>
            <ToastContainer />
            {isLoading && 
                <div className="loading">
                    <div className="loader"></div>
                </div>
            }
        </>
    );
};

export default ChangeName;