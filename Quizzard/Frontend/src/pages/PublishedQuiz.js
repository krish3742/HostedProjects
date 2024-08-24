import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Style from './PublishedQuiz.module.css';

function PublishedQuiz() {
    const location = useLocation();
    const navigate = useNavigate(); 
    const [quizId, setQuizId] = useState();
    const [quizExam, setQuizExam] = useState([]);
    const [quizTest, setQuizTest] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAttempt, setIsAttempt] = useState(false);
    const [isMyQuizOpen, setIsMyQuizOpen] = useState(false);
    const [isQuizzesOpen, setIsQuizzesOpen] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isFavouriteQuestionOpen, setIsFavouriteQuestionOpen] = useState(false);
    const token = location?.state?.token;
    const [isMessage, setIsAMessage] =  useState(location?.state?.message);
    const headers = {'Authorization': `Bearer ${token}`};
    function handleLogoutClick(evt) {
        evt.preventDefault();
        setIsLoading(true);
        axios
            .post(`http://${process.env.REACT_APP_BACKEND_URL}/user/logout`, {}, { headers })
            .then(() => {
                setIsLoading(false);
                navigate('/auth/login');
            })
            .catch(() => {
                setIsLoading(false);
                navigate('/auth/register');
            })
    }
    function handleMyAccountClick(evt) {
        evt.preventDefault();
        navigate('/auth/user/my-account', { state: { token }});
    }
    function handleQuizAppClick(evt) {
        evt.preventDefault();
        navigate('/auth/quiz', { state: { token }});
    }
    function handleMyQuizClick(evt) {
        evt.preventDefault();
        navigate('/auth/quiz/myquiz', { state: { token }});
    }
    function handleFavouriteQuestionClick(evt) {
        evt.preventDefault();
        navigate('/auth/user/fav-ques', { state: { token }});
    }
    function handleQuizzesClick(evt) {
        evt.preventDefault();
        navigate('/auth/published-quiz', { state: { token }});
    }
    function handleAttemptClick(evt) {
        evt.preventDefault();
        navigate(`/auth/exam/${quizId}`, { state: { token }});
    }
    useEffect(() => {
        axios
            .get(`http://${process.env.REACT_APP_BACKEND_URL}/quiz/allpublishedquiz/exam`, { headers })
            .then((response) => {
                setIsLoading(false);
                setQuizExam(response?.data?.data);
            })
            .catch((error) => {
                setIsLoading(false);
                navigate('/auth/login');
            })
        axios
            .get(`http://${process.env.REACT_APP_BACKEND_URL}/quiz/allpublishedquiz/test`, { headers })
            .then((response) => {
                setIsLoading(false);
                setQuizTest(response?.data?.data);
            })
            .catch(() => {
                setIsLoading(false);
                navigate('/auth/login');
            })
    }, []);
    if(!token) {
        return <Navigate to='/auth/login' />
    }
    return (
        <>
            <div className={Style.container}>
                <h2 className={Style.title} onClick={handleQuizAppClick}>Quizzard</h2>
                <div className={Style.menuDiv}>
                    <h4 className={Style.menu} onClick={handleQuizzesClick}>Quizzes</h4>
                    {isQuizzesOpen &&
                        <div className={Style.quizzesDiv}></div>
                    }
                    <h4 className={Style.menu} onMouseEnter={() => {setIsFavouriteQuestionOpen(true)}} onMouseLeave={() => {setIsFavouriteQuestionOpen(false)}} onClick={handleFavouriteQuestionClick}>Favorite Questions</h4>
                    {isFavouriteQuestionOpen &&
                        <div className={Style.favouriteQuestionsDiv}></div>
                    }
                    <h4 className={Style.menu} onMouseEnter={() => {setIsMyQuizOpen(true)}} onMouseLeave={() => {setIsMyQuizOpen(false)}} onClick={handleMyQuizClick}>My Quiz</h4>
                    {isMyQuizOpen &&
                        <div className={Style.myQuizDiv}></div>
                    }
                </div>
                <div className={Style.profile} onMouseEnter={() => {setIsProfileOpen(true)}} onMouseLeave={() => {setIsProfileOpen(false)}}></div>
                    {isProfileOpen &&
                        <div className={Style.myAccountDiv} onMouseEnter={() => setIsProfileOpen(true)} onMouseLeave={() => {setIsProfileOpen(false)}}>
                            <p onClick={handleMyAccountClick} className={Style.options}>My Account</p>
                            <p onClick={handleLogoutClick} className={Style.options}> Logout</p>
                        </div>
                    }
            </div>
            <div className={Style.linear}>
                <h2 className={Style.headingExam}>Exam</h2>
                {!!quizExam && quizExam.length !== 0 &&
                    quizExam.map((list) => {
                        return (
                            <div className={Style.accountDiv} key={list._id}> 
                                <div className={Style.titleDiv}>
                                    <div>
                                        <h4 className={Style.title}>{list.name}</h4>
                                    </div>
                                    <div className={Style.buttonDiv}>
                                        <button className={Style.editButton} onClick={() => {setIsAttempt(true); setQuizId(list._id)}}>Attempt</button>
                                    </div>
                                </div>
                                
                            </div>
                        )
                    })
                }
                {!!quizExam && quizExam.length === 0 &&
                    <div className={Style.accountDiv}> 
                        <div className={Style.titleDiv}>
                            <div>
                                <h4 className={Style.title}>No quiz found!</h4>
                            </div>
                        </div>
                    </div>
                }
                <h2 className={Style.headingTest}>Test</h2>
                {!!quizTest && quizTest.length !== 0 &&
                    quizTest.map((list) => {
                        return (
                            <div className={Style.accountDiv} key={list._id}> 
                                <div className={Style.titleDiv}>
                                    <div>
                                        <h4 className={Style.title}>{list.name}</h4>
                                    </div>
                                    <div className={Style.buttonDiv}>
                                        <button className={Style.editButton} onClick={() => {setIsAttempt(true); setQuizId(list._id)}}>Attempt</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {!!quizTest && quizTest.length === 0 &&
                    <div className={Style.accountDiv}> 
                        <div className={Style.titleDiv}>
                            <div>
                                <h4 className={Style.title}>No quiz found!</h4>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {isAttempt && 
                <div className={Style.loading}>
                    <div className={Style.isAttemptDiv}>
                        <label>Are you sure?</label>
                        <div className={Style.isAttemptButtonDiv}>
                            <button className={Style.isAttemptButton} onClick={(e) => handleAttemptClick(e)}>Attempt</button>
                            <button className={Style.isAttemptButton} onClick={(e) => setIsAttempt(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            }
            {!!isMessage && 
                <div className={Style.loading}>
                    <div className={Style.isAttemptDiv}>
                        <label className={Style.label}>You have zero attempts left!</label>
                        <div className={Style.isAttemptButtonDiv}>
                            <button className={Style.isAttemptButton} onClick={(e) => setIsAMessage(false)}>Okay</button>
                        </div>
                    </div>
                </div>
            }
            {isLoading && 
                <div className={Style.loading}>
                    <div className={Style.loader}></div>
                </div>
            }
        </>
    )
}

export default PublishedQuiz;