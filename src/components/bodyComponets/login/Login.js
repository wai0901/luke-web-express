import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom'
import {Control, LocalForm, Errors } from 'react-redux-form';
import { userLogin } from '../../../redux/ActionCreater';
import './css/signup.css';

const mapDispatchToProps = {
    userLogin: (data) => (userLogin(data))
};

// const required = val => val && val.length;
// const maxLength = len => val => !val || (val.length <= len);
// const minLength = len => val => val && (val.length >= len);


const Contact = ({authStatus, userLogin, setSigninRoute, signinRoute}) => {

    // const [ username, setUsername ] = useState('');
    // const [ password, setPassword ] = useState('');
    // const [ warningMessage, setWarningMessage ] = useState(false);
    // const [ loginMessage, setLoginMessage ] = useState(false);

    // const history = useHistory();

    // const handleUsernameChange = event => setUsername(event.target.value);
    // const handlePasswordChange = event => setPassword(event.target.value);

    // const handleLogin = () => {
        
    //     userLogin({ username: username, password: password });

    //     const waitForResponse = () => {
    //         if (authStatus.isLoading) {
    //             setTimeout(() => waitForResponse, 100)
    //         } 
    //     }

    //     authStatus.isLoading ? waitForResponse() : setTimeout(() => checkStatus(), 500);

    // }

    
    // const checkStatus = () => {
    //     if (authStatus) {

    //         if (authStatus.isAuthenticated) {
    //             setLoginMessage(true);
    //             setWarningMessage(false);
                
    //             setTimeout(() => {
    //                 if (signinRoute) {
    //                     console.log(authStatus.user.username)
    //                     if (authStatus.user.username !== "admin") {
    //                         return history.push('/');
    //                     }
    //                     setSigninRoute(false);
    //                     return setLoginMessage(false);
    //                 } else {
    //                     console.log(authStatus.user.username)
    //                     if (authStatus.user.username !== "admin") {
    //                         return history.goBack();
    //                     }
    //                     return setLoginMessage(false);
    //                 }
    //             }, 4000);
    //         //authStatus is false
    //         } else {
    //             setLoginMessage(false);
    //         }
    //         // if server denied login
    //         authStatus.errMess === "Error 401: Unauthorized" ? 
    //         setWarningMessage(true) : 
    //         setWarningMessage(false);

    //         setPassword('');
    //     }
    // }
            

 
    
    return (
        <div className="contact-container">
            {/* <div className="message-container">
                {
                    warningMessage ? <p className="message warning">Oops!! Wrong username or password!!</p> : <p></p>
                }   
                {
                    authStatus.isAuthenticated ?
                    loginMessage ? <p className="message success">Welcome Back {authStatus.user.username}</p> : 
                    <p></p> :
                    <p></p>
                } 
                {
                    authStatus.isAuthenticated ?
                    authStatus.user.username === "admin" ? <Link className="message" to={"/admin"}>Admin Enter</Link> : 
                    <p></p> :
                    <p></p>
                }  
            </div> */}
            {/* <div className="card login-card">
                <div>
                    <h3>Welcome Back</h3>
                </div>
                <div model="contactForm" className="form-container login-container">
                    <LocalForm onSubmit={() => handleLogin()}>
                        <div className="form-group">
                            <label htmlFor="username" className="label"></label>
                            <Control.text model=".username" id="username" name="username"
                                placeholder="Username"
                                className="form-control"
                                onChange={handleUsernameChange}
                                validators={{
                                    required,
                                    minLength: minLength(3),
                                    maxLength: maxLength(15)
                                }}
                            />
                            <Errors
                                className="text-warning"
                                model=".username"
                                show="touched"
                                component="div"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be at least 3 characters',
                                    maxLength: 'Must be 15 characters or less',
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="label"></label>
                            <Control.text model=".password" id="password" name="password"
                                placeholder="Password"
                                className="form-control"
                                onChange={handlePasswordChange}
                                type="password"
                                validators={{
                                    required,
                                    minLength: minLength(6),
                                    maxLength: maxLength(15),
                                }}
                            />
                            <Errors
                                className="text-warning"
                                model=".password"
                                show="touched"
                                component="div"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be at least 6 characters',
                                    maxLength: 'Must be 15 characters or less',
                                    
                                }}
                            />
                        </div>
                        <div className="form-group button-group">
                            <button type="submit" color="primary">
                                Login
                            </button>
                        </div>
                    </LocalForm>
                    <div className="signup-container">
                        <Link className="signup" to={'signup'}>Signup for new account</Link>
                    </div>
                </div>    
            </div> */}

            {/* <div className="loading-container">
                {props.contactLoading && 
                  <div>
                    <div class="bounceball"></div>
                    <p className="text">LOADING...(Stimulating fatch data Demo)</p>
                  </div>
                }
            </div>  */}
        </div>
    )
}

export default connect(null, mapDispatchToProps)(Contact);