import React from 'react';
import { useHistory } from 'react-router-dom'
import {Control, LocalForm, Errors } from 'react-redux-form';
import './css/signup.css';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
const isNumber = val => !isNaN(+val);
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


const Contact = () => {

    const history = useHistory();

    const handleSubmit = (values) => {
        console.log(values)
        alert(`Thank you ${values.firstname} ${values.lastname} for register`)
        history.goBack()
    }

    return (
        <div className="contact-container">
            <div className="card">
                <div>
                    <h3>SIGNUP NEW ACCOUNT</h3>
                </div>
                <div model="contactForm" className="form-container">
                    <LocalForm onSubmit={values => handleSubmit(values)}>
                        <div className="form-group">
                            <label htmlFor="firstname" className="label"></label>
                            <Control.text model=".firstname" id="firstname" name="firstname"
                                placeholder="First Name"
                                className="form-control"
                                validators={{
                                    required, 
                                    minLength: minLength(2),
                                    maxLength: maxLength(15)
                                }}
                            />
                            <Errors
                                className="text-warning"
                                model=".firstname"
                                show="touched"
                                component="div"
                                messages={{
                                    minLength: 'Must be at least 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname" className="label"></label>
                            <Control.text model=".lastname" id="lastname" name="lastname"
                                placeholder="Last Name"
                                className="form-control"
                                validators={{
                                    required,
                                    minLength: minLength(2),
                                    maxLength: maxLength(15)
                                }}
                            />
                            <Errors
                                className="text-warning"
                                model=".lastname"
                                show="touched"
                                component="div"
                                messages={{
                                    minLength: 'Must be at least 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="street" className="label"></label>
                            <Control.text model=".street" id="street" name="street"
                                placeholder="Apartment, suite, building, etc."
                                className="form-control"
                                validators={{
                                    required,
                                    minLength: minLength(2)
                                }}
                            />
                            <Errors
                                className="text-warning"
                                model=".street"
                                show="touched"
                                component="div"
                                messages={{
                                    minLength: 'Must be at least 2 characters'
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city" className="label"></label>
                            <Control.text model=".city" id="city" name="city"
                                placeholder="City"
                                className="form-control"
                                validators={{
                                    required,
                                    minLength: minLength(2)
                                }}
                            />
                            <Errors
                                className="text-warning"
                                model=".city"
                                show="touched"
                                component="div"
                                messages={{
                                    minLength: 'Must be at least 2 characters'
                                }}
                            />
                        </div>
                        <div className="form-group state-and-zip-container">
                            <label htmlFor="state" className="label state-and-zip-label"></label>
                            <Control.text model=".state" id="state" name="state"
                                placeholder="State"
                                className="form-control state-and-zip state-and-zip-left"
                                validators={{
                                    required,
                                    minLength: minLength(2)
                                }}
                            />
                            <Errors
                                className="text-warning"
                                model=".state"
                                show="touched"
                                component="div"
                                messages={{
                                    minLength: 'Must be at least 2 characters'
                                }}
                            />
                            <label htmlFor="zip" className="label state-and-zip-label"></label>
                            <Control.text model=".zip" id="zip" name="zip"
                                placeholder="Zip Code"
                                className="form-control state-and-zip"
                                validators={{
                                    required,
                                    minLength: minLength(2),
                                    maxLength: maxLength(5),
                                    isNumber
                                }}
                            />
                            <Errors
                                className="text-warning"
                                model=".zip"
                                show="touched"
                                component="div"
                                messages={{
                                    minLength: 'Must be at least 2 characters',
                                    maxLength: 'Must be 5 characters or less',
                                    isNumber: 'Must be a number'
                                }}
                            />
                        </div>
 
                        <div className="form-group">
                            <label htmlFor="tel" className="label"></label>
                            <Control.text model=".tel" id="tel" name="tel"
                                placeholder="Phone number"
                                className="form-control"
                                validators={{
                                    required,
                                    minLength: minLength(10),
                                    maxLength: maxLength(15),
                                    isNumber
                                }}
                            />
                            <Errors
                                className="text-warning"
                                model=".tel"
                                show="touched"
                                component="div"
                                messages={{
                                    minLength: 'Must be at least 10 numbers',
                                    maxLength: 'Must be 15 numbers or less',
                                    isNumber: 'Must be a number'
                                }}
                            />
                        </div>
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
                                    minLength: 'Must be at least 3 characters',
                                    maxLength: 'Must be 15 characters or less',
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="label"></label>
                            <Control.text model=".email" id="email" name="email"
                                placeholder="Email"
                                className="form-control"
                                validators={{
                                    required,
                                    validEmail
                                }}
                            />
                            <Errors
                                className="text-warning"
                                model=".email"
                                show="touched"
                                component="div"
                                messages={{
                                    required: 'Required',
                                    validEmail: 'Invalid email address'
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
                                    minLength: 'Must be at least 6 characters',
                                    maxLength: 'Must be 15 characters or less',
                                    
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <label  className="check-label">
                                    <Control.checkbox
                                        model=".promotion"
                                        name="promotion"
                                    /> {' '}
                                    <p>Receive Promotion News</p>
                                </label>
                            </div>
                        </div>

                        <div className="form-group button-group">
                            <button type="submit" color="primary">
                                SEND
                            </button>
                        </div>
                    </LocalForm>
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

export default Contact;