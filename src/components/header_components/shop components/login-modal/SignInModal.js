import React, { useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
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
                        fetchAndUpdateCartItem
                    }) => {
 
    const [auth] = useState(authStatus.isAuthenticated);

    //Modal
    const classes = useStyles();

    async function handleLogin(values) {

        if (values) {
            await userLogin(values);
            
            setTimeout(() => {
                let user = JSON.parse(localStorage.getItem('user')) || [];
                
                if (auth) {
                    if (user !== []) {
                        user.admin === false && handleModalClose();
                    } else {
                        console.log('Error')
                    }
                }
            }, 3500)
                
            fetchAndUpdateCartItem();
        } 

        
        // if (values) {
        //     userLogin(values);
        //     setTimeout(() => {
        //         let user = JSON.parse(localStorage.getItem('user')) || [];
                
        //         if (auth) {
        //             if (user !== []) {
        //                 user.admin === false && handleModalClose();
        //                 fetchAndUpdateCartItem();
        //             } else if ( authStatus.errMess === "Error 401: Unauthorized" || 
        //                         authStatus.errMess === null ||
        //                         authStatus.errMess === "" ||
        //                         !auth
        //             ) {
        //                 return null;
        //             } else {
        //                 console.log("not Admin and no error")
        //                 // handleModalClose();
        //                 fetchAndUpdateCartItem();
        //             }
        //         }
        //     }, 3500)
        // } 
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
                          <LocalForm onSubmit={values => handleLogin(values)}>
                              <div className="form-group">
                                  <label htmlFor="username" className="label"></label>
                                  <Control.text model=".username" id="username" name="username"
                                      placeholder="Username"
                                      className="form-control"
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
                                authStatus.errMess === "Error 401: Unauthorized" ? 
                                <p className="message warning">Oops!! Wrong username or password!!</p> : 
                                <p></p>
                              }   
                              {
                                authStatus.isAuthenticated ?
                                <p className="message success">Welcome Back {(authStatus.user.username).toUpperCase()}</p> : 
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