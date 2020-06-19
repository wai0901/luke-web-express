import React from 'react';
import './Loading.css';

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading"></div>
            <p className="text">Loading...</p>
        </div>
    )
}

export default Loading;