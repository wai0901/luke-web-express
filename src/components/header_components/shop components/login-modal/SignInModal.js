import React, { useState } from "react";
import { connect } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import {Control, LocalForm, Errors } from 'react-redux-form';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { userLogin } from '../../../../redux/ActionCreater';
import './css/signInModal.css';

const mapDispatchToProps = {
  userLogin: (data) => (userLogin(data)),
};

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '0',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));


const SignInModal = ({authStatus, 
                        open, 
                        userLogin, 
                        signinRoute, 
                        setSigninRoute, 
                        handleModalClose,
                    }) => {
 
    //Modal
    const classes = useStyles();

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ warningMessage, setWarningMessage ] = useState(false);
    const [ loginMessage, setLoginMessage ] = useState(false);

    const history = useHistory();

    const handleUsernameChange = event => setUsername(event.target.value);
    const handlePasswordChange = event => setPassword(event.target.value);


    const handleLogin = () => {

        if ( username && password ) {
            
            userLogin({ username: username, password: password });
            setPassword('')
            const waitForResponse = () => {
                if (authStatus.isLoading) {
                    setTimeout(() => waitForResponse, 100)
                } 
            }
    
            authStatus.isLoading ? waitForResponse() : setTimeout(() => checkStatus(), 500);

        }
    }

    const checkStatus = () => {

        setTimeout(() => {
            if (authStatus.isAuthenticated) {    
                if (signinRoute) {
                    if (authStatus.user.username !== "admin") {
                         history.push('/');
                         return handleModalClose();
                    }
                    setPassword('');
                    return setSigninRoute(false);
                } else {
                    if (authStatus.user.username !== "admin") {
                        history.goBack();
                        return handleModalClose();
                    }
                    return setPassword('');
                }
            } 
        }, 1000);
    }


    return(
        <React.Fragment>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
                >
                <Fade in={open}>
                <div className="modal-container">
                    <div className="login-card">
                        <div>
                            <h3>Welcome Back</h3>
                        </div>
                        <div model="contactForm" className="form-container">
                          <LocalForm>
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
                                  <button type="submit" color="primary" onClick={() => handleLogin()}>
                                      Login
                                  </button>
                                  <button className="back-button" type="button" color="gray" onClick={() => handleModalClose()}>
                                      Close
                                  </button>
                              </div>
                          </LocalForm>
                          <div className="signup-container">
                              <Link className="signup" to={'signup'} onClick={() => handleModalClose()}>Signup for new account</Link>
                          </div>
                          <div className="message-container">
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
                                authStatus.user.username === "admin" ? <Link className="message" to={"/admin"} onClick={() => handleModalClose()}>Admin Enter</Link> : 
                                <p></p> :
                                <p></p>
                              }  
                          </div>
                      </div>    
                    </div>
                </div>
                </Fade>
            </Modal>
        </React.Fragment>
    )
}

export default connect(null, mapDispatchToProps)(SignInModal);