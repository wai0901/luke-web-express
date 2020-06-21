import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ordersData } from '../../redux/ActionCreater';

import './css/ordersData.css';


const mapStateToProps = state => {
    console.log(state)
    return {
        
    }
}

const mapDispatchToProps = {
    ordersData,
};


const Contact = (props) => {

    // useEffect(() => {
    //     props.ordersData();
    // }, [])

    const handleSubmit = () => {
        props.ordersData()
    }

    return (
        <div className="contact-container">
            <div className="cards-container">
                <div className="card">
                   
                </div>
                <div className="card">
                    <button onClick={() => handleSubmit()}>Orders Data</button>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);