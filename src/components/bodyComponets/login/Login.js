import React from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom'
import {Control, LocalForm, Errors } from 'react-redux-form';
import { userLogin } from '../../../redux/ActionCreater';
import './css/signup.css';

const mapDispatchToProps = {
    userLogin: (data) => (userLogin(data))
};

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);


const Contact = (props) => {

    const history = useHistory();

    const handleLoginSubmit = (data) => {
        props.userLogin(data)
        // data && history.goBack();
        // console.log(data)
    }

    return (
        <div className="contact-container">
            <div className="card login-card">
                <div>
                    <h3>Welcome Back</h3>
                </div>
                <div model="contactForm" className="form-container login-container">
                    <LocalForm onSubmit={values => handleLoginSubmit(values)}>
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
                        </div>
                    </LocalForm>
                    <div className="signup-container">
                        <Link className="signup" to={'signup'}>Signup for new account</Link>
                    </div>
                </div>    
            </div>

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