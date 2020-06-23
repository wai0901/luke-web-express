import React, { useState } from "react";
import Card from "react-credit-cards";
import { useHistory } from 'react-router-dom'
import "react-credit-cards/es/styles-compiled.css";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from "./utils/utils";

import "./css/creditCard.css";


const CC = ({handleOrderSubmit}) => {

    const [cvc, setCvc] = useState('');
    const [expiry, setExpiry] = useState('');
    const [focus, setFocus] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [issuer, setIssuer] = useState('');
    const [formData, setFormData] = useState(null);

    const history = useHistory();

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setIssuer({ issuer });
    }
  };

  const handleInputFocus = ({ target }) => {
    setFocus({
      focused: target.name
    });
  };

  const handleInputChange = ({ target }) => {
      
    if (target.name === "number") {
        setNumber(target.value = formatCreditCardNumber(target.value));
    } else if (target.name === "expiry") {
        setExpiry(target.value = formatExpirationDate(target.value));
    } else if (target.name === "cvc") {
        setCvc(target.value = formatCVC(target.value));
    } else if (target.name === "name") {
        setName(target.value);
    }    
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    setFormData({ formData });
    this.form.reset();
  };


    return (
        <div className="cc-container">
            <div key="Payment">
                <div className="App-payment">
                    <div className="cc-demo-container">
                        <Card
                            number={number}
                            name={name}
                            expiry={expiry}
                            cvc={cvc}
                            focused={focus}
                            callback={handleCallback}
                        />
                    </div>
                    <div className="cc-form-container">
                        {/* <form onSubmit={handleSubmit}> */}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="number"
                                    className="form-control long-input"
                                    placeholder="Card Number"
                                    pattern="[\d| ]{16,22}"
                                    required
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control long-input"
                                    placeholder="Name"
                                    required
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                />
                            </div>
                            <div className="form-group valid-group">
                                <div className="valid">
                                    <input
                                        type="tel"
                                        name="expiry"
                                        className="form-control short-input"
                                        placeholder="Valid Thru"
                                        pattern="\d\d/\d\d"
                                        required
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                    />
                                </div>
                                <div className="valid">
                                    <input
                                        type="tel"
                                        name="cvc"
                                        className="form-control short-input"
                                        placeholder="CVC"
                                        pattern="\d{3,4}"
                                        required
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                    />
                                </div>
                            </div>
                            <input type="hidden" name="issuer" value={issuer} />
                            <div className="button-group">
                                <button className="buy-button" onClick={(e) => handleOrderSubmit(e)}>PAY</button>
                                <button className="back-button" onClick={() => history.goBack()}>Back</button>
                            </div>
                        </form>
                    </div>
                    {formData && (
                      <div className="App-highlight">
                        {formatFormData(formData).map((d, i) => (
                          <div key={i}>{d}</div>
                        ))}
                      </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CC;