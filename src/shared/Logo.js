import React from 'react';
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/">
            <div style={logoStyle} >
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 91.45 26.97">
                <rect y="0.13" width="20.81" height="26.43"/><rect x="21.84" y="0.13" width="4.59" height="26.43"/>
                <path d="M961,535h-.74v8.47c0,5.06-2.06,9-7.41,9-4.6,0-6.34-3-6.34-6.55V535h-.74V545.9c0,5.77,3.65,7.33,7,7.33,4,0,6.27-1.77,7.44-5.53,0,1.6,0,4.47,0,5.11H961c0-.75,0-3.72,0-5.5Z" transform="translate(-914.55 -526.33)"/>
                <path d="M986.37,534.63h-6c-2.48,2.41-6.66,6.23-8.51,8.11V526.33h-5v26.48h5V547l3-2.55,6.17,8.4h6.09l-8.72-11.2Z" transform="translate(-914.55 -526.33)"/>
                <path d="M1006,543.13c0-3.44-1.74-8.61-8.4-8.61-5.32,0-8.68,3.93-8.68,9.43,0,4.32,2.37,9.35,8.68,9.35,4.25,0,6.91-2.19,8-4.92h-.82c-1.06,2.34-3.4,4.25-7.23,4.25-4.5,0-7.83-3.15-7.9-8.75H1006Zm-16.27.07c.18-4.43,3.09-8,7.8-8,5.39,0,7.58,3.65,7.73,8Z" transform="translate(-914.55 -526.33)"/>
                </svg>
            </div>
        </Link>
    )
}

const logoStyle = {
    height:'24.3034px', 
    width: '82.4109px',
    pointerEvents: 'fill'
}

export default Logo;