import React from 'react';
import { connect } from 'react-redux';
import {Control, LocalForm, Errors } from 'react-redux-form';
import { useHistory } from 'react-router-dom'
import { postContactUs } from '../../../redux/ActionCreater';
import './css/contact.css';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
const isNumber = val => !isNaN(+val);
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

const mapDispatchToProps = {
    postContactUs: (data) => (postContactUs(data))
  }

const Contact = (props) => {

    const history = useHistory();

    const handleSubmit = (values) => {
        if (values) {
            props.postContactUs(values);
            alert(`Name: ${values.firstName} ${values.lastName} \nTel: ${values.phoneNum} \nEmail: ${values.email}\nMay we contact you? ${true ? 'Agree' : 'Disagree'}\nContact method: \nComment: ${values.feedback}`)
            history.goBack();
        }
        
    }

    return (
        <div className="contact-container">
            <div className="contact-cards-container">
                <div className="card">
                    <h3>Address</h3>
                    <p>
                        1 Wai Way<br />
                        Los Angeles, CA 90001<br />
                        U.S.A.
                    </p>
                    <a href="#"> 1-234-555-1234</a><br />
                    <a href="#"> wai@portfolio.com</a>
                </div>
                <div className="card">
                    <div>
                        <h3>CONTACT US</h3>
                    </div>
                    <div model="contactForm" className="form-container">
                        <LocalForm onSubmit={values => handleSubmit(values)}>
                            <div className="form-group">
                                <label htmlFor="firstName" className="label"></label>
                                <Control.text model=".firstName" id="firstName" name="firstName"
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
                                    model=".firstName"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName" className="label"></label>
                                <Control.text model=".lastName" id="lastName" name="lastName"
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
                                    model=".lastName"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNum" className="label"></label>
                                <Control.text model=".phoneNum" id="phoneNum" name="phoneNum"
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
                                    model=".phoneNum"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 10 numbers',
                                        maxLength: 'Must be 15 numbers or less',
                                        isNumber: 'Must be a number'
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
                                <div className="form-check">
                                    <label  className="check-label">
                                        <Control.checkbox
                                            model=".contactMe"
                                            name="contactMe"
                                        /> {' '}
                                        <p>May we contact you?</p>
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="feedback" className="label">Comment</label>
                                <Control.textarea model=".feedback" id="feedback" name="feedback"
                                    className="form-control"
                                    rows="8"
                                />
                            </div>
                            <div className="form-group button-group">
                                <button type="submit" color="primary">
                                    SEND
                                </button>
                            </div>
                        </LocalForm>
                    </div>    
                </div>
            </div>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(Contact);