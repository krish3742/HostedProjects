import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Style from './MyQuiz.module.css';

function MyQuiz() {
    const location = useLocation();
    const navigate = useNavigate();
    const [flag, setFlag] = useState(true);
    const [quizId, setQuizId] = useState();
    const [viewQuizId, setViewQuizId] = useState();
    const [myQuizList, setMyQuizList] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [isMyQuizOpen, setIsMyQuizOpen] = useState(true);
    const [isQuizzesOpen, setIsQuizzesOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isFavouriteQuestionOpen, setIsFavouriteQuestionOpen] = useState(false);
    const token = location?.state?.token;
    const headers = {'Authorization': `Bearer ${token}`};
    function handleLogoutClick(evt) {
        setIsLoading(true);
        axios
            .post(`http://${process.env.REACT_APP_BACKEND_URL}/user/logout`, {}, { headers })
            .then((response) => {
                setIsLoading(false);
                navigate('/auth/login');
            })
            .catch((error) => {
                setIsLoading(false);
                navigate('/auth/register');
            })
    }
    function handleMyAccountClick(evt) {
        navigate('/auth/user/my-account', { state: { token }});
    }
    function handleQuizAppClick(evt) {
        evt.preventDefault();
        navigate('/auth/quiz', { state: { token }});
    }
    function handleEditButtonClick(id, e) {
        e.preventDefault();
        setQuizId(id);
        setIsLoading(true);
        setFlag(!flag);
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
    function handleDeleteQuizClick(id, e) {
        e.preventDefault();
        setIsLoading(true);
        axios
            .delete(`http://${process.env.REACT_APP_BACKEND_URL}/quiz/${id}`, { headers })
            .then(() => {
                setFlag(!flag);
            })
            .catch(() => {
                setIsLoading(false);
                setFlag(!flag);
                navigate('/auth/login');
            })
    }
    function handleViewQuizClick(id, e) {
        e.preventDefault();
        setViewQuizId(id);
        setIsLoading(true);
        setFlag(!flag);
    }
    useEffect(() => {
        if(!!quizId) {
            axios
                .get(`http://${process.env.REACT_APP_BACKEND_URL}/quiz/${quizId}`, { headers })
                .then((response) => {
                    setIsLoading(false);
                    navigate('/auth/quiz/update', { state: { token, quizId }});
                })
                .catch((error) => {
                    setIsLoading(false);
                    navigate('/auth/login');
                })
        }
        if(!!viewQuizId) {
            navigate('/auth/quiz/view', { state: { token, viewQuizId}});
        }
        axios
            .get(`http://${process.env.REACT_APP_BACKEND_URL}/quiz`, { headers })
            .then((response) => {
                setIsLoading(false);
                setMyQuizList(response?.data?.data);
            })
            .catch((error) => {
                setIsLoading(false);
                const message = error?.response?.data?.message;
                if(message.includes('Quiz not found!')) {
                    setMyQuizList(["No quiz found"]);
                }
            })
    }, [quizId, flag]);
    if(!token) {
        return <Navigate to='/auth/login' />
    }
    return (
        <>
            <div className={Style.container}>
                <h2 className={Style.title} onClick={handleQuizAppClick}>Quiz App</h2>
                <div className={Style.menuDiv}>
                    <h4 className={Style.menu} onMouseEnter={() => {setIsQuizzesOpen(true)}} onMouseLeave={() => {setIsQuizzesOpen(false)}} onClick={handleQuizzesClick}>Quizzes</h4>
                    {isQuizzesOpen &&
                        <div className={Style.quizzesDiv}></div>
                    }
                    <h4 className={Style.menu} onMouseEnter={() => {setIsFavouriteQuestionOpen(true)}} onMouseLeave={() => {setIsFavouriteQuestionOpen(false)}} onClick={handleFavouriteQuestionClick}>Favorite Questions</h4>
                    {isFavouriteQuestionOpen &&
                        <div className={Style.favouriteQuestionsDiv}></div>
                    }
                    <h4 className={Style.menu} onClick={handleMyQuizClick}>My Quiz</h4>
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
                <h2 className={Style.heading}>My Quiz</h2>
                    {!!myQuizList && myQuizList.length != 0 &&
                        myQuizList.map((list) => {
                            return (
                                <div className={Style.accountDiv} key={list._id}> 
                                    <div className={Style.titleDiv}>
                                        <div>
                                            <h4 className={Style.title}>{list.name}</h4>
                                        </div>
                                        <div className={Style.buttonDiv}>
                                            <button className={Style.editButton} onClick={(e) => handleViewQuizClick(list._id, e)}>View</button>
                                            {list?.isPublished ? 
                                                <button className={Style.editButtonDisabled} disabled>Edit</button> :
                                                <button className={Style.editButton} onClick={(e) => handleEditButtonClick(list._id, e)}>Edit</button>
                                            }
                                            {list?.isPublished ? 
                                                <button className={Style.editButtonDisabled} disabled>Delete</button> :
                                                <button className={Style.editButton} onClick={(e) => handleDeleteQuizClick(list._id, e)}>Delete</button>                                            
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {!!myQuizList && myQuizList.length === 0 &&
                        <div className={Style.accountDiv}> 
                            <div className={Style.titleDiv}>
                                <div>
                                    <h4 className={Style.title}>No quiz found!</h4>
                                </div>
                            </div>
                        </div>
                    }
            </div>
            {isLoading && 
                <div className={Style.loading}>
                    <div className={Style.loader}></div>
                </div>
            }
        </>
    )
}

export default MyQuiz;